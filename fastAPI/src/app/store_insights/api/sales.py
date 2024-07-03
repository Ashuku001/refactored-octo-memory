# from io import StringIO
import json
from fastapi.responses import StreamingResponse, JSONResponse
import ujson
from typing import List
from collections import Counter
from fastapi import APIRouter, HTTPException
from io import BytesIO
import seaborn as sns # type: ignore
from wordcloud import WordCloud # type: ignore
import matplotlib.pyplot as plt
# from fastapi.responses import StreamingResponse
import numpy as np
import pandas as pd
from app.store_insights.repository.sales  import SalesRepository, SaleDetailsRepository
from app.store_insights.tables import SaleDetail
from mlxtend.frequent_patterns import apriori,association_rules

router = APIRouter()
@router.get("/")
async def get_sales(storeId: int):
    repo = SaleDetailsRepository()
    data = await repo.get_sales_details(storeId=storeId)
    df = {
        "invoiceNo": [],
        "stockCode": [],
        "name": [],
        "quantity": [],
        "unitPrice": [],
        "customerId": [],
        "discount": [],
        "saleDate": [],
    }
    for el in data:
        df["invoiceNo"].append(el["salesId"]["invoiceNo"]) 
        df["saleDate"].append(el["salesId"]["saleDate"]) 
        df["customerId"].append(el["salesId"]["customerId"])
        df["discount"].append(el["discount"])
        df["name"].append(el["productId"]["name"])
        df["stockCode"].append(el["productId"]["stockCode"])
        df["unitPrice"].append(el["unitPrice"])
        df["quantity"].append(el["quantity"])
    
    df = pd.DataFrame(df)
    
    description_df = df[["unitPrice", "quantity"]].describe()
        
    return description_df.to_dict()

@router.get("/sale-detail")
async def get_sales(storeId: int, salesId:int):
    repo = SaleDetailsRepository()
    data = await repo.get_sale_details(storeId=storeId, salesId=salesId)
    
    return data

@router.get("/most-sold-items")
async def get_sales(storeId: int):
    repo = SaleDetailsRepository()
    data = await repo.get_sales_details(storeId=storeId)
    df = {
        "stockCode": [],
        "name": [],
        "quantity": [],
    }
    for el in data:
        df["name"].append(el["productId"]["name"][:25])
        df["stockCode"].append(el["productId"]["stockCode"])
        df["quantity"].append(el["quantity"])
    
    df = pd.DataFrame(df)
    df = df.dropna()
    
    most_sold_items_df = df.pivot_table(
        index=["stockCode", "name"],
        values="quantity",
        aggfunc="sum").sort_values(
            by="quantity", 
            ascending=False)
                                       
    most_sold_items_df.reset_index(inplace=True)
    
    filtered_image = BytesIO()
    
    # Number of orders per customer
    plt.subplots(figsize=(20, 10))
    plt.style.use("bmh")
    sns.barplot(y="name", x="quantity", data=most_sold_items_df.head(10), errorbar=None)
    plt.title("Top 10 Items based on number of sales.", fontsize=14)
    plt.ylabel("Item")
    
    plt.savefig(filtered_image, format="png") 
    filtered_image.seek(0)
    return StreamingResponse(filtered_image, media_type="image/png")

@router.get("/most-bought-items")
async def get_sales(storeId: int):
    repo = SaleDetailsRepository()
    data = await repo.get_sales_details(storeId=storeId)
    df = {
        "stockCode": [],
        "name": [],
        "quantity": [],
        "customerId": [],
    }
    for el in data:
        df["customerId"].append(el["salesId"]["customerId"])
        df["name"].append(el["productId"]["name"][:25])
        df["stockCode"].append(el["productId"]["stockCode"])
        df["quantity"].append(el["quantity"])
    
    df = pd.DataFrame(df)
    df = df.dropna()
    
    most_bought = df.pivot_table(
        index=["stockCode", "name"],
        values="customerId",
        aggfunc=lambda x: len(x.unique())).sort_values(
            by="customerId", 
            ascending=False)
                                       
    most_bought.reset_index(inplace=True)
    
    filtered_image = BytesIO()
    
    # Number of orders per customer
    plt.subplots(figsize=(20, 10))
    plt.style.use("bmh")
    sns.barplot(y="name", x="customerId", data=most_bought.head(10), errorbar=None)
    plt.title("Top 10 items bought by most no. of Customers.", fontsize=14)
    plt.ylabel("Item")
    
    plt.savefig(filtered_image, format="png") 
    filtered_image.seek(0)
    return StreamingResponse(filtered_image, media_type="image/png")

@router.get("/most-frequently-bought")
async def get_sales(storeId: int):
    repo = SaleDetailsRepository()
    data = await repo.get_sales_details(storeId=storeId)
    df = {
        "name": [],
    }
    for el in data:
        df["name"].append(el["productId"]["name"][:50])
    
    df = pd.DataFrame(df)
    
    df["items"] = df["name"].str.replace(" ", "_")
    
    filtered_image = BytesIO()
    wordcloud = WordCloud(background_color="white", 
                        width=1200, 
                        height=1200, 
                        max_words=121).generate(str(df["items"]))
    
    plt.subplots(figsize=(20, 20))
    plt.style.use("bmh")
    wordcloud = WordCloud(background_color = 'white', width = 1200,  height = 1200, max_words = 121).generate(str(df['items']))
    plt.imshow(wordcloud)
    plt.axis('off')
    plt.title('Most Frequently Bought Items',fontsize = 22)
    plt.savefig(filtered_image, format="png") 
    filtered_image.seek(0)
    return StreamingResponse(filtered_image, media_type="image/png")


@router.get("/first-choice")
async def get_first_choice(storeId: int):
    repo = SaleDetailsRepository()
    data = await repo.get_sales_details(storeId=storeId)
    df = {
        "invoiceNo": [],
        "stockCode": [],
        "name": [],
        "quantity": [],
       
    }
    for el in data:
        df["invoiceNo"].append(el["salesId"]["invoiceNo"]) 
        df["name"].append(el["productId"]["name"][:25])
        df["stockCode"].append(el["productId"]["stockCode"])
        df["quantity"].append(el["quantity"])
    
    df = pd.DataFrame(df) 
    df.dropna()
    df["items"] = df["name"].str.replace(" ", "_")
    
    
    l = df["invoiceNo"]
    l = l.to_list()
    
    # get unique invoices group them
    invoices_list = list(set(l))
    first_choices_list = []
    for i in invoices_list:
        first_purchase_list = df[df['invoiceNo']==i]['items'].reset_index(drop=True)[0]

        first_choices_list.append(first_purchase_list)
            
    # count repeating first choices
    count = Counter(first_choices_list) # returns dict of invoiceNo: count

    df_first_choices = pd.DataFrame.from_dict(count, orient="index").reset_index() # create a df
    df_first_choices.rename(columns={"index": "item", 0: "count"}, inplace=True)
    df_first_choices.sort_values(by="count", ascending=False)
    
    
    filtered_image = BytesIO()
    
    plt.subplots(figsize=(20, 10))
    plt.style.use("bmh")
    sns.barplot(y="item", x ="count", data=df_first_choices.sort_values(by="count", ascending=False).head(10))
    plt.title("Top 10 first choices", fontsize=14)
    plt.ylabel("Item")
    
    plt.savefig(filtered_image, format="png") 
    filtered_image.seek(0)
    return StreamingResponse(filtered_image, media_type="image/png")


#########################################
def encode_units(x):
    if x < 1:
        return False
    if x >= 1:
        return True
    
def get_item(df, item_code):
    for index, row in df.iterrows():
        if item_code in row["stockCode"]:
            return row
            break

@router.get("/bought-together")
async def bought_together(storeId: int, item_code, number:int=6):
    repo = SaleDetailsRepository()
    data = await repo.get_sales_details(storeId=storeId)
    df = {
        "invoiceNo": [],
        "stockCode": [],
        "name": [],
        "quantity": [],
        "customerId": [],
    }
    for el in data:
        df["invoiceNo"].append(el["salesId"]["invoiceNo"]) 
        df["customerId"].append(el["salesId"]["customerId"])
        df["name"].append(el["productId"]["name"][:25])
        df["stockCode"].append(el["productId"]["stockCode"])
        df["quantity"].append(el["quantity"])

    df = pd.DataFrame(df)
    df = df.dropna()
    
    market_basket = (df.groupby(['invoiceNo', 'stockCode'])['quantity'].sum().unstack().reset_index().fillna(0).set_index('invoiceNo'))
    market_basket = market_basket.map(encode_units)
    
    df_item = None
    try:
        # df of item passed
        df_item = market_basket.loc[market_basket[item_code] == True]
    except:
        return HTTPException(status_code=404, detail="Item not found")
    
    # Apriori algorithm
    itemsets_frequent = apriori(df_item, min_support=0.15, use_colnames=True)
    
    # Storing association rules
    a_rules = association_rules(itemsets_frequent, metric="lift", min_threshold=1)
    
    # sorting on lift and support
    a_rules.sort_values(["lift", "support"], ascending=False).reset_index(drop=True)
    
    frozen_list = [list(fs)[0] for fs in a_rules["consequents"].unique()[:int(number)]]
    
    bought_together = []
    for i in frozen_list:
        item = get_item(df, i)
        product = {"stockCode":item["stockCode"], "name": item["name"], "invoiceNo": item["invoiceNo"]}
        bought_together.append(product)
        
    item = get_item(df, item_code)
    results = {
        "item": {"stockCode": item["stockCode"], "name": item["name"], "invoiceNo": item["invoiceNo"] },
        "associated_items": bought_together
    }
    # Returning top 6 items with highest lift and support
    return results

@router.get("/loyal-customers-by-orders")
async def loyal_customer_by_orders(storeId:int):
    repo = SaleDetailsRepository()
    data = await repo.get_sales_details(storeId=storeId)
    df = {
        "invoiceNo": [],
        "customerId": [],
    }
    for el in data:
        df["invoiceNo"].append(el["salesId"]["invoiceNo"]) 
        df["customerId"].append(el["salesId"]["customerId"])
       
    
    df = pd.DataFrame(df)
    df = df.dropna()
    # highlight the customers with the greatest number of orders
    # Count the unique invoice i.e., orders from each a customer in a specific country
    orders = df.groupby(by=["customerId"], as_index=False)["invoiceNo"].count()

    print("The top 5 loyal customer with the most number of orders...")
    orders.sort_values(by=["invoiceNo"], ascending=False).head()
    
    filtered_image = BytesIO()
    
    # Number of orders per customer
    plt.subplots(figsize=(15,6))
    plt.style.use("bmh")
    plt.plot(orders.customerId, orders.invoiceNo)
    plt.xlabel("Customer ID")
    plt.ylabel("Number of Orders")
    
    plt.savefig(filtered_image, format="png") 
    filtered_image.seek(0)
    return StreamingResponse(filtered_image, media_type="image/png")

@router.get("/loyal-customers-by-amount-spent")
async def loyal_customer_by_amount_spent(storeId:int):
    repo = SaleDetailsRepository()
    data = await repo.get_sales_details(storeId=storeId)
    df = {
        "customerId": [],
        "unitPrice": [],
        "quantity": [],
    }
    for el in data:
        df["customerId"].append(el["salesId"]["customerId"])
        df["unitPrice"].append(el["unitPrice"])
        df["quantity"].append(el["quantity"])
       
    df = pd.DataFrame(df)
    df = df.dropna()
    # It is an order item in a specific order
    df["amount"] = df["quantity"] * df["unitPrice"]

    money_spent = df.groupby(by=[ "customerId"], as_index=False).amount.sum()
    print("THe top 5 profitable customers with the highets money spent...")
    money_spent.sort_values(by="amount", ascending=False).head()
    
    filtered_image = BytesIO()
    
    plt.subplots(figsize=(15,6))
    plt.plot(money_spent.customerId, money_spent.amount)
    plt.style.use("bmh")
    plt.ylabel("amount")
    plt.xlabel("Customer ID")
    plt.title("Money Spent by different Customers")
    
    plt.savefig(filtered_image, format="png") 
    filtered_image.seek(0)
    return StreamingResponse(filtered_image, media_type="image/png")
    
@router.get("/sales-by-month")
async def sales_by_month(storeId: int):
    repo = SaleDetailsRepository()
    data = await repo.get_sales_details(storeId=storeId)
    df = {
        "invoiceNo": [],
        "saleDate": [],
    }
    for el in data:
        df["invoiceNo"].append(el["salesId"]["invoiceNo"]) 
        df["saleDate"].append(el["salesId"]["saleDate"]) 
    
    df = pd.DataFrame(df)
    df = df.dropna()
    
    df.loc[:, "saleDate"] = pd.to_datetime(df["saleDate"], format="%m/%d/%Y %H:%M")
    
    # a new feature using the month and year
    df.insert(loc=2, column='year_month', value=df["saleDate"].map(lambda x: 100*x.year + x.month)) 
    # feature for month
    df.insert(loc=3, column="month", value=df.saleDate.dt.month)
    # feature for the day
    df.insert(loc=4, column="day", value=(df.saleDate.dt.dayofweek)+1)
    # # a feature for hour
    df.insert(loc=5, column="hour", value=df.saleDate.dt.hour)
    
    filtered_image = BytesIO()
    
    plt.style.use("bmh")
    ax = df.groupby("invoiceNo")["year_month"].unique().value_counts().sort_index().plot(kind="bar", figsize=(15, 6))
    ax.set_xlabel("Month", fontsize=15)
    ax.set_ylabel("Number of orders", fontsize=15)
    ax.set_title("# orders for various months (Dec 2010 - Dec 2011) make this dynamic",  fontsize=15)
    ax.set_xticklabels(('Dec_10','Jan_11','Feb_11','Mar_11','Apr_11','May_11','July_11','Aug_11','Sep_11','Oct_11','Nov_11'
                        ), rotation='horizontal', fontsize=13)
    
    plt.savefig(filtered_image, format="png") 
    filtered_image.seek(0)
    return StreamingResponse(filtered_image, media_type="image/png")

@router.get("/sales-by-day")
async def sales_by_day(storeId: int):
    repo = SaleDetailsRepository()
    data = await repo.get_sales_details(storeId=storeId)
    df = {
        "invoiceNo": [],
        "saleDate": [],
    }
    for el in data:
        df["invoiceNo"].append(el["salesId"]["invoiceNo"]) 
        df["saleDate"].append(el["salesId"]["saleDate"]) 
    
    df = pd.DataFrame(df)
    df = df.dropna()
    
    df.loc[:, "saleDate"] = pd.to_datetime(df["saleDate"], format="%m/%d/%Y %H:%M")
    
    # a new feature using the month and year
    df.insert(loc=2, column='year_month', value=df["saleDate"].map(lambda x: 100*x.year + x.month)) 
    # feature for month
    df.insert(loc=3, column="month", value=df.saleDate.dt.month)
    # feature for the day
    df.insert(loc=4, column="day", value=(df.saleDate.dt.dayofweek)+1)
    # # a feature for hour
    df.insert(loc=5, column="hour", value=df.saleDate.dt.hour)
    
    filtered_image = BytesIO()
    
    plt.style.use("bmh")
    # groupby InvoiceNo extract unique days for each invoice count the days and sort the days
    ax = df.groupby("invoiceNo")["day"].unique().value_counts().sort_index().plot(kind="bar", figsize=(15, 6))
    ax.set_xlabel("Day", fontsize=15)
    ax.set_ylabel("Number of Orders", fontsize=15)
    ax.set_title("Nuber of orders for different days", fontsize=15)
    ax.set_xticklabels(('Mon','Tue','Wed','Thur','Fri','Sun'), rotation='horizontal', fontsize=15)
    
    
    plt.savefig(filtered_image, format="png") 
    filtered_image.seek(0)
    return StreamingResponse(filtered_image, media_type="image/png")

@router.get("/sales-by-hour")
async def sales_by_hour(storeId: int):
    repo = SaleDetailsRepository()
    data = await repo.get_sales_details(storeId=storeId)
    df = {
        "invoiceNo": [],
        "saleDate": [],
    }
    for el in data:
        df["invoiceNo"].append(el["salesId"]["invoiceNo"]) 
        df["saleDate"].append(el["salesId"]["saleDate"]) 
    
    df = pd.DataFrame(df)
    df = df.dropna()
    
    df.loc[:, "saleDate"] = pd.to_datetime(df["saleDate"], format="%m/%d/%Y %H:%M")
    
    # a new feature using the month and year
    df.insert(loc=2, column='year_month', value=df["saleDate"].map(lambda x: 100*x.year + x.month)) 
    # feature for month
    df.insert(loc=3, column="month", value=df.saleDate.dt.month)
    # feature for the day
    df.insert(loc=4, column="day", value=(df.saleDate.dt.dayofweek)+1)
    # # a feature for hour
    df.insert(loc=5, column="hour", value=df.saleDate.dt.hour)
    
    filtered_image = BytesIO()
    
    plt.style.use("bmh")
    # we removed the sort_index()
    ax = df.groupby('invoiceNo')['hour'].unique().value_counts().iloc[:-1].plot(kind='bar',figsize=(15,6))
    ax.set_xlabel("Hour", fontsize=15) 
    ax.set_ylabel("Number of orders", fontsize=15)
    ax.set_title("Number of orders for different Hours", fontsize=15)
    # order placed between hous 6 and 21
    ax.set_xticklabels(range(6, 20), rotation="horizontal", fontsize=15)
    
    plt.savefig(filtered_image, format="png")
    filtered_image.seek(0) 
    return StreamingResponse(filtered_image, media_type="image/png")

@router.get("/discount-sales")
async def discount_sales(storeId: int, discount:float = 0):
    repo = SaleDetailsRepository()
    data = await repo.get_sales_details(storeId=storeId)
    df = {
        "quantity": [],
        "unitPrice": [],
        "saleDate": [],
        "discount": []
    }
    for el in data:
        df["unitPrice"].append(el["unitPrice"])
        df["quantity"].append(el["quantity"])
        df["discount"].append(el["discount"])
        df["saleDate"].append(el["salesId"]["saleDate"]) 
    
    df = pd.DataFrame(df)
    df = df.dropna()
    
    df.loc[:, "saleDate"] = pd.to_datetime(df["saleDate"], format="%m/%d/%Y %H:%M")
    # a new feature using the month and year
    df.insert(loc=2, column='year_month', value=df["saleDate"].map(lambda x: 100*x.year + x.month)) 
    
    # Create a df for free items
    free_items_df = df[df["discount"] > float(discount)]
    
    # Counting the number of free items given away by month
    free_items_df.year_month.value_counts().sort_index()
    
    filtered_image = BytesIO()
    
    try:
        plt.style.use("bmh")
        # countint the number of free items per year and month
        ax = free_items_df.year_month.value_counts().sort_index().plot(kind="bar", figsize=(12,6))
        ax.set_xlabel("Month", fontsize=15)
        ax.set_ylabel("Frequency", fontsize=15)
        ax.set_title("Frequency for different Months (Dec 2010 - Dec 2011)", fontsize=15)
        ax.set_xticklabels(('Dec_10','Jan_11','Feb_11','Mar_11','Apr_11','May_11','July_11','Aug_11','Sep_11','Oct_11','Nov_11'), rotation='horizontal', fontsize=13)
        
        plt.savefig(filtered_image, format="png")
        filtered_image.seek(0)
        return StreamingResponse(filtered_image, media_type="image/png")
    except:
        return HTTPException(status_code=404, detail=f"No items of discount {discount}")

@router.get("/trending-items")
async def trending_items(storeId: int, date:str):
    repo = SaleDetailsRepository()
    data = await repo.get_sales_details(storeId=storeId)
    df = {
        "stockCode": [],
        "name": [],
        "quantity": [],
        "discount": [],
        "saleDate": [],
    }
    for el in data:
        df["saleDate"].append(el["salesId"]["saleDate"]) 
        df["discount"].append(el["discount"])
        df["name"].append(el["productId"]["name"])
        df["stockCode"].append(el["productId"]["stockCode"])
        df["quantity"].append(el["quantity"])
    
    df = pd.DataFrame(df)
    df = df.dropna()
    
    df['date'] = df['saleDate'].map(lambda x: x.strftime('%y-%m-%d'))
    datewise_sales = df.pivot_table(index=['date','stockCode','name'], values='quantity', aggfunc='sum').reset_index()
    
    filtered_image = BytesIO()
    plt.style.use("bmh")
    # countint the number of free items per year and month
    sns.barplot(y='name', x='quantity', data=datewise_sales[datewise_sales['date']==date].sort_values(by='quantity', ascending=False).head(10), errorbar=None)
    plt.title('Top 10 Most Selling Items on {0}'.format(date), fontsize=14)
    plt.ylabel('Item')
    plt.savefig(filtered_image, format="png") 
    filtered_image.seek(0)
    return StreamingResponse(filtered_image, media_type="image/png")

@router.get("/deal-of-the-day")
async def deal_of_the_day(storeId: int, date:str):
    repo = SaleDetailsRepository()
    data = await repo.get_sales_details(storeId=storeId)
    df = {
        "stockCode": [],
        "productId": [],
        "name": [],
        "quantity": [],
        "customerId": [],
        "saleDate": [],
    }
    for el in data:
        df["saleDate"].append(el["salesId"]["saleDate"]) 
        df["customerId"].append(el["salesId"]["customerId"])
        df["name"].append(el["productId"]["name"])
        df["stockCode"].append(el["productId"]["stockCode"])
        df["productId"].append(el["productId"]["id"])
        df["quantity"].append(el["quantity"])
    
    df = pd.DataFrame(df)
    df = df.dropna()
    
    df['date'] = df['saleDate'].map(lambda x: x.strftime('%y-%m-%d'))
    datewise_sales = df.pivot_table(index=['date','productId','name'], values='quantity', aggfunc='sum').reset_index()
    
    # sorting the data on given date based on quantity (ascending)
    data = datewise_sales[datewise_sales['date']==date].sort_values(by='quantity')
    print('The most appropriate items to provide Deals on {0} are :'.format(date))
    print(data['name'].head(10))
    products = []
    for index, row in data.head(10).iterrows():
        products.append({
                    "name": row["name"],
                    "id": row["productId"],
                    # "price": row["unitPrice"],
                    # "brand": row["brand"],
                })
    return JSONResponse(content=products)