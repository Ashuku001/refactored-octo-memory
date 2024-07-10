
from io import BytesIO
import random
from matplotlib import pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import roc_auc_score, roc_curve
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.linear_model import LogisticRegression

def feature_engineering(df_order: pd.DataFrame, df_customer: pd.DataFrame, df_product: pd.DataFrame ):
    purchase_df = pd.DataFrame(df_order.groupby(["productId", "customerId"])["quantity"].sum())
    
    df_customerIds = df_customer["customerId"]
    df_productIds = df_order["productId"]
    
    sample = len(df_customerIds) if len(df_customerIds) <= len(df_productIds) else len(df_productIds)
    n = sample if sample <= 900 else 900
    
    #sample the data
    row_customerIds = df_customerIds.sample(n=n, random_state=42)
    row_productIds = df_productIds.sample(n=n, random_state=42)
    
    # cross product
    index = pd.MultiIndex.from_product([row_customerIds, row_productIds])
    
    df_X_product = pd.DataFrame(index = index).reset_index()
    
    data: pd.DataFrame = pd.merge(purchase_df, df_X_product, on =["customerId", "productId"], how="right")
    data[ "quantity"] = data["quantity"].replace(np.nan, 0).astype(int)
    
    data_2 = pd.merge(data, df_product, how="inner", on="productId")
    data_3 = pd.merge(df_customer, data_2, on=["customerId"])
    data_3.dropna()

    data_3["brand"] = data_3["brand"].str.replace("?", "")
    data_3["brand"] = data_3["brand"].str.replace("&", "and")
    data_3["brand"] = data_3["brand"].str.replace("(", "")
    data_3["brand"] = data_3["brand"].str.replace(")", "")
    data_3["brand"] = data_3["brand"].str.replace("-", " ")
    
    # Creating a flag column using the quantity column indicating whether the customer has bough the product or not
    data_3.loc[data_3.quantity == 0, "flag_buy"] = 0
    data_3.loc[data_3.quantity != 0, "flag_buy"] = 1

    # Convert values of flag_buy columns into integer
    data_3["flag_buy"] = data_3.flag_buy.astype(int)
    
    return data_3.drop(columns=[ "name", "description", "stockCode", "zipcode"])

def feature_engineering_2(df_order: pd.DataFrame, df_customer: pd.DataFrame, df_product: pd.DataFrame ):
    product_df = df_product.drop_duplicates(subset=["productId"], keep="first").dropna().drop(columns=[ "name", "description", "stockCode"])
    customer_df = df_customer.drop_duplicates(subset=["customerId"], keep="first").dropna().drop(columns=["zipcode"])
    order_df = df_order.dropna()

    df_customerIds = customer_df["customerId"]
    df_productIds = product_df["productId"]
    
    sample = len(df_productIds) if len(df_productIds) <= 900 else 900    
    productsSample = df_productIds.sample(n=sample, random_state=42)
    
    # cross product
    index = pd.MultiIndex.from_product([df_customerIds, productsSample])
    df_X_product = pd.DataFrame(index=index).reset_index()
    data: pd.DataFrame = pd.merge(customer_df, df_X_product, on=["customerId"])
    
    print("length of data",len(data), len(customer_df), len(df_X_product))
    
    order_df_2 = order_df[["quantity", "customerId", "productId"]][order_df["customerId"].isin(df_customerIds)]
    product_df_2 = product_df[["category", "brand", "unitPrice", "productId"]]

    data_2 = pd.merge(data, product_df_2, on=["productId"])
    data_3 = pd.merge(data_2, order_df_2,  on=['customerId', 'productId'], how='left')
    data_3["quantity"] = data_3["quantity"].replace(np.nan, 0).astype(int)
    print(data_2.shape, data_3.shape)  
    
    data_3["brand"] = data_3["brand"].str.replace("?", "")
    data_3["brand"] = data_3["brand"].str.replace("&", "and")
    data_3["brand"] = data_3["brand"].str.replace("(", "")
    data_3["brand"] = data_3["brand"].str.replace(")", "")
    data_3["brand"] = data_3["brand"].str.replace("-", " ")
    
    # Creating a flag column using the quantity column indicating whether the customer has bough the product or not
    data_3.loc[data_3.quantity == 0, "flag_buy"] = 0
    data_3.loc[data_3.quantity != 0, "flag_buy"] = 1

    # Convert values of flag_buy columns into integer
    data_3["flag_buy"] = data_3.flag_buy.astype(int)
    
    return data_3

def EDA_popular_brand(data):
    filtered_image = BytesIO()
    
    plt.figure(figsize=(15, 5))
    sns.set_theme(style="darkgrid")
    sns.countplot(x = "brand", data=data) # y is counting the brad
    plt.xticks(fontsize=20, rotation=45)
    plt.xlabel("brand")
    plt.savefig(filtered_image, format="png")
    filtered_image.seek(0)
    return filtered_image


def EDA_income(data):
    filtered_image = BytesIO()
    
    # Count of income category
    plt.figure(figsize=(15, 5))
    sns.set_theme(style="darkgrid")
    sns.countplot(x = "income", data = data) # counting the invoices generated from each segment of income
    plt.savefig(filtered_image, format="png") 
    filtered_image.seek(0)
    return filtered_image

def EDA_age_distribution(data):
    filtered_image = BytesIO()
    # histogram plot to show distribution of age
    plt.title("Age distribution")
    plt.figure(figsize=(15, 5))
    sns.set_theme(style="darkgrid")
    sns.histplot(data=data, x="age", kde=True)
    plt.savefig(filtered_image, format="png") 
    
    filtered_image.seek(0)
    return filtered_image

def EDA_age_distribution_by_category(data):
    filtered_image = BytesIO()
    # show age distribution with hue by category
    plt.suptitle("Age distribution by category")
    plt.figure(figsize=(15, 5))
    sns.set_theme(style="darkgrid")
    sns.histplot(data=data, x="age", hue="category", element="poly")
    plt.savefig(filtered_image, format="png")
    filtered_image.seek(0)
    return filtered_image

def EDA_customers_bought(data):
    filtered_image = BytesIO()
    # Count plot to show number of customer who bought the product
    plt.figure(figsize=(15, 5))
    sns.set_theme(style="darkgrid")
    sns.countplot(x = "flag_buy", data=data)
    plt.savefig(filtered_image, format="png")
    filtered_image.seek(0)
    return filtered_image

def encode_data(data):
    label_encoder = LabelEncoder()
    data["productId"] = label_encoder.fit_transform(data["productId"])
    mappings = {}
    mappings["productId"] = dict(zip(label_encoder.classes_, range(len(label_encoder.classes_))))
    data["Gender"] = label_encoder.fit_transform(data["Gender"])
    data["customerSegment"] = label_encoder.fit_transform(data["customerSegment"])
    data["brand"] = label_encoder.fit_transform(data["brand"])
    data["category"] = label_encoder.fit_transform(data["category"])
    data["income"] = label_encoder.fit_transform(data["income"])
    return data, mappings

def scale_data(x):
    x_to_be_scaled = x.drop(columns=["customerId", "productId"], axis=1)
    x_temp = x[["customerId", "productId"]]
    
    scaler = StandardScaler()
    x_scaled = scaler.fit_transform(x_to_be_scaled)
    x_scaled_df = pd.DataFrame(
        x_scaled,
        columns=scaler.get_feature_names_out(),
        index=x_to_be_scaled.index
    )
    x_scaled_df["customerId"] = x_temp["customerId"]
    x_scaled_df["productId"] = x_temp["productId"]
    return x_scaled_df

def select_model(x_train, y_train, x_test, y_test):
    algorithms = {
        "LogisticRegression": {
            "model": LogisticRegression(max_iter=200),
            "accuracy": 0,
            "confusion_matrix": "",
            "classification_report": "",
        },
        "DecisionTreeClassifier": {
            "model": DecisionTreeClassifier(),
            "accuracy": 0,
            "confusion_matrix": "",
            "classification_report": "",
        },
        "RandomForestClassifier": {
            "model": RandomForestClassifier(),
            "accuracy": 0,
            "confusion_matrix": "",
            "classification_report": "",
        },
        "KNeighborsClassifier": {
            "model": KNeighborsClassifier(),
            "accuracy": 0,
            "confusion_matrix": "",
            "classification_report": "",
        },
    }
    
    for name, model_info in algorithms.items():
        print(f"Evaluating {name}...")
        model = model_info["model"]
        model.fit(x_train, y_train)
        
        pred = model.predict(x_test)
        algorithms[name]["confusion_matrix"] = confusion_matrix(y_test, pred)
        algorithms[name]["accuracy"] = accuracy_score(y_test, pred)
        algorithms[name]["classification_report"] = classification_report(y_test, pred)
        algorithms[name]["model"] = model
        
        print(confusion_matrix(y_test, pred))
        print(accuracy_score(y_test, pred))
        print(classification_report(y_test, pred))
    
    algorithms = {k: v for k, v in algorithms.items() if v['accuracy'] != 1}
        
    best_model_name = max(algorithms, key=lambda x: algorithms[x]["accuracy"])
    best_model_info = algorithms[best_model_name]
    
    return best_model_name, best_model_info

def get_recommendations(model, data, userId, mappings, sample):
    pred = model.predict(data)
    # x test has all features
    test_data = data.copy()
    # store predictions in one variable
    test_data["predictions"] = pred
    # filter the data and recommend.
    recomm_on_cust = test_data[(test_data["customerId"] == userId) & (test_data["predictions"]==1)]
    # to build the model we have encoded the stockCode column now we decode and recommend
    items = []
    for item_id in recomm_on_cust["productId"].unique().tolist():
        prod = {v: k for k, v in mappings["productId"].items()}[item_id]
        items.append(str(prod))
    n = sample if len(items) > sample else len(items)
    return  random.sample(items, n)
    