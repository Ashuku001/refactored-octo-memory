from fastapi.responses import JSONResponse
import pandas as pd
from fastapi import APIRouter, HTTPException
from dotenv import load_dotenv
import joblib
import os
from surprise import Reader, Dataset, SVD, KNNBasic
from surprise.model_selection import train_test_split, GridSearchCV
from surprise.prediction_algorithms import CoClustering
from surprise.prediction_algorithms import NMF
from surprise import accuracy
from collections import Counter

from app.repository.sales import SaleDetailsRepository
from app.machine_learning.api.helpers.nmf_svd_knn_coClustering import get_customer_orders, get_item_orders, get_recommendations, recommend_items, select_model, shortlist_customers

router = APIRouter()
load_dotenv()

def encode_units(x):
    if x < 1:
        return 0
    if x >= 1:
        return 1

@router.get("/nmf_svd_knn_coClustering-model/train")
async def nmf_svd_knn_coClustering_train(storeId:int):
    repo = SaleDetailsRepository()
    raw_data = await repo.get_sales_details(storeId=storeId)
    data_1 = {
        "stockCode": [],
        "name": [],
        "productId": [],
        "quantity": [],
        "brand": [],
        "unitPrice": [],
        "customerId": [],
    }
    for el in raw_data:
        data_1["stockCode"].append(el["productId"]["stockCode"])
        data_1["name"].append(el["productId"]["name"])
        data_1["productId"].append(el["productId"]["id"])
        data_1["brand"].append(el["productId"]["brand"])
        data_1["quantity"].append(el["quantity"])
        data_1["unitPrice"].append(el["unitPrice"])
        data_1["customerId"].append(el["salesId"]["customerId"])

    df_1 = pd.DataFrame(data_1)
    df_1 = df_1.dropna()
    df_1 = df_1[df_1["quantity"] > 0]
    
    purchase_df: pd.DataFrame = (df_1.groupby(["productId", "customerId"])["quantity"].sum().unstack().reset_index().fillna(0).set_index("productId"))
    
    df_2 = purchase_df.stack().to_frame()
    df_2 = df_2.reset_index().rename(columns={0: "quantity"})
    
    # if df_2 is more than 1/2 million shortlist customers
    df_3 = None
    if df_2.shape[0] > 500000:
        for threshold in range(500, 1, -30):
            df_3 = shortlist_customers(df_1, df_2, 260)
            break # we will remove this
            # print("THRESHOLD",df_3.shape[0])
            # if(df_3.shape[0] > 500000 or df_3.shape[0] < 450000):
            #     continue
            # else:
            #     break
    
    print("DF 2", df_2.head(), "\n DF 3", df_3.head())
    # read data in format surpoted by surprise    
    reader = Reader(rating_scale=(0,5095))
    # load the dataset
    formatted_data = Dataset.load_from_df(df_3, reader)
    
    print("FORMATED ITEMS", formatted_data)
    # trainining split
    train_set, test_set = train_test_split(formatted_data, test_size=0.2, random_state = 42, shuffle= True)
    print(formatted_data)
    
    model_name, model_info = select_model(formatted_data, train_set, test_set)
    
    # save this information to the database and send to the client
    print(f"Best performing model {model_name}")
    print("train RMSE", model_info["rmse_tr"])
    print("test RMSE", model_info["rmse_te"])
    print("TESTING", model_info["model"].test([[21730, 17850, df_1[(df_1['productId']==21730)&(df_1['customerId']==17850)]["quantity"].sum()]]),
          "/n actual", df_1[(df_1['productId']==21730)&(df_1['customerId']==17850)]["quantity"].sum())
    
    # Check for overfitting/underfitting this can be sent to the front end state of the training
    fit_val = None
    if model_info["rmse_te"] > model_info["rmse_tr"]:
        print(f"{model_name} is overfitting.\n")
        fit_val = (model_info["rmse_te"] - model_info["rmse_tr"])/model_info["rmse_tr"] 
    elif model_info["rmse_te"] < model_info["rmse_tr"]:
        print(f"{model_name} is underfitting.\n")
        fit_val = (model_info["rmse_tr"] - model_info["rmse_te"])/model_info["rmse_te"] 
    else:
        print(f"{model_name} is well-fit.\n")
            
    fitting_threshold = 0.2
    if fit_val > fitting_threshold:
        
        # Define the parameter grid for Best model
        param_grid = {
            'n_cltr_u': [3, 5, 10],
            'n_cltr_i': [3, 5, 10],
            'n_epochs': [20, 50, 100],
            'random_state': [42]  # For reproducibility
        }
        
        model = None
        if model_name == "coClustering":
            model = CoClustering
        elif model_name == "KNNBasic":
            model = KNNBasic          
        elif model_name == "NMF":
            model = NMF          
        elif model_name == "SVD":
            model = SVD      
                
        # Use GridSearchCV to find the best hyperparameters
        gs = GridSearchCV(model, param_grid, measures=['rmse'], cv=5, n_jobs=-1)
        gs.fit(formatted_data)
        
        # Get the best model
        best_model = gs.best_estimator['rmse']

        # Train the best model on the full training set
        best_model.fit(train_set)

        # Test the model on the test set
        predictions = best_model.test(test_set)

        # Calculate RMSE on the test set
        test_rmse = accuracy.rmse(predictions, verbose=True)

        print(f"Best parameters: {gs.best_params['rmse']}")
        print(f"Best RMSE: {gs.best_score['rmse']}")

        # Check for overfitting
        train_predictions = best_model.test(train_set.build_testset())
        train_rmse = accuracy.rmse(train_predictions, verbose=True)

        print(f"Train RMSE: {train_rmse:.4f}, Test RMSE: {test_rmse:.4f}")

        if test_rmse > train_rmse:
            print("The model is overfitting.")
        else:
            print("The model is not overfitting.")
    else:
        # Save the model to a file
        model_path = os.environ.get("collaborative_filtering_path")
        
        # save the filename to a db that includes the username and id and storeId
        model_filename = f"{model_name}_model.pkl"
        if not os.path.exists(model_path):
            os.makedirs(model_path)
            
        # save the model path to a database to have stats about the models performance   
        joblib.dump(model_info["model"], os.path.join(model_path, model_filename))
    
    predictions_data = pd.DataFrame(model_info["predictions"], columns=['item_id', 'customer_id', 'quantity', 'prediction', 'details'])
    predictions_data['item_orders'] = predictions_data.item_id.apply(lambda x: get_item_orders(x, train_set))
    predictions_data['customer_orders'] = predictions_data.customer_id.apply(lambda x: get_customer_orders(x, train_set))
    predictions_data['error'] = abs(predictions_data.prediction - predictions_data.quantity)
    best_predictions = predictions_data.sort_values(by='error')[:10]
    worst_predictions = predictions_data.sort_values(by='error')[-10:]
    
    print("best_predictions",best_predictions.head(10))
    print("worst_predictions",worst_predictions.head(10))
    # recommendations = get_recommendations(predictions_data, 14667)
    
    return JSONResponse(content={"success": f"{model_name} agent has been trained and validated with a RMSE of {model_info['rmse_tr']:.4f} and fitting error of {fit_val} It is ready for reccommendations."})

@router.get("/nmf_svd_knn_coClustering-model/predict")
async def nmf_svd_knn_coClustering_predict(storeId:int, userId:int, sample:int=10):
    repo = SaleDetailsRepository()
    raw_data = await repo.get_sales_details(storeId=storeId)
    data_1 = {
        "stockCode": [],
        "name": [],
        "productId": [],
        "quantity": [],
        "brand": [],
        "unitPrice": [],
        "customerId": [],
    }
    for el in raw_data:
        data_1["stockCode"].append(el["productId"]["stockCode"])
        data_1["name"].append(el["productId"]["name"])
        data_1["productId"].append(el["productId"]["id"])
        data_1["brand"].append(el["productId"]["brand"])
        data_1["quantity"].append(el["quantity"])
        data_1["unitPrice"].append(el["unitPrice"])
        data_1["customerId"].append(el["salesId"]["customerId"])

    df_1 = pd.DataFrame(data_1)
    df_1 = df_1.dropna()
    df_1 = df_1[df_1["quantity"] > 0]
 
    try:
        # retrieve the the model to a file
        model_path = os.environ.get("collaborative_filtering_path")
        # retrieve the model from the db
        model_filename = "CoClustering_model.pkl"
        model = joblib.load(os.path.join(model_path, model_filename))
    except:
        raise HTTPException(status_code=404, detail={"model_not_found": "Could not find a model train and save the model"})
    
    itemIds = df_1[df_1['customerId']==userId]['productId'].values.tolist()
    recommendations = recommend_items(model, userId, itemIds, df_1, sample)
    
    return recommendations