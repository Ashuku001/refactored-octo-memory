from io import BytesIO, StringIO
import zipfile
from fastapi.responses import JSONResponse, StreamingResponse
from matplotlib import pyplot as plt
import pandas as pd
from fastapi import APIRouter, HTTPException, Body
from dotenv import load_dotenv
import joblib
import os
import time
from sklearn.cluster import KMeans
from sklearn import metrics
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
from sklearn import preprocessing
from sklearn.cluster import AgglomerativeClustering, KMeans

from app.repository.sales import SaleDetailsRepository
from app.repository.customer import CustomerRepository
from app.machine_learning.api.helpers.clustering import age_distribution, elbow_method, explore_data, dendogram_method, plotting_percentages, recommend_product
from app.machine_learning.api.helpers.get_df import get_product_order_customer_df_2
from app.machine_learning.api.helpers.check_missing_data import missing_zero_values_tabels

router = APIRouter()
load_dotenv()

@router.get("/data-explore/bias")
async def EDA_bias(storeId: int, merchantId: int, train: bool = False, biased: bool = True):
    repo_order = SaleDetailsRepository()
    raw_orders = await repo_order.get_sales_hybrid(storeId=storeId)
    repo_cus = CustomerRepository()
    raw_customers = await repo_cus.get_all_Customers(merchantId=merchantId)
    
    df_order, df_customer, df_product = get_product_order_customer_df_2(raw_orders=raw_orders, raw_customers=raw_customers)
    
    if not train:
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
    
    if biased:
        image1, image2 = explore_data(df_customer)
        
        zip_buffer = BytesIO()
        with zipfile.ZipFile(zip_buffer, "w") as zf:
            zf.writestr("age_violin_plot.png", image1.getvalue())
            zf.writestr("gender_bar_plot.png", image2.getvalue())

        zip_buffer.seek(0)

        return StreamingResponse(
            zip_buffer,
            media_type="application/zip",
            headers={
                'Content-Disposition': 'attachment; filename=plots.zip',
                'Access-Control-Expose-Headers': 'Content-Disposition'
            }
        )
        
@router.get("/data-explore/age_distribution")
async def EDA_age_distribution(storeId: int, merchantId: int):
    repo_order = SaleDetailsRepository()
    raw_orders = await repo_order.get_sales_hybrid(storeId=storeId)
    repo_cus = CustomerRepository()
    raw_customers = await repo_cus.get_all_Customers(merchantId=merchantId)
    
    df_order, df_customer, df_product = get_product_order_customer_df_2(raw_orders=raw_orders, raw_customers=raw_customers)
    df_order = df_order.dropna()
    df_customer = df_customer.dropna()
    df_product = df_product.dropna()
    
    image = age_distribution(df_customer)
    return StreamingResponse(image, media_type="image/png")

@router.get("/train/k-means")
async def EDA_KMeans(storeId: int, merchantId: int):
    repo_order = SaleDetailsRepository()
    raw_orders = await repo_order.get_sales_hybrid(storeId=storeId)
    repo_cus = CustomerRepository()
    raw_customers = await repo_cus.get_all_Customers(merchantId=merchantId)
    
    df_order, df_customer, df_product = get_product_order_customer_df_2(raw_orders=raw_orders, raw_customers=raw_customers)
    df_order = df_order.dropna()
    df_customer = df_customer.dropna()
    df_product = df_product.dropna()
    
    # Label encoders
    gender_encoder = preprocessing.LabelEncoder()
    segment_encoder = preprocessing.LabelEncoder()
    income_encoder = preprocessing.LabelEncoder()

    # Encode labels in column
    df_customer["age"] = df_customer.age.astype('float')
    df_customer["gender"] = gender_encoder.fit_transform(df_customer.Gender)
    df_customer["customer_segment"] = segment_encoder.fit_transform(df_customer["customerSegment"])
    df_customer["income_segment"] = income_encoder.fit_transform(df_customer["income"])
    
    
    image = elbow_method(df_customer)
    return StreamingResponse(image, media_type="image/png")

@router.get("/train/dendogram")
async def EDA_dendogram(storeId: int, merchantId: int):
    repo_order = SaleDetailsRepository()
    raw_orders = await repo_order.get_sales_hybrid(storeId=storeId)
    repo_cus = CustomerRepository()
    raw_customers = await repo_cus.get_all_Customers(merchantId=merchantId)
    
    df_order, df_customer, df_product = get_product_order_customer_df_2(raw_orders=raw_orders, raw_customers=raw_customers)
    df_order = df_order.dropna()
    df_customer = df_customer.dropna()
    df_product = df_product.dropna()
    
    # Label encoders
    gender_encoder = preprocessing.LabelEncoder()
    segment_encoder = preprocessing.LabelEncoder()
    income_encoder = preprocessing.LabelEncoder()

    # Encode labels in column
    df_customer["age"] = df_customer.age.astype('float')
    df_customer["gender"] = gender_encoder.fit_transform(df_customer.Gender)
    df_customer["customer_segment"] = segment_encoder.fit_transform(df_customer["customerSegment"])
    df_customer["income_segment"] = income_encoder.fit_transform(df_customer["income"])

    # setting distance_threshold=0 ensures we compute the full tree
    model = AgglomerativeClustering(distance_threshold=0, n_clusters=None)
    model = model.fit(df_customer.iloc[:, 5:])
    
    filtered_image = BytesIO()
    plt.title("Hierarchical Clustering Dendrogram")
    plt.figure(figsize=(12, 6))
    # Plot the top three levels of the dendrogram
    dendogram_method(model, truncate_mode="level", p=3)
    plt.xlabel("Number of points in node (or index of point if no parenthesis).")
    plt.savefig(filtered_image, format="png") 
    filtered_image.seek(0)
    
    return StreamingResponse(filtered_image, media_type="image/png")


@router.get("/train/percentage-plots-per-segment")
async def EDA_percent_per_segment(storeId: int, merchantId: int):
    repo_order = SaleDetailsRepository()
    raw_orders = await repo_order.get_sales_hybrid(storeId=storeId)
    repo_cus = CustomerRepository()
    raw_customers = await repo_cus.get_all_Customers(merchantId=merchantId)
    
    df_order, df_customer, df_product = get_product_order_customer_df_2(raw_orders=raw_orders, raw_customers=raw_customers)
    df_order = df_order.dropna()
    df_customer = df_customer.dropna()
    df_product = df_product.dropna()
    
    # Label encoders
    gender_encoder = preprocessing.LabelEncoder()
    segment_encoder = preprocessing.LabelEncoder()
    income_encoder = preprocessing.LabelEncoder()

    # Encode labels in column
    df_customer["age"] = df_customer.age.astype('float')
    df_customer["gender"] = gender_encoder.fit_transform(df_customer.Gender)
    df_customer["customer_segment"] = segment_encoder.fit_transform(df_customer["customerSegment"])
    df_customer["income_segment"] = income_encoder.fit_transform(df_customer["income"])
    
    # Building a K-means algorithm considering 15 clusters
    km = KMeans(n_clusters=15)
    # use the encoded values to fit the model i.e., assign to a cluster 
    clusters = km.fit_predict(df_customer.iloc[:, 5:])

    # saving predition back toraw dataset
    df_customer["cluster"] = clusters
    # select required columns
    df_customer = df_customer[["customerId", "Gender", "age", "income", "zipcode", "customerSegment", "cluster"]]
    
    image = plotting_percentages(df_customer, "cluster", "customerSegment")
    
    return StreamingResponse(image, media_type="image/png")

@router.get("/train/percentage-plots-per-gender")
async def EDA_percent_per_gender(storeId: int, merchantId: int):
    repo_order = SaleDetailsRepository()
    raw_orders = await repo_order.get_sales_hybrid(storeId=storeId)
    repo_cus = CustomerRepository()
    raw_customers = await repo_cus.get_all_Customers(merchantId=merchantId)
    
    df_order, df_customer, df_product = get_product_order_customer_df_2(raw_orders=raw_orders, raw_customers=raw_customers)
    df_order = df_order.dropna()
    df_customer = df_customer.dropna()
    df_product = df_product.dropna()
    
    # Label encoders
    gender_encoder = preprocessing.LabelEncoder()
    segment_encoder = preprocessing.LabelEncoder()
    income_encoder = preprocessing.LabelEncoder()

    # Encode labels in column
    df_customer["age"] = df_customer.age.astype('float')
    df_customer["gender"] = gender_encoder.fit_transform(df_customer.Gender)
    df_customer["customer_segment"] = segment_encoder.fit_transform(df_customer["customerSegment"])
    df_customer["income_segment"] = income_encoder.fit_transform(df_customer["income"])
    
    # Building a K-means algorithm considering 15 clusters
    km = KMeans(n_clusters=15)
    # use the encoded values to fit the model i.e., assign to a cluster 
    clusters = km.fit_predict(df_customer.iloc[:, 5:])

    # saving predition back toraw dataset
    df_customer["cluster"] = clusters
    # select required columns
    df_customer = df_customer[["customerId", "Gender", "age", "income", "zipcode", "customerSegment", "cluster"]]
    
    image = plotting_percentages(df_customer, "cluster", "Gender")
    
    return StreamingResponse(image, media_type='image/png')

@router.get("/train/average-age-per-cluster")
async def EDA_avg_age_per_cluster(storeId: int, merchantId: int):
    repo_order = SaleDetailsRepository()
    raw_orders = await repo_order.get_sales_hybrid(storeId=storeId)
    repo_cus = CustomerRepository()
    raw_customers = await repo_cus.get_all_Customers(merchantId=merchantId)
    
    df_order, df_customer, df_product = get_product_order_customer_df_2(raw_orders=raw_orders, raw_customers=raw_customers)
    df_order = df_order.dropna()
    df_customer = df_customer.dropna()
    df_product = df_product.dropna()
    
    # Label encoders
    gender_encoder = preprocessing.LabelEncoder()
    segment_encoder = preprocessing.LabelEncoder()
    income_encoder = preprocessing.LabelEncoder()

    # Encode labels in column
    df_customer["age"] = df_customer.age.astype('float')
    df_customer["gender"] = gender_encoder.fit_transform(df_customer.Gender)
    df_customer["customer_segment"] = segment_encoder.fit_transform(df_customer["customerSegment"])
    df_customer["income_segment"] = income_encoder.fit_transform(df_customer["income"])

    
    # Building a K-means algorithm considering 15 clusters
    km = KMeans(n_clusters=15)
    # use the encoded values to fit the model i.e., assign to a cluster 
    clusters = km.fit_predict(df_customer.iloc[:, 5:])

    # saving predition back toraw dataset
    df_customer["cluster"] = clusters
    # select required columns
    df_customer = df_customer[["customerId", "Gender", "age", "income", "zipcode", "customerSegment", "cluster"]]
    
    filtered_image = BytesIO()
    plt.title("Average age per cluster")
    # plotting a chart that gives average age per cluster
    df_customer.groupby("cluster").agg({"age": "mean"}).plot(kind="bar")
    plt.savefig(filtered_image, format="png")
    filtered_image.seek(0)
    return StreamingResponse(filtered_image, media_type='image/png')


@router.post("/train")
async def train(storeId: int, merchantId: int, userIds: list[int] = Body(...), n_clusters:int=15, sample:int=5):
    repo_order = SaleDetailsRepository()
    raw_orders = await repo_order.get_sales_hybrid(storeId=storeId)
    repo_cus = CustomerRepository()
    raw_customers = await repo_cus.get_all_Customers(merchantId=merchantId)
    
    df_order, df_customer, df_product = get_product_order_customer_df_2(raw_orders=raw_orders, raw_customers=raw_customers)
    df_order = df_order.dropna()
    df_customer = df_customer.dropna()
    df_product = df_product.dropna()
    
    # Label encoders
    gender_encoder = preprocessing.LabelEncoder()
    segment_encoder = preprocessing.LabelEncoder()
    income_encoder = preprocessing.LabelEncoder()

    # Encode labels in column
    df_customer["age"] = df_customer.age.astype('float')
    df_customer["gender"] = gender_encoder.fit_transform(df_customer.Gender)
    df_customer["customer_segment"] = segment_encoder.fit_transform(df_customer["customerSegment"])
    df_customer["income_segment"] = income_encoder.fit_transform(df_customer["income"])
    start_1 = time.time()
    
    # Building a K-means algorithm considering 15 clusters
    km = KMeans(n_clusters=15)
    # use the encoded values to fit the model i.e., assign to a cluster 
    clusters = km.fit_predict(df_customer.iloc[:, 5:])

    # saving predition back toraw dataset
    df_customer["cluster"] = clusters
    # select required columns
    df_customer = df_customer[["customerId", "Gender", "age", "income", "zipcode", "customerSegment", "cluster"]]
    
    order_cluster_mapping = pd.merge(df_order, df_customer, on="customerId", how="inner")[["productId", "customerId", "cluster"]]
    # score_df used to recommend new products other customers in the same cluster have bought the recmmended products
    score_df = order_cluster_mapping.groupby(["cluster", "productId"]).count().reset_index()
    score_df = score_df.rename(columns={"customerId": "score"})
    
    
    df_product = df_order[["productId", "name", "description", "brand", "unitPrice"]]
    print(df_customer.head(10))
    # remove words like we'll, you'll etc
    df_product.loc[:, "description"] = df_product["description"].replace({"'ll": " "}, regex=True)
    df_product.loc[:, "description"] = df_product["description"].replace({"-": " "}, regex=True)
    df_product.loc[:, "description"] = df_product["description"].replace({"[^A-Za-z0-9 ]+": ""}, regex=True)
    
    # converting text to freatures
    vectorizer = TfidfVectorizer(stop_words="english")
    X = vectorizer.fit_transform(df_product["description"])
    
    km_des = KMeans(n_clusters=n_clusters, init="k-means++")
    
    clusters = km_des.fit_predict(X)
    
    df_product["cluster"] = clusters
    
    end_1 = time.time()
    print("[FIRST PHASE]]", end_1 - start_1)
    
    start = time.time()
    rec_product = []
    no_recommendation = []
    for id in userIds:
        try:
            sim_u_temp = []
            sim_i_temp = []
            sim_u, sim_i = recommend_product(
                    id,
                    score_df,
                    order_cluster_mapping,
                    df_product,
                    df_order,
                    sample
                )
            print(sim_u)
            print(sim_i)
            
            for index, row in sim_u.iterrows():
                sim_u_temp.append({
                    "name": row["name"],
                    "id": row["productId"],
                    "price": row["unitPrice"],
                    "brand": row["brand"],
                })
                
            for index, row in sim_i.iterrows():
                sim_i_temp.append({
                    "name": row["name"],
                    "id": row["productId"],
                    "price": row["unitPrice"],
                    "brand": row["brand"],
                })
                
            rec_product.append({
                    "recommendation_for": id,
                    "similar_users_recommendations": sim_u_temp,
                    "similar_items_recommendations": sim_i_temp
                })
        except IndexError as e: 
            no_recommendation.append(id)
            pass
    end = time.time()
    print("[SECOND PHASE]", end - start)
    print(rec_product)
    return {"success": rec_product, "failed": no_recommendation}

# 13089, 15810, 13137, 14472, 14646, 14543, 16701, 16241, 15556