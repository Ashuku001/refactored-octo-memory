from fastapi.responses import JSONResponse
import pandas as pd
from fastapi import APIRouter, Body, HTTPException
from dotenv import load_dotenv
from sklearn.neighbors import NearestNeighbors
from scipy.sparse import csr_matrix
import joblib
import os

from app.repository.sales import SaleDetailsRepository
from app.machine_learning.api.helpers.knn import knn_recommendation, similar_users_knn

router = APIRouter()
load_dotenv()

def encode_units(x):
    if x < 1:
        return 0
    if x >= 1:
        return 1

@router.get("/knn-model/train")
async def knn_train(storeId:int, merchantId: int):
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
        df["brand"].append(el["productId"]["brandId"]["name"])
        df["quantity"].append(el["quantity"])
        df["unitPrice"].append(el["unitPrice"])
        df["customerId"].append(el["salesId"]["customerId"])
    
    df = pd.DataFrame(df)
    df = df.dropna()
    df = df[df["quantity"] > 0]
    purchase_df: pd.DataFrame = (df.groupby(["customerId", "productId"])["quantity"].sum().unstack().reset_index().fillna(0).set_index("customerId"))
    purchase_df = purchase_df.map(encode_units)
    
    # convert sparse matrix into csr matrix
    purchase_matrix = csr_matrix(purchase_df.values)
    model = NearestNeighbors(metric="euclidean", algorithm="brute")

    model.fit(purchase_matrix)
    
    # Save the model to a file
    model_path = os.environ.get("collaborative_filtering_path")
    
    # save the filename to a db that includes the username and id and storeId
    model_filename = f"knn_model-{storeId}-{merchantId}.pkl"
    if not os.path.exists(model_path):
        os.makedirs(model_path)
        
    # save the model path to a database to have stats about the models performance   
    joblib.dump(model, os.path.join(model_path, model_filename))
    
    return JSONResponse(content={"success": "k-nearest neighbor agent has been trained successfully and ready for prediction."})

@router.post("/knn-model/predict")
async def knn_predict(storeId:int, merchantId:int, userIds: list[int] = Body(...), k:int=10, sample:int=10):
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
        df["brand"].append(el["productId"]["brandId"]["name"])
        df["description"].append(el["productId"]["description"])
        df["quantity"].append(el["quantity"])
        df["unitPrice"].append(el["unitPrice"])
        df["customerId"].append(el["salesId"]["customerId"])
    
    df = pd.DataFrame(df)
    df = df.dropna()
    df = df[df["quantity"] > 0]
    purchase_df: pd.DataFrame = (df.groupby(["customerId", "productId"])["quantity"].sum().unstack().reset_index().fillna(0).set_index("customerId"))
    purchase_df = purchase_df.map(encode_units)
    
    model_path = os.environ.get("collaborative_filtering_path")
    #filename retrive from a database
    model_filename = f"knn_model-{storeId}-{merchantId}.pkl"
    
    try:
        model = joblib.load(os.path.join(model_path, model_filename))
    except:
        raise HTTPException(status_code=404, detail={"model_not_found": "Could not find a model train and save the model"})
    
    
    recommendations = []
    failed_rec = []
    for userId in userIds:
        try:
            sim_u = []
            sim_u += similar_users_knn(model, purchase_df, userId, k)
            products =  knn_recommendation(sim_u, df, sample)
            recommendations.append({"user": userId, "recommendations": products})
        except:
            failed_rec.append(userId)
    return {"success": recommendations, "failed": failed_rec}