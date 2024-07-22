import pandas as pd
from fastapi import APIRouter, HTTPException
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

@router.get("/user-to-user-filter")
async def user_to_user_filter(storeId:int, customerId: int, k:int=5, sample:int=10):
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
    
    try:
        sim_u = similar_users(customerId, user_similarities, k)
        recommendations = simu_recommendation(sim_u, df, sample)
        return recommendations
    except ValueError as e:
        raise HTTPException(status_code=404, detail=f"customer of id {customerId} not found.")

@router.get("/item_to_item_filter")
async def item_to_item_filter(storeId:int, customerId: int, k:int=10, sample:int=10):
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
    print(item_similarities.head())
    
    try:
        sim_i = simi_recommendation(customerId, item_similarities, df, k, sample)
        print(sim_i)
        
        return sim_i
    except ValueError as e:
        raise HTTPException(status_code=404, detail={"not_found": f"similar items for user id {customerId} not found."})
    