from io import BytesIO, StringIO
import zipfile
from fastapi.responses import JSONResponse, StreamingResponse
from matplotlib import pyplot as plt
import numpy as np
import pandas as pd
from fastapi import APIRouter, HTTPException, Body
from dotenv import load_dotenv
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import roc_auc_score, roc_curve
from sklearn.neighbors import KNeighborsClassifier
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.linear_model import LogisticRegression

from app.repository.sales import SaleDetailsRepository
from app.repository.customer import CustomerRepository
from app.machine_learning.api.helpers.get_df import get_product_order_customer_df_1
from app.repository.category import CategoryRepository
from app.machine_learning.api.helpers.check_missing_data import missing_zero_values_tabels
from app.machine_learning.api.helpers.classification import EDA_age_distribution, EDA_age_distribution_by_category, EDA_customers_bought, EDA_income, EDA_popular_brand, feature_engineering, select_model

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
    
    label_encoder = LabelEncoder()
    final_data["productId"] = label_encoder.fit_transform(final_data["productId"])
    mappings = {}
    mappings["productId"] = dict(zip(label_encoder.classes_, range(len(label_encoder.classes_))))
    final_data["Gender"] = label_encoder.fit_transform(final_data["Gender"])
    final_data["customerSegment"] = label_encoder.fit_transform(final_data["customerSegment"])
    final_data["brand"] = label_encoder.fit_transform(final_data["brand"])
    final_data["category"] = label_encoder.fit_transform(final_data["category"])
    final_data["income"] = label_encoder.fit_transform(final_data["income"])
    final_data = final_data.drop(columns=["description", "name"], axis=1)

    # Seperate the dependent and independent variable
    x = final_data.drop(["flag_buy"], axis=1)
    y = final_data["flag_buy"]
    x_train, x_test, y_train, y_test = train_test_split(x, y, train_size=0.75, random_state=42)
    print(">>>>",x_train)
    print(">>>>",y_train)
    print(">>>>",x_test)
    print(">>>>",y_test)
    print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<,,,,>")
    best_model_name, best_model_info = select_model(x_train, y_train, x_test, y_test)
    
    return JSONResponse(content={"success": f"Classifier {best_model_name} model is ready for prediction with an accuracy score of {best_model_info['accuracy']}"})