from piccolo.table import Table
from typing import Any
from piccolo.columns import ForeignKey, Boolean, Decimal, Integer, Varchar, Text,  Boolean, Float, Date
class Merchant(Table, tablename="Merchants"): 
    business_name= Varchar()
    username= Varchar(unique=True)
    password= Varchar()
    email= Varchar(unique=True)
    whatsapp_phone_number= Varchar(unique=True)

class Customer(Table, tablename="Customers"):
    whatsapp_name= Varchar()
    phone_number= Varchar()
    first_name= Varchar()
    last_name= Varchar()
    loc_name= Varchar()
    loc_address= Varchar()
    zipcode= Varchar()
    loc_latitude= Varchar()
    loc_longitude= Varchar()
    loc_url= Varchar()
    merchantId= ForeignKey(Merchant,)
    age= Integer()
    gender= Varchar()
    income= Varchar()
    customerSegment= Varchar()
    occupation= Varchar()
    joinDate= Varchar()
    lastPromoted= Date()
    status= Varchar()
    
class Store(Table, tablename="Stores"):
    name = Varchar()
    merchantId = ForeignKey(Merchant,)
    
class Category(Table, tablename="Categories"):
    storeId = ForeignKey(Store,)
    name = Varchar()
    
class Product(Table, tablename="Products"):
    name= Varchar()
    price= Decimal()
    stockCode=Varchar()
    description=Text()
    brand=Varchar()
    isFeatured= Boolean()
    isArchived= Boolean()
    
    categoryId= ForeignKey(Category)
    storeId= ForeignKey(Store,)
    
class Image(Table, tablename="Images"):
    url = Varchar()
    productId = ForeignKey(Product)
    storeId = ForeignKey(Store)
class Sale(Table, tablename="Sales"):
    customerId= ForeignKey(Customer,)
    saleDate= Varchar()
    invoiceNo= Varchar()
    storeId= ForeignKey(Store,)
    promotionId= Integer()
    totalAmount= Decimal()
    
class SaleDetail(Table, tablename="SaleDetails"):
    salesId= ForeignKey(Sale,)
    productId= ForeignKey(Product,)
    unitPrice= Decimal()
    discount= Decimal()
    quantity= Integer()
    