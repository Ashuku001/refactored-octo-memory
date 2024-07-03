from fastapi import HTTPException
import numpy as np
import pandas as pd
from surprise import  SVD, KNNBasic
from surprise.model_selection import  cross_validate, GridSearchCV
from surprise.prediction_algorithms import CoClustering
from surprise.prediction_algorithms import NMF
from surprise import accuracy
from collections import Counter

def shortlist_customers(df_1: pd.DataFrame, df_2: pd.DataFrame, threshold_orders):
    customer_ids = df_1["customerId"]
    item_ids = df_1["productId"]
    
    # No of orders made by each customer and store in df_1
    # counting no of order made by each customers
    count_orders = Counter(customer_ids)
    customer_count_df: pd.DataFrame = pd.DataFrame.from_dict(count_orders, orient="index").reset_index().rename(columns={0: "quantity"})
    customer_count_df  = customer_count_df[customer_count_df["quantity"] > threshold_orders]
    customer_count_df.rename(columns={"index": "customerId"}, inplace=True)
    
    # counting number of items order
    item_count = Counter(item_ids)
    item_count_df: pd.DataFrame = pd.DataFrame.from_dict(item_count, orient="index").reset_index().rename(columns={0: "quantity"})
    item_count_df = item_count_df[item_count_df["quantity"] > threshold_orders]
    item_count_df.rename(columns={"index": "productId"}, inplace=True)
    
    # join on both df_1 with stacked data to create shortlisted final DF
    data2 = pd.merge(df_2, item_count_df, on='productId', how='inner')
    data2 = pd.merge(data2, customer_count_df, on="customerId", how="inner")
    
    # dropping columns which are not necessary
    data2.drop(['quantity_y','quantity_x'],axis=1,inplace=True)
    return data2

def select_model(formatted_data, train_set, test_set):
    # Define the algorithms to evaluate
    algorithms = {
        'KNNBasic': {
            "model": KNNBasic(sim_options={'name': 'cosine', 'user_based': True}),
            "rmse_CV": "",
            "mse_CV": "",
            "rmse_tr": "",
            "rmse_te": "",
            "mse_tr": "",
            "mse_te": "",
            "predictions": ""
        },
        'NMF': {
            "model": NMF(),
            "rmse_CV": "",
            "mse_CV": "",
            "rmse_tr": "",
            "rmse_te": "",
            "mse_tr": "",
            "mse_te": "",
            "predictions": ""
        },
        'CoClustering': {
            "model": CoClustering(),
            "rmse_CV": "",
            "mse_CV": "",
            "rmse_tr": "",
            "rmse_te": "",
            "mse_tr": "",
            "mse_te": "",
            "predictions": ""
        },
        'SVD': {
            "model": SVD(),
            "rmse_CV": "",
            "mse_CV": "",
            "rmse_tr": "",
            "rmse_te": "",
            "mse_tr": "",
            "mse_te": "",
            "predictions": ""
        }
    }
    
    results = {}
    for name, algo in algorithms.items():
        print(f"Evaluating {name}...")
        cv_results = cross_validate(algo["model"], formatted_data, measures=['RMSE', 'MAE'], cv=5, verbose=True)
        results[name] = cv_results

    # Print the average RMSE for each algorithm
    for name, result in results.items():
        algorithms[name]["rmse_CV"] = f"{result['test_rmse'].mean():.4f}"
        algorithms[name]["mse_CV"] = f"{result['test_mae'].mean():.4f}"
        
        # this one sent to the front end
        print(f"{name}: Average RMSE: {result['test_rmse'].mean():.4f} (+/- {result['test_rmse'].std():.4f})")
        print(f"{name}: Average MAE: {result['test_mae'].mean():.4f} (+/- {result['test_mae'].std():.4f})")
        
    for name, algo in algorithms.items():
        # Train the algorithm on the trainset
        algo["model"].fit(train_set)
    
        # Predict on the train_set and testset
        train_predictions = algo["model"].test(train_set.build_testset())
        test_predictions = algo["model"].test(test_set)
        algo["predictions"] = test_predictions
        
        # Calculate RMSE for training and test sets
        train_rmse = accuracy.rmse(train_predictions, verbose=False)
        test_rmse = accuracy.rmse(test_predictions, verbose=False)
        algo["rmse_tr"] = train_rmse
        algo["rmse_te"] = test_rmse
        
        # Calculate MSE for training and test sets
        train_mse = accuracy.mse(train_predictions, verbose=False)
        test_mse = accuracy.mse(test_predictions, verbose=False)
        algo["mse_tr"] = test_mse
        algo["mse_te"] = test_mse
        
        # this sent to the front end
        print(f"{name} -> Train RMSE: {train_rmse:.4f}, Test RMSE: {test_rmse:.4f}")
        print(f"{name} -> Train MSE: {train_mse:.4f}, Test MSE: {test_mse:.4f}")
    
    # Remove algorithms with rmse_tr equal to 0
    algorithms = {k: v for k, v in algorithms.items() if v['rmse_tr'] != 0}
    
    best_model_name = min(algorithms, key=lambda x: algorithms[x]["rmse_tr"])
    best_model_info = algorithms[best_model_name]
    
    return best_model_name, best_model_info

# further validators
def get_item_orders(user_id, train_set):
    try:
        # for an item, return the no. of orders made
        return len(train_set.ur[train_set.to_inner_uid(user_id)])
    except ValueError:
        # user not present in training
        return 0
    
def get_customer_orders(item_id, train_set):
    try:
        # for an customer, return the no. of orders made
        return len(train_set.ir[train_set.to_inner_iid(item_id)])
    except ValueError:
        # item not present in training
        return 0
    
def recommend_items(model, customer_id, item_ids, df, sample):
    predictions = []
    for item_id in item_ids:
        pred = model.predict(customer_id, item_id)
        predictions.append((item_id, pred.est))
    # Sort by estimated rating in descending order
    recommendations = sorted(predictions[:sample + 1], key=lambda x: x[1], reverse=True)
    
    print(recommendations)
    prod_rec = []
    for id, est in recommendations:
        product = {
                    "name": df[df["productId"] == id]["name"].to_list()[0],
                    "productId": df[df["productId"] == id]["productId"].to_list()[0],
                    "price": df[df["productId"] == id]["unitPrice"].to_list()[0],
                    # "category": df[df["productId"] == id]["category"].to_list()[0],
                    "brand": df[df["productId"] == id]["brand"].to_list()[0]
            }
        prod_rec.append(product)
        
    return prod_rec
    
def get_recommendations(predictions_data, userId):
    # Getting item list for user userId
    item_list = predictions_data[predictions_data['customer_id']==userId]['item_id'].values.tolist()
    
    if len(item_list) == 0:
        raise HTTPException(status_code=404, detail=f"Customer of id {userId} has never bought made a purchase therefore could not find similar customers.")
    
    # Getting list of uique customers who also bught same items (item_list)
    customer_list = predictions_data[predictions_data['item_id'].isin(item_list)]['customer_id'].values
    customer_list = np.unique(customer_list).tolist()
    
    if len(customer_list)==0:
        raise HTTPException(status_code=404, detail=f"Items bought by customer of id {userId} have not been bought by any other customer.")
    
    # filtering those customers from predictions data
    filtered_data = predictions_data[predictions_data['customer_id'].isin(customer_list)]
    
    print("LENGTH", filtered_data.shape, len(item_list))
    print("FILTERED DATA 1", filtered_data)

    # removing the items already bought
    filtered_data = filtered_data[~filtered_data['item_id'].isin(item_list)]
    
    print("FILTERED DATA 2", filtered_data)
    # getting the top items (prediction)
    recommended_items = filtered_data.sort_values('prediction',ascending=False).reset_index(drop=True).head(10)['item_id'].values.tolist()
    recommended_items