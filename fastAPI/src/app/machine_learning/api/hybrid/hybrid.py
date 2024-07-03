from fastapi.responses import JSONResponse
import pandas as pd
from fastapi import APIRouter, HTTPException, Body
from dotenv import load_dotenv
import joblib
import os

import pandas as pd
from lightfm import LightFM
import time
from sklearn import model_selection

from app.repository.sales import SaleDetailsRepository
from app.repository.customer import CustomerRepository
from app.machine_learning.api.helpers.hybrid import features_to_add, get_recommendations, interactions, mapping, train_test_merge, unique_items, unique_users, select_model

router = APIRouter()
load_dotenv()

@router.get("/train")
async def hybrid_train(storeId: int, merchantId: int):
    repo_order = SaleDetailsRepository()
    raw_orders = await repo_order.get_sales_hybrid(storeId=storeId)
    repo_cus = CustomerRepository()
    raw_cus = await repo_cus.get_all_Customers(merchantId=merchantId)
    
    order_data = {
        "stockCode": [],
        "name": [],
        "productId": [],
        "brand": [],
        
        "customerId": [],
        
        "unitPrice": [],
        "quantity": [],
        "invoiceNo": [],
        "saleDate": [],
        "discount": [],
    }
    for el in raw_orders:
        order_data["stockCode"].append(el["productId"]["stockCode"])
        order_data["name"].append(el["productId"]["name"])
        order_data["productId"].append(el["productId"]["id"])
        order_data["unitPrice"].append(el["unitPrice"])
        order_data["brand"].append(el["productId"]["brand"])
        order_data["quantity"].append(el["quantity"])
        order_data["discount"].append(el["discount"])
        order_data["customerId"].append(el["salesId"]["customerId"])
        order_data["invoiceNo"].append(el["salesId"]["invoiceNo"])
        order_data["saleDate"].append(el["salesId"]["saleDate"])
    order_df = pd.DataFrame(order_data)
    order_df = order_df.dropna()
        
    cus_data = {
        "customerId": [],
        "gender": [],
        "zipcode": [],
        "age": [],
        "customerSegment": [],
        "income": [],
    }
    for el in raw_cus:
        cus_data["customerId"].append(el["id"])
        cus_data["gender"].append(el["gender"])
        cus_data["zipcode"].append(el["zipcode"])
        cus_data["age"].append(el["age"])
        cus_data["customerSegment"].append(el["customerSegment"])
        cus_data["income"].append(el["income"])
    cus_df = pd.DataFrame(cus_data)
    cus_df = cus_df.dropna()
    
    
    merged_df = pd.merge(order_df, cus_df, left_on=["customerId"], right_on=["customerId"], how="left")
    
    # Create a unique lists
    user_list = unique_users(order_df, "customerId")
    item_list = unique_items(order_df, "name")
    
    # gets the total unique list for three features: Customer Segment, Age, and Gender.
    feature_unique_list = features_to_add(cus_df, "customerSegment", "age", "gender")
    
    user_to_index_mapping, index_to_user_mapping, \
        item_to_index_mapping, index_to_item_mapping, \
            feature_to_index_mapping, index_to_feature_mapping = mapping(user_list, item_list, feature_unique_list)
            
    # fetch user-to-product relationship and calculated the total quantity per user
    user_to_product = order_df[["customerId", "name", "quantity"]]
    user_to_product = user_to_product.groupby(["customerId", "name"]).agg({"quantity": "sum"}).reset_index()
    
    # product to feature relationship
    product_to_feature = merged_df[["name", "customerSegment", "quantity"]]
    # sum quantity per segment
    product_to_feature = product_to_feature.groupby([ "name","customerSegment"]).agg({"quantity": "sum"}).reset_index()
        
    # split training and testing data
    user_to_product_train, user_to_product_test = model_selection.train_test_split(user_to_product, test_size=0.30, random_state=42)
    
    # generate user_item_interaction matrix
    user_to_product_interaction_train = interactions(user_to_product_train, "customerId", "name", "quantity", user_to_index_mapping, item_to_index_mapping)
    user_to_product_interaction_test = interactions(user_to_product_test, "customerId", "name", "quantity", user_to_index_mapping, item_to_index_mapping)
    product_to_feature_interaction = interactions(product_to_feature, "name","customerSegment", "quantity", item_to_index_mapping, feature_to_index_mapping)
    
    print(user_to_product_interaction_train.shape, product_to_feature_interaction.shape, user_to_product_interaction_test.shape)
    model_name, model_info = select_model(user_to_product_interaction_train, product_to_feature_interaction, user_to_product_interaction_test)
    
    user_to_product_interaction = train_test_merge(user_to_product_interaction_train, user_to_product_interaction_test)
    
    # Final model after combining the train and test data
    final_model = LightFM(loss=model_name, no_components=30)
    # fitting to combined dataset
    start = time.time()
    # ==========
    # final model fitting
    final_model.fit(user_to_product_interaction,
                    user_features=None,
                    item_features=product_to_feature_interaction,
                    sample_weight=None,
                    epochs=10,
                    num_threads=20,
                    verbose=False)

    end = time.time()
    print("time taken = {0:.{1}f} seconds".format(end - start, 2))
    
    # Save the model to a file
    model_path = os.environ.get("hybrid")
    
    # save the filename to a db that includes the username and id and storeId
    model_filename = f"{model_name}_lightFM_model.pkl"
    if not os.path.exists(model_path):
        os.makedirs(model_path)
        
    # save the model path to a database to have stats about the models performance   
    joblib.dump(final_model, os.path.join(model_path, model_filename))
    
    return JSONResponse(content={"success": f"{model_name} agent has been trained and validated with a auc of {model_info['auc']:.4f}."})


@router.get("/recommend")
async def hybrid_train(storeId: int, merchantId: int, sample:int = 10, userIds:  list[int] = Body(...)):
    repo_order = SaleDetailsRepository()
    raw_orders = await repo_order.get_sales_hybrid(storeId=storeId)
    repo_cus = CustomerRepository()
    raw_cus = await repo_cus.get_all_Customers(merchantId=merchantId)
    
    order_data = {
        "stockCode": [],
        "name": [],
        "productId": [],
        "brand": [],
        
        "customerId": [],
        
        "unitPrice": [],
        "quantity": [],
        "invoiceNo": [],
        "saleDate": [],
        "discount": [],
    }
    for el in raw_orders:
        order_data["stockCode"].append(el["productId"]["stockCode"])
        order_data["name"].append(el["productId"]["name"])
        order_data["productId"].append(el["productId"]["id"])
        order_data["unitPrice"].append(el["unitPrice"])
        order_data["brand"].append(el["productId"]["brand"])
        order_data["quantity"].append(el["quantity"])
        order_data["discount"].append(el["discount"])
        order_data["customerId"].append(el["salesId"]["customerId"])
        order_data["invoiceNo"].append(el["salesId"]["invoiceNo"])
        order_data["saleDate"].append(el["salesId"]["saleDate"])
    order_df = pd.DataFrame(order_data)
    order_df = order_df.dropna()
        
    cus_data = {
        "customerId": [],
        "gender": [],
        "zipcode": [],
        "age": [],
        "customerSegment": [],
        "income": [],
    }
    for el in raw_cus:
        cus_data["customerId"].append(el["id"])
        cus_data["gender"].append(el["gender"])
        cus_data["zipcode"].append(el["zipcode"])
        cus_data["age"].append(el["age"])
        cus_data["customerSegment"].append(el["customerSegment"])
        cus_data["income"].append(el["income"])
    cus_df = pd.DataFrame(cus_data)
    cus_df = cus_df.dropna()
    
    
    merged_df = pd.merge(order_df, cus_df, left_on=["customerId"], right_on=["customerId"], how="left")
    
    # Create a unique lists
    user_list = unique_users(order_df, "customerId")
    item_list = unique_items(order_df, "name")
    
    # gets the total unique list for three features: Customer Segment, Age, and Gender.
    feature_unique_list = features_to_add(cus_df, "customerSegment", "age", "gender")
    
    user_to_index_mapping, index_to_user_mapping, \
        item_to_index_mapping, index_to_item_mapping, \
            feature_to_index_mapping, index_to_feature_mapping = mapping(user_list, item_list, feature_unique_list)
    user_to_product = order_df[["customerId", "name", "quantity"]]
    user_to_product = user_to_product.groupby(["customerId", "name"]).agg({"quantity": "sum"}).reset_index()
    
    # product to feature relationship
    product_to_feature = merged_df[["name", "customerSegment", "quantity"]]
    # sum quantity per segment
    product_to_feature = product_to_feature.groupby([ "name","customerSegment"]).agg({"quantity": "sum"}).reset_index()
    
    # split training and testing data
    user_to_product_train, user_to_product_test = model_selection.train_test_split(user_to_product, test_size=0.30, random_state=42)
    
    # generate user_item_interaction matrix
    user_to_product_interaction_train = interactions(user_to_product_train, "customerId", "name", "quantity", user_to_index_mapping, item_to_index_mapping)
    user_to_product_interaction_test = interactions(user_to_product_test, "customerId", "name", "quantity", user_to_index_mapping, item_to_index_mapping)
    product_to_feature_interaction = interactions(product_to_feature, "name","customerSegment", "quantity", item_to_index_mapping, feature_to_index_mapping)
    
    user_to_product_interaction = train_test_merge(user_to_product_interaction_train, user_to_product_interaction_test)
        
    try:
        # Save the model to a file
        model_path = os.environ.get("hybrid")
        
        # save the filename to a db that includes the username and id and storeId
        model_filename = f"{'logistic'}_lightFM_model.pkl"
        model = joblib.load(os.path.join(model_path, model_filename))
    except:
        raise HTTPException(status_code=404, detail={"model_not_found": "Could not find a model train and save the model"})
    
    recommendations = []
    for userId in userIds: 
        temp = get_recommendations(model, userId, 
                                            item_list, 
                                            user_to_product_interaction, 
                                            user_to_index_mapping, 
                                            product_to_feature_interaction, sample)
        recommendations.append(temp)
        
    return recommendations