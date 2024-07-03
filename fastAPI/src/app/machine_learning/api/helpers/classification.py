
from io import BytesIO
from matplotlib import pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import roc_auc_score, roc_curve
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.linear_model import LogisticRegression

def feature_engineering(df_order, df_customer, df_product ):
    purchase_df = pd.DataFrame(df_order.groupby(["productId", "customerId"])["quantity"].sum())
    
    df_customerIds = df_customer["customerId"]
    df_productIds = df_order["productId"]
    
    sample = len(df_customerIds) if len(df_customerIds) <= len(df_productIds) else len(df_productIds)
    n = sample if sample <= 900 else 900
    
    #sample the data
    row_customerIds = df_customerIds.sample(n=n)
    row_productIds = df_productIds.sample(n=n)
    
    # cross product
    index = pd.MultiIndex.from_product([row_customerIds, row_productIds])
    
    df_X_product = pd.DataFrame(index = index).reset_index()
    
    data: pd.DataFrame = pd.merge(purchase_df, df_X_product, on =["customerId", "productId"], how="right")
    data[ "quantity"] = data["quantity"].replace(np.nan, 0).astype(int)
    
    final_df_1 = pd.merge(data, df_product, how="inner", on="productId")
    final_df_2 = pd.merge(df_customer, final_df_1, on="customerId").drop(columns=["zipcode", "stockCode"])
    final_df_2["brand"] = final_df_2["brand"].str.replace("?", "")
    final_df_2["brand"] = final_df_2["brand"].str.replace("&", "and")
    final_df_2["brand"] = final_df_2["brand"].str.replace("(", "")
    final_df_2["brand"] = final_df_2["brand"].str.replace(")", "")
    final_df_2["brand"] = final_df_2["brand"].str.replace("-", " ")
    
    # Creating a flag column using the quantity column indicating whether the customer has bough the product or not
    final_df_2.loc[final_df_2.quantity == 0, "flag_buy"] = 0
    final_df_2.loc[final_df_2.quantity != 0, "flag_buy"] = 1

    # Convert values of flag_buy columns into integer
    final_df_2["flag_buy"] = final_df_2.flag_buy.astype(int)
    
    return final_df_2

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

def select_model(x_train, y_train, x_test, y_test):
    print(">>>>",x_train)
    print(">>>>",y_train)
    print(">>>>",x_test)
    print(">>>>",y_test)
    algorithms = {
        "LogisticRegression": {
            "model": LogisticRegression,
            "accuracy": "",
            "confusion_matrix": "",
            "classification_report": "",
            "trained_model": None
        },
        "DecisionTreeClassifier": {
            "model": DecisionTreeClassifier,
            "accuracy": "",
            "confusion_matrix": "",
            "classification_report": "",
            "trained_model": None
        },
        "RandomForestClassifier": {
            "model": RandomForestClassifier,
            "accuracy": "",
            "confusion_matrix": "",
            "classification_report": "",
            "trained_model": None
        },
        "KNeighborsClassifier": {
            "model": KNeighborsClassifier,
            "accuracy": "",
            "confusion_matrix": "",
            "classification_report": "",
            "trained_model": None
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
        algorithms[name]["trained_model"] = model
        
        best_model_name = min(algorithms, key=lambda x: algorithms[x]["accuracy"])
        best_model_info = algorithms[best_model_name]
        
        return best_model_name, best_model_info