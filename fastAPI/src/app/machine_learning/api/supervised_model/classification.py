from collections import Counter
from io import BytesIO, StringIO
import os
import random
import zipfile
from fastapi.responses import JSONResponse, StreamingResponse
import joblib
from matplotlib import pyplot as plt
import numpy as np
import pandas as pd
from fastapi import APIRouter, HTTPException, Body
from dotenv import load_dotenv
from imblearn.over_sampling import SMOTE
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

from app.repository.sales import SaleDetailsRepository
from app.repository.customer import CustomerRepository
from app.machine_learning.api.helpers.get_df import get_product_order_customer_df_1
from app.repository.category import CategoryRepository
from app.machine_learning.api.helpers.check_missing_data import missing_zero_values_tabels
from app.machine_learning.api.helpers.classification import EDA_age_distribution, EDA_age_distribution_by_category, EDA_customers_bought, EDA_income, EDA_popular_brand, encode_data, feature_engineering, feature_engineering_2, get_recommendations, scale_data, select_model

router = APIRouter()
load_dotenv()

@router.get("/data-explore/missing-data")
async def EDA_missing_data(storeId: int, merchantId: int):
    repo_order = SaleDetailsRepository()
    raw_orders = await repo_order.get_sales_classification(storeId=storeId)
    repo_cus = CustomerRepository()
    raw_customers = await repo_cus.get_all_Customers(merchantId=merchantId)
    repo_cat = CategoryRepository()
    raw_categories = await repo_cat.get_all_Categories(storeId=storeId)
    
    df_order, df_customer, df_product = get_product_order_customer_df_1(raw_orders=raw_orders, raw_customers=raw_customers, raw_categories=raw_categories)
    
    image1 = missing_zero_values_tabels(df_product)
    image2 = missing_zero_values_tabels(df_customer)
    
    zip_buffer = BytesIO()
    with zipfile.ZipFile(zip_buffer, "w") as zf:
        zf.writestr("products_.xlsx", image1.getvalue())
        zf.writestr("customers_.xlsx", image2.getvalue())

    zip_buffer.seek(0)
    
    return StreamingResponse(
        zip_buffer,
        media_type="application/zip",
        # media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        headers={
            'Content-Disposition': 'attachment;filename=missing_and_zero_values.zip',
            'Access-Control-Expose-Headers': 'Content-Disposition'
        }
    )

@router.get("/data-explore/popular_brand")
async def EDA_brand(storeId: int, merchantId: int):
    repo_order = SaleDetailsRepository()
    raw_orders = await repo_order.get_sales_classification(storeId=storeId)
    repo_cus = CustomerRepository()
    raw_customers = await repo_cus.get_all_Customers(merchantId=merchantId)
    repo_cat = CategoryRepository()
    raw_categories = await repo_cat.get_all_Categories(storeId)
    
    df_order, df_customer, df_product = get_product_order_customer_df_1(raw_orders=raw_orders, raw_customers=raw_customers, raw_categories=raw_categories)
    df_order = df_order.dropna()
    df_customer = df_customer.dropna()
    df_product = df_product.dropna()
    
    final_data = feature_engineering(df_order, df_customer, df_product)
    
    image = EDA_popular_brand(final_data)
    return StreamingResponse(image, media_type='image/png')

@router.get("/data-explore/income")
async def EDA_brand(storeId: int, merchantId: int):
    repo_order = SaleDetailsRepository()
    raw_orders = await repo_order.get_sales_classification(storeId=storeId)
    repo_cus = CustomerRepository()
    raw_customers = await repo_cus.get_all_Customers(merchantId=merchantId)
    repo_cat = CategoryRepository()
    raw_categories = await repo_cat.get_all_Categories(storeId)
    
    df_order, df_customer, df_product = get_product_order_customer_df_1(raw_orders=raw_orders, raw_customers=raw_customers, raw_categories=raw_categories)
    df_order = df_order.dropna()
    df_customer = df_customer.dropna()
    df_product = df_product.dropna()
    
    final_data = feature_engineering(df_order, df_customer, df_product)
    image = EDA_income(final_data)
    return StreamingResponse(image, media_type='image/png')

@router.get("/data-explore/income")
async def EDA_brand(storeId: int, merchantId: int):
    repo_order = SaleDetailsRepository()
    raw_orders = await repo_order.get_sales_classification(storeId=storeId)
    repo_cus = CustomerRepository()
    raw_customers = await repo_cus.get_all_Customers(merchantId=merchantId)
    repo_cat = CategoryRepository()
    raw_categories = await repo_cat.get_all_Categories(storeId)
    
    df_order, df_customer, df_product = get_product_order_customer_df_1(raw_orders=raw_orders, raw_customers=raw_customers, raw_categories=raw_categories)
    df_order = df_order.dropna()
    df_customer = df_customer.dropna()
    df_product = df_product.dropna()
    
    final_data = feature_engineering(df_order, df_customer, df_product)
    image = EDA_income(final_data)
    return StreamingResponse(image, media_type='image/png')

@router.get("/data-explore/age-distribution")
async def EDA_age_dist(storeId: int, merchantId: int):
    repo_order = SaleDetailsRepository()
    raw_orders = await repo_order.get_sales_classification(storeId=storeId)
    repo_cus = CustomerRepository()
    raw_customers = await repo_cus.get_all_Customers(merchantId=merchantId)
    repo_cat = CategoryRepository()
    raw_categories = await repo_cat.get_all_Categories(storeId)
    
    df_order, df_customer, df_product = get_product_order_customer_df_1(raw_orders=raw_orders, raw_customers=raw_customers, raw_categories=raw_categories)
    df_order = df_order.dropna()
    df_customer = df_customer.dropna()
    df_product = df_product.dropna()
    
    final_data = feature_engineering(df_order, df_customer, df_product)
    image = EDA_age_distribution(final_data)
    return StreamingResponse(image, media_type='image/png')

@router.get("/data-explore/age-distribution-by-category")
async def EDA_age_dist(storeId: int, merchantId: int):
    repo_order = SaleDetailsRepository()
    raw_orders = await repo_order.get_sales_classification(storeId=storeId)
    repo_cus = CustomerRepository()
    raw_customers = await repo_cus.get_all_Customers(merchantId=merchantId)
    repo_cat = CategoryRepository()
    raw_categories = await repo_cat.get_all_Categories(storeId)
    
    df_order, df_customer, df_product = get_product_order_customer_df_1(raw_orders=raw_orders, raw_customers=raw_customers, raw_categories=raw_categories)
    df_order = df_order.dropna()
    df_customer = df_customer.dropna()
    df_product = df_product.dropna()
    
    final_data = feature_engineering(df_order, df_customer, df_product)
    image = EDA_age_distribution_by_category(final_data)
    return StreamingResponse(image, media_type='image/png')


@router.get("/data-explore/target-distribution")
async def EDA_customers_buy(storeId: int, merchantId: int):
    repo_order = SaleDetailsRepository()
    raw_orders = await repo_order.get_sales_classification(storeId=storeId)
    repo_cus = CustomerRepository()
    raw_customers = await repo_cus.get_all_Customers(merchantId=merchantId)
    repo_cat = CategoryRepository()
    raw_categories = await repo_cat.get_all_Categories(storeId)
    
    df_order, df_customer, df_product = get_product_order_customer_df_1(raw_orders=raw_orders, raw_customers=raw_customers, raw_categories=raw_categories)
    df_order = df_order.dropna()
    df_customer = df_customer.dropna()
    df_product = df_product.dropna()
    
    final_data = feature_engineering(df_order, df_customer, df_product)
    image = EDA_customers_bought(final_data)
    return StreamingResponse(image, media_type='image/png')

@router.get("/classifier/train")
async def train(storeId: int, merchantId: int, balanced: bool = False):
    repo_order = SaleDetailsRepository()
    raw_orders = await repo_order.get_sales_classification(storeId=storeId)
    repo_cus = CustomerRepository()
    raw_customers = await repo_cus.get_all_Customers(merchantId=merchantId)
    repo_cat = CategoryRepository()
    raw_categories = await repo_cat.get_all_Categories(storeId)
    
    df_order, df_customer, df_product = get_product_order_customer_df_1(raw_orders=raw_orders, raw_customers=raw_customers, raw_categories=raw_categories)
    df_order = df_order.dropna()
    df_customer = df_customer.dropna()
    df_product = df_product.dropna()
    data = feature_engineering(df_order, df_customer, df_product)
    final_data, _ = encode_data(data)
    
    # Seperate the dependent and independent variable
    x = final_data.drop(["flag_buy"], axis=1)[["customerId","customerSegment","income","Gender","age","productId","quantity","brand","unitPrice","category"]]
    y = final_data["flag_buy"]
    
    x_scaled_df = scale_data(x)
    
    x_train, x_test, y_train, y_test = train_test_split(x_scaled_df, y, train_size=0.75, random_state=42)
    
    if not balanced:
        smote = SMOTE(sampling_strategy='auto', random_state=42)
        X_res, y_res = smote.fit_resample(x_train, y_train)

        x_train=X_res
        y_train=y_res
        # Count the number of classes
        print("The number of classes before fit {}".format(Counter(y)))
        print("The number of classes after fit {}".format(Counter(y_res)))
    

    
    model_name, model_info = select_model(x_train, y_train, x_test, y_test)
    
    # Save the model to a file
    model_path = os.environ.get("classification_path")
    # save the filename to a db that includes the username and id and storeId
    model_filename = f"{model_name}_model.pkl"
    if not os.path.exists(model_path):
        os.makedirs(model_path)
    # save the model path to a database to have stats about the models performance   
    joblib.dump(model_info["model"], os.path.join(model_path, model_filename))
    
    return JSONResponse(content={"success": f"Classifier {model_name} model is ready for prediction with an accuracy score of {model_info['accuracy']}"})

@router.post("/classifier/predict")
async def predict(storeId: int, merchantId: int, userIds: list[int] = Body(...), sample:int=5):
    repo_order = SaleDetailsRepository()
    raw_orders = await repo_order.get_sales_classification(storeId=storeId)
    repo_cus = CustomerRepository()
    raw_customers = await repo_cus.get_all_Customers(merchantId=merchantId)
    repo_cat = CategoryRepository()
    raw_categories = await repo_cat.get_all_Categories(storeId)
    
    df_order, df_customer, df_product = get_product_order_customer_df_1(raw_orders=raw_orders, raw_customers=raw_customers, raw_categories=raw_categories)
    df_order = df_order.dropna()
    df_customer = df_customer.dropna()
    df_product = df_product.dropna()
    
    df_user = df_customer[df_customer["customerId"].isin(userIds)]
    
    data = feature_engineering_2(df_order, df_user, df_product)
    
    ids = []
    for id in userIds:
        if len(data[data["customerId"] == id]) > 900:
            ids.append(id)
    print("IDS NOT 900",ids)
    
    
    final_data, mappings = encode_data(data)
    # Seperate the dependent and independent variable
    x = final_data.drop(["flag_buy"], axis=1)[["customerId","customerSegment","income","Gender","age","productId","quantity","brand","unitPrice","category"]]
    y = final_data["flag_buy"]
    
    x_scaled_df = scale_data(x)
    
    try:
        # Save the model to a file
        model_path = os.environ.get("classification_path")
        # save the filename to a db that includes the username and id and storeId
        model_filename = f"{'LogisticRegression'}_model.pkl"
        # save the model path to a database to have stats about the models performance   
        model = joblib.load(os.path.join(model_path, model_filename))
    except:
        raise "Classification agent not found. Please train and save a classification model"
    
    customer_rec = []
    no_recommendation = []
    for userId in userIds:
        items = get_recommendations(model, x_scaled_df, userId, mappings, sample)
        if not items:
            print(">>>no-rec", userId)
            no_recommendation.append(userId)
            continue
        
        # getting recommendations from product names
        recommendations = [] 
        for i in items:
            product = df_product[df_product["productId"] == int(i)]
            if not product.empty: 
                product = product.iloc[0]  
                recommendations.append({
                        "productId": product["productId"],
                        "name": product["name"],
                        "unitPrice": product["unitPrice"],
                        "brand": product["brand"],
                    })
            else:
                print(">>>no-rec2", userId)
                no_recommendation.append(userId)
                continue
        print(">>>rec",recommendations[:2])
        if recommendations:
            customer_rec.append({
                    # "user": userId,
                    "recommendations": recommendations
                })
        else:
            print(">>>no-rec2", userId)
            no_recommendation.append(userId)
            continue
    return {"success": customer_rec, "failed": no_recommendation}
        
# [18126, 13873, 16171, 16034, 17560, 13971, 15180, 16674, 16141, 13803, 17860, 12371, 17866, 16461, 15234, 17379, 17054, 16638, 17122, 14769, 15628, 17940, 18226, 16202, 16705, 15208, 17759, 14651, 13347, 14264, 18143, 16795, 17950, 15906, 16672, 13311, 12690, 18071, 16213, 16415, 13276, 16169, 17820, 15589, 15134, 14806, 16053, 15266, 15468, 15567]