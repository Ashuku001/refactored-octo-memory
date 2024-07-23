import os
from fastapi.responses import JSONResponse
import joblib
import pandas as pd
from fastapi import APIRouter, Body, HTTPException
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv
from app.repository.sales import SaleDetailsRepository
from app.machine_learning.api.helpers.collaborative import simi_recommendation, similar_users, simu_recommendation

router = APIRouter()
load_dotenv()

def encode_units(x):
    if x < 1:
        return 0
    if x >= 1:
        return 1

@router.get("/user-to-user-filter/train")
async def user_to_user_filter(storeId:int, merchantId:int):
    repo = SaleDetailsRepository()
    data = await repo.get_sales_details(storeId=storeId)
    df = {
        "stockCode": [],
        "name": [],
        "productId": [],
        "quantity": [],
        "brand": [],
        "unitPrice": [],
        "customerId": [],
    }
    for el in data:
        df["stockCode"].append(el["productId"]["stockCode"])
        df["name"].append(el["productId"]["name"])
        df["productId"].append(el["productId"]["id"])
        df["brand"].append(el["productId"]["brand"])
        df["quantity"].append(el["quantity"])
        df["unitPrice"].append(el["unitPrice"])
        df["customerId"].append(el["salesId"]["customerId"])
    
    df = pd.DataFrame(df)
    df = df.dropna()
    df = df[df["quantity"] > 0]
    purchase_df: pd.DataFrame = (df.groupby(["customerId", "stockCode"])["quantity"].sum().unstack().reset_index().fillna(0).set_index("customerId"))
    purchase_df = purchase_df.map(encode_units)
    
    # applying cosine similarity to the purchase data matrix
    user_similarities  = cosine_similarity(purchase_df)
    # store the scores to a df
    user_similarities = pd.DataFrame(user_similarities, 
                                    index=purchase_df.index,
                                    columns=purchase_df.index)
    
    # Save the model to a file
    model_path = os.environ.get("collaborative_filtering_path")
    
    # save the filename to a db that includes the username and id
    model_filename = f"user_similarity-{storeId}-{merchantId}.pkl"
    if not os.path.exists(model_path):
        os.makedirs(model_path)
    
    joblib.dump(user_similarities, os.path.join(model_path, model_filename))
    
    return JSONResponse(content={"success": "Collaborative recommendation agent is ready for use. Please save the model to use it for prediction."})
    
@router.post("/user-to-user-filter/predict")
async def user_to_user_filter(storeId:int, merchantId:int, userIds: list[int] = Body(...), k:int=5, sample:int=10):
    repo = SaleDetailsRepository()
    data = await repo.get_sales_details(storeId=storeId)
    df = {
        "stockCode": [],
        "name": [],
        "productId": [],
        "quantity": [],
        "brand": [],
        "unitPrice": [],
        "customerId": [],
        "description": []
    }
    for el in data:
        df["stockCode"].append(el["productId"]["stockCode"])
        df["name"].append(el["productId"]["name"])
        df["productId"].append(el["productId"]["id"])
        df["brand"].append(el["productId"]["brand"])
        df["description"].append(el["productId"]["description"])
        df["quantity"].append(el["quantity"])
        df["unitPrice"].append(el["unitPrice"])
        df["customerId"].append(el["salesId"]["customerId"])
    
    df = pd.DataFrame(df)
    df = df.dropna()
    
    try: 
        # Save the model to a file
        model_path = os.environ.get("collaborative_filtering_path")
        
        # save the filename to a db that includes the username and id
        model_filename = f"user_similarity-{storeId}-{merchantId}.pkl"
        
        user_similarities = joblib.load(os.path.join(model_path, model_filename))
    except:
        raise HTTPException(status_code=404, detail=f"Collaborative model not found. Train collaborative model before testing recommendation.")

    recommendations = []
    failed_recom = []
    for userId in userIds:
        try:
            sim_u = similar_users(userId, user_similarities, k)
            recom = simu_recommendation(sim_u, df, sample)
            recommendations.append({"user": userId, "recommendations": recom})
        except ValueError as e:
            failed_recom.append(userId)

    return {"success": recommendations, "failed": failed_recom}

@router.get("/item-to-item-filter/train")
async def item_to_item_filter(storeId:int, merchantId: int):
    repo = SaleDetailsRepository()
    data = await repo.get_sales_details(storeId=storeId)
    df = {
        "stockCode": [],
        "name": [],
        "productId": [],
        "quantity": [],
        "brand": [],
        "unitPrice": [],
        "customerId": [],
    }
    for el in data:
        df["stockCode"].append(el["productId"]["stockCode"])
        df["name"].append(el["productId"]["name"])
        df["productId"].append(el["productId"]["id"])
        df["brand"].append(el["productId"]["brand"])
        df["quantity"].append(el["quantity"])
        df["unitPrice"].append(el["unitPrice"])
        df["customerId"].append(el["salesId"]["customerId"])

    df = pd.DataFrame(df)
    df = df.dropna()
    df = df[df["quantity"] > 0]
    purchase_df: pd.DataFrame = (df.groupby(["productId", "customerId"])["quantity"].sum().unstack().reset_index().fillna(0).set_index("productId"))
    purchase_df = purchase_df.map(encode_units)

    # applying cosine similarity to the purchase data matrix
    item_similarities  = cosine_similarity(purchase_df)
    # store the scores to a df
    item_similarities = pd.DataFrame(item_similarities, 
                                    index=purchase_df.index,
                                    columns=purchase_df.index)
    # Save the model to a file
    model_path = os.environ.get("collaborative_filtering_path")
    # save the filename to a db that includes the username and id
    model_filename = f"item_similarity-{storeId}-{merchantId}.pkl"
    if not os.path.exists(model_path):
        os.makedirs(model_path)
    
    joblib.dump(item_similarities, os.path.join(model_path, model_filename))
    
    return JSONResponse(content={"success": "Collaborative recommendation agent item to item filter is ready for use. Please save the model to use it for prediction."})
    
    

@router.post("/item-to-item-filter/predict")
async def item_to_item_filter(storeId:int, merchantId:int, userIds: list[int]=Body(...), k:int=10, sample:int=10):
    repo = SaleDetailsRepository()
    data = await repo.get_sales_details(storeId=storeId)
    df = {
        "stockCode": [],
        "name": [],
        "productId": [],
        "quantity": [],
        "brand": [],
        "unitPrice": [],
        "customerId": [],
        "description": []
    }
    for el in data:
        df["stockCode"].append(el["productId"]["stockCode"])
        df["name"].append(el["productId"]["name"])
        df["productId"].append(el["productId"]["id"])
        df["brand"].append(el["productId"]["brand"])
        df["description"].append(el["productId"]["description"])
        df["quantity"].append(el["quantity"])
        df["unitPrice"].append(el["unitPrice"])
        df["customerId"].append(el["salesId"]["customerId"])

    df = pd.DataFrame(df)
    df = df.dropna()
    
    try: 
        # Save the model to a file
        model_path = os.environ.get("collaborative_filtering_path")
        
        # save the filename to a db that includes the username and id
        model_filename = f"item_similarity-{storeId}-{merchantId}.pkl"
        
        item_similarities = joblib.load(os.path.join(model_path, model_filename))
    except:
        raise HTTPException(status_code=404, detail=f"Collaborative model not found. Train collaborative model before testing recommendation.")
    
    recommendations = []
    failed_recom = []
    for userId in userIds:
        try:
            sim_i = simi_recommendation(userId, item_similarities, df, k, sample)
            recommendations.append({"user": userId, "recommendations": sim_i})
        except ValueError as e:
            failed_recom.append(userId)

    return {"success": recommendations, "failed": failed_recom}
    