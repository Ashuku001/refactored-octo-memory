import os
from fastapi.responses import JSONResponse
import pandas as pd
from dotenv import load_dotenv
from fastapi import APIRouter, Body, HTTPException
import sys
import pandas as pd
import tensorflow.compat.v1 as tf # type: ignore

from recommenders.utils.timer import Timer
from recommenders.models.ncf.ncf_singlenode import NCF
from recommenders.models.ncf.dataset import Dataset as NCFDataset
#from recommenders.datasets import movielens 
from recommenders.datasets.python_splitters import python_chrono_split
from recommenders.evaluation.python_evaluation import (rmse, mae, rsquared, exp_var, map_at_k, ndcg_at_k, precision_at_k, 
                                                     recall_at_k, get_top_k_items)
from app.machine_learning.api.helpers.get_df import get_product_order_customer_df_1
from app.repository.category import CategoryRepository
from app.repository.customer import CustomerRepository
from app.repository.sales import SaleDetailsRepository
from app.machine_learning.api.helpers.deep_learning import NCFWrapper, get_recommendation

router = APIRouter()
load_dotenv()

@router.get("/dnn/train")
async def train(storeId: int, merchantId: int, unbalanced: bool= True, TOP_K:int = 10, EPOCHS:int=10, BATCH_SIZE:int=256, SEED:int=42):
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
    
    df = df_order[["customerId", "productId", "quantity", "saleDate"]]
    df.loc[:, "productId"] = df["productId"].apply(lambda x: pd.to_numeric(x, errors="coerce")).dropna()
    df = df.dropna()
    
    # Renaming columns 
    df.rename(columns={"customerId": "userID", "productId": "itemID", "quantity": "rating", "saleDate": "timestamp"}, inplace=True)
    df.loc[:, "userID"]= df["userID"].astype('int')
    df.loc[:, "itemID"]= df["itemID"].astype('int')
    
    train, test = python_chrono_split(df, 0.75)
    
    file_path = os.environ.get("training_data_path")
    
    # save the filename to a db that includes the username and id and storeId
    if not os.path.exists(file_path):
        os.makedirs(file_path)
        
    train_file_name = f"train_{merchantId}.csv"
    test_file_name = f"test_{merchantId}.csv"
    train_file = os.path.join(file_path, train_file_name)
    test_file = os.path.join(file_path, test_file_name)
    
    train.to_csv(train_file, index=False)
    test.to_csv(test_file, index=False)
    
    data = NCFDataset(train_file=train_file, test_file=test_file, seed=SEED)
    
    model = NCF (
        n_users=data.n_users, 
        n_items=data.n_items,
        model_type="NeuMF",
        n_factors=4,
        layer_sizes=[16,8,4],
        n_epochs=EPOCHS,
        batch_size=BATCH_SIZE,
        learning_rate=1e-3,
        verbose=10,
        seed=SEED
    )
    
    with Timer() as train_time:
        model.fit(data)

    print("Took {} seconds for training.".format(train_time))
    
    with Timer() as test_time:
        users, items, preds = [], [], []
        item = list(train.itemID.unique())
        for user in train.userID.unique():
            user = [user] * len(item) 
            users.extend(user)
            items.extend(item)
            preds.extend(list(model.predict(user, item, is_list=True)))

        all_predictions = pd.DataFrame(data={"userID": users, "itemID":items, "prediction":preds})

        merged = pd.merge(train, all_predictions, on=["userID", "itemID"], how="outer")
        all_predictions = merged[merged.rating.isnull()].drop('rating', axis=1)

    print("Took {} seconds for prediction.".format(test_time))
    
    eval_map = map_at_k(test, all_predictions, col_prediction='prediction', k=TOP_K)
    eval_ndcg = ndcg_at_k(test, all_predictions, col_prediction='prediction', k=TOP_K)
    eval_precision = precision_at_k(test, all_predictions, col_prediction='prediction', k=TOP_K)
    eval_recall = recall_at_k(test, all_predictions, col_prediction='prediction', k=TOP_K)

    print("MAP:\t%f" % eval_map,
        "NDCG:\t%f" % eval_ndcg,
        "Precision@K:\t%f" % eval_precision,
        "Recall@K:\t%f" % eval_recall, sep='\n')
    # Save the model to a file
    model_path = os.environ.get("deep_learning_path")
    
    # save the filename to a db that includes the username and id and storeId
    model_filename = f"DLL{merchantId}_model.h5"
    if not os.path.exists(model_path):
        os.makedirs(model_path)
        
    with tf.Session() as sess:
        model.save(os.path.join(model_path, model_filename))
    
    return JSONResponse(content={"success": f"Deep learning neural network model is ready for prediction with a precision score of {eval_precision}"})

@router.post("/dnn/predict")
async def predict(storeId: int, merchantId: int, unbalanced: bool= True, userIds: list[int]= Body(...)):
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
    
    df_to_predict = df_order[df_order["customerId"].isin(userIds)]    
    
    df = df_to_predict[["customerId", "productId", "quantity", "saleDate"]]
    df.loc[:, "productId"] = df["productId"].apply(lambda x: pd.to_numeric(x, errors="coerce")).dropna()
    df = df.dropna()
    
    # Renaming columns 
    df.rename(columns={"customerId": "userID", "productId": "itemID", "quantity": "rating", "saleDate": "timestamp"}, inplace=True)
    df.loc[:, "userID"]= df["userID"].astype('int')
    df.loc[:, "itemID"]= df["itemID"].astype('int')
    
    # try:
    # Save the model to a file
    base_model_path = os.environ.get("deep_learning_path")
    # save the filename to a db that includes the username and id and storeId
    model_filename = f"DLL{merchantId}_model.h5"
    model_path = os.path.join(base_model_path, model_filename)
    # Load the model from the directory
    model = tf.saved_model.load(model_path)
    # except:
        # raise HTTPException(status_code=404, detail={"not_found": "Could not find a model train and save the model"})
    
    with Timer() as test_time:
        users, items, preds = [], [], []
        item = list(df.itemID.unique())
        for user in df.userID.unique():
            user = [user] * len(item) 
            users.extend(user)
            items.extend(item)
            preds.extend(list(model.predict(user, item, is_list=True)))

        all_predictions = pd.DataFrame(data={"userID": users, "itemID":items, "prediction":preds})

        merged = pd.merge(df, all_predictions, on=["userID", "itemID"], how="outer")
        all_predictions = merged[merged.rating.isnull()].drop('rating', axis=1)

    print("Took {} seconds for prediction.".format(test_time))
    
    print(all_predictions[all_predictions['userID']==12346].nlargest(5,'prediction'))
    
    all_predictions = all_predictions[['userID','itemID','prediction']]
    
    all_predictions = all_predictions.rename(columns={
        "userID":'customerId',"itemID":'productId',"rating":'quantity','prediction':'probability'
    })
    
    for userId in userIds:
        recommendations = get_recommendation(
            userId,
            df_order,
            all_predictions,
            df_product,
        )