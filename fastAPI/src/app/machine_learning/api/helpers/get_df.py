import pandas as pd

def get_product_order_customer_df_1(raw_orders, raw_customers, raw_categories):
    order_data = {
        "stockCode": [],
        "name": [],
        "productId": [],
        "brand": [],
        "description": [],
        "categoryId": [],
        
        "customerId": [],
        
        "unitPrice": [],
        "quantity": [],
        "invoiceNo": [],
        "saleDate": [],
        "discount": [],
    }
    for el in raw_orders:
        order_data["stockCode"].append(el["productId"]["stockCode"])
        order_data["name"].append(el["productId"]["name"])
        order_data["productId"].append(el["productId"]["id"])
        order_data["description"].append(el["productId"]["description"])
        order_data["unitPrice"].append(el["unitPrice"])
        order_data["brand"].append(el["productId"]["brand"])
        order_data["categoryId"].append(el["productId"]["categoryId"])
        order_data["quantity"].append(el["quantity"])
        order_data["discount"].append(el["discount"])
        order_data["customerId"].append(el["salesId"]["customerId"])
        order_data["invoiceNo"].append(el["salesId"]["invoiceNo"])
        order_data["saleDate"].append(el["salesId"]["saleDate"])
    df_order = pd.DataFrame(order_data)
    
    category_data = {
        "categoryId": [],
        "category": []
    }
    
    for el in raw_categories:
        category_data["category"].append(el['name'])
        category_data["categoryId"].append(el['id'])
        
    df_category = pd.DataFrame(category_data)
           
    cus_data = {
        "customerId": [],
        "zipcode": [],
        "customerSegment": [],
        "income": [],
        "Gender": [],
        "age": [],
    }
    for el in raw_customers:
        cus_data["customerId"].append(el["id"])
        cus_data["zipcode"].append(el["zipcode"])
        cus_data["customerSegment"].append(el["customerSegment"])
        cus_data["income"].append(el["income"])
        cus_data["age"].append(el["age"])
        cus_data["Gender"].append(el["gender"])
        
    df_customer = pd.DataFrame(cus_data)
    
    df_product_temp = df_order[["stockCode", "productId", "name", "description", "brand", "unitPrice", "categoryId"]].drop_duplicates(subset="productId")
    df_product = pd.merge(df_product_temp, df_category, how="inner", on="categoryId").drop("categoryId", axis=1)
    return df_order, df_customer, df_product

def get_product_order_customer_df_2(raw_orders, raw_customers):
    order_data = {
        "stockCode": [],
        "name": [],
        "productId": [],
        "brand": [],
        "description": [],
        
        "customerId": [],
        
        "unitPrice": [],
        "quantity": [],
        "invoiceNo": [],
        "saleDate": [],
        "discount": [],
    }
    for el in raw_orders:
        order_data["stockCode"].append(el["productId"]["stockCode"])
        order_data["name"].append(el["productId"]["name"])
        order_data["productId"].append(el["productId"]["id"])
        order_data["description"].append(el["productId"]["description"])
        order_data["unitPrice"].append(el["unitPrice"])
        order_data["brand"].append(el["productId"]["brand"])
        order_data["quantity"].append(el["quantity"])
        order_data["discount"].append(el["discount"])
        order_data["customerId"].append(el["salesId"]["customerId"])
        order_data["invoiceNo"].append(el["salesId"]["invoiceNo"])
        order_data["saleDate"].append(el["salesId"]["saleDate"])
    df_order = pd.DataFrame(order_data)
           
    cus_data = {
        "customerId": [],
        "zipcode": [],
        "customerSegment": [],
        "income": [],
        "Gender": [],
        "age": [],
    }
    for el in raw_customers:
        cus_data["customerId"].append(el["id"])
        cus_data["zipcode"].append(el["zipcode"])
        cus_data["customerSegment"].append(el["customerSegment"])
        cus_data["income"].append(el["income"])
        cus_data["age"].append(el["age"])
        cus_data["Gender"].append(el["gender"])
        
    df_customer = pd.DataFrame(cus_data)
    
    df_product = df_order[["stockCode", "productId", "name", "description", "brand", "unitPrice"]].drop_duplicates(subset=["productId"], keep="first")
    
    return df_order, df_customer, df_product