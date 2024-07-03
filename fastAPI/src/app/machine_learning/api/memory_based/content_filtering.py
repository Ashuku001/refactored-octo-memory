import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
import re
from fastapi.responses import  JSONResponse
from fastapi import APIRouter, HTTPException
import joblib
import os
from dotenv import load_dotenv

from app.repository.product import ProductRepository
from app.machine_learning.api.helpers.content import get_recommendation_tfidf

router = APIRouter()
load_dotenv()

@router.get("/tfidf/train")
async def train(storeId:int):
    repo = ProductRepository()
    data = await repo.get_all_products(storeId=storeId)
    df = {
        "productId": [],
        "name": [],
        "description": [],
        "price": [],
        "brand": [],
        "category": [],
    }
    for el in data:
        df["name"].append(el["name"])
        df["description"].append(el["description"])
        df["productId"].append(el["id"])
        df["price"].append(el["price"])
        df["brand"].append(el["brand"])
        df["category"].append(el["categoryId"]["name"])
    
    df = pd.DataFrame(df)
    
    # combine product and description
    df.loc[:, "description"] = df["name"] + " " + df["description"]
    
    # Droppint Duplicates and keeping first record
    unique_df = df.drop_duplicates(subset=["productId"], keep="first")

    # Converting String to lower case
    unique_df["desc_lower"] = unique_df["description"].apply(lambda x: str(x).lower())

    # remove stop special characters
    unique_df.loc[:, "desc_lower"] = unique_df["desc_lower"].apply(lambda x: re.sub(r'[^\w\s]', '', x))

    # Converting desc_lower to list
    desc_list = list(unique_df["desc_lower"])

    # Importing IFIDF
    tfidf_vec = TfidfVectorizer(stop_words="english", analyzer='word', ngram_range=(1, 3))
    
    # Create vector usig tfidf
    model = tfidf_vec.fit_transform(desc_list)
    
    # Save the model to a file
    model_path = os.environ.get("content_filtering_path")
    
    # save the filename to a db that includes the username and id
    model_filename = "tfidf_vec_model.pkl"
    if not os.path.exists(model_path):
        os.makedirs(model_path)
        
    # save the model path to a database to have stats about the models performance   
    joblib.dump(model, os.path.join(model_path, model_filename))
    
    return JSONResponse(content={"success": "content based recommeder is ready for use. Please save the model to use it for prediction."})

@router.get("/tfidf/content-based-recommender")
async def recommend(storeId:int, productId: int, similarity: str):
    repo = ProductRepository()
    data = await repo.get_all_products(storeId=storeId)
    df = {
        "productId": [],
        "name": [],
        "description": [],
        "price": [],
        "brand": [],
        "category": [],
    }
    for el in data:
        df["name"].append(el["name"])
        df["description"].append(el["description"])
        df["productId"].append(el["id"])
        df["price"].append(el["price"])
        df["brand"].append(el["brand"])
        df["category"].append(el["categoryId"]["name"])
    
    df = pd.DataFrame(df)
    
    # combine product and description
    df.loc[:, "description"] = df["name"] + " " + df["description"]

    # Droppint Duplicates and keeping first record
    unique_df = df.drop_duplicates(subset=["productId"], keep="first")
 
    # Converting String to lower case
    unique_df.loc[:, "desc_lower"] = unique_df["description"].apply(lambda x: str(x).lower())

    # remove stop special characters
    unique_df.loc[:, "desc_lower"] = unique_df["desc_lower"].apply(lambda x: re.sub(r'[^\w\s]', '', x))

    # Converting desc_lower to list
    desc_list = list(unique_df["desc_lower"])
    
    unique_df = unique_df.reset_index(drop=True)
    
    model_path = os.environ.get("content_filtering_path")
    
    #filename retrive from a database
    model_filename = "tfidf_vec_model.pkl"
    
    try:
        model = joblib.load(os.path.join(model_path, model_filename))
    except:
        return HTTPException(status_code=404, detail={"model_not_found": "Could not find a model train and save the model"})
    
    products =  get_recommendation_tfidf(productId, df=unique_df, similarity=similarity, tfidf_matrix=model, desc_list=desc_list, )
    if products is not None:
        return products
    else:
        return HTTPException(status_code=404, detail={"not_found": "No similar products found"})
    