from typing import  List
from app.machine_learning.tables  import  Sale, SaleDetail, Product, Brand, Category
from piccolo import engine
class SalesRepository:    
    async def get_all_sales(self, storeId: int) -> List[Sale]:
        return await Sale.select(Sale.customerId.id).output(nested=True).where(Sale.storeId == storeId).order_by(Sale.id)
    
class SaleDetailsRepository:    
    async def get_sales_details(self, storeId:int) -> List[SaleDetail]:
        sale_details = await SaleDetail.select(
            SaleDetail.salesId._.invoiceNo,
            SaleDetail.salesId._.customerId,
            SaleDetail.salesId._.saleDate,
            SaleDetail.productId._.name,
            SaleDetail.productId._.id,
            SaleDetail.productId._.brandId,
            SaleDetail.productId._.description,
            SaleDetail.productId._.stockCode,
            # SaleDetail.productId.categoryId.name,
            SaleDetail.unitPrice,
            SaleDetail.discount,
            SaleDetail.quantity
        ).output(nested=True).where(SaleDetail.salesId.storeId == storeId)
        

        brand_ids = {product["productId"]['brandId'] for product in sale_details}
        brands = await Brand.select(Brand.id, Brand.name).where(Brand.id.is_in(brand_ids)).output()

        product_map = {product["productId"]['id']: product for product in sale_details}
        brand_map = {brand['id']: brand for brand in brands}
        

        for detail in sale_details:
            product = product_map[detail['productId']["id"]]
            detail["productId"]["brandId"] = {"name": brand_map[product["productId"]['brandId']]['name']}

        return sale_details
        
    async def get_sale_details(self, storeId:int, salesId) -> List[SaleDetail]:
        return await SaleDetail.select(
            SaleDetail.salesId._.invoiceNo,
            SaleDetail.salesId._.customerId,
            SaleDetail.salesId._.saleDate,
            SaleDetail.productId._.name,
            SaleDetail.productId._.id,
            SaleDetail.productId._.stockCode,
            SaleDetail.unitPrice,
            SaleDetail.discount,
            SaleDetail.quantity
        ).output(nested=True).where(SaleDetail.salesId.storeId == storeId, SaleDetail.salesId==salesId)
    
    async def get_sales_hybrid(self, storeId:int) -> List[SaleDetail]:
        return await SaleDetail.select(   
            SaleDetail.productId._.name,
            SaleDetail.productId._.id,
            SaleDetail.productId._.brandId._.name,
            SaleDetail.productId._.stockCode,
            SaleDetail.productId._.description,
            # SaleDetail.productId.categoryId.name,
            
            SaleDetail.unitPrice,
            SaleDetail.discount,
            SaleDetail.quantity,
            
            SaleDetail.salesId.invoiceNo,
            SaleDetail.salesId.customerId,
            SaleDetail.salesId.saleDate,
            # SaleDetail.salesId.customerId.gender,
            # SaleDetail.salesId.customerId.zipcode,
            # SaleDetail.salesId.customerId.age,
            # SaleDetail.salesId.customerId.customerSegment,
            # SaleDetail.salesId.customerId.income,
            
        ).output(nested=True).where(SaleDetail.salesId.storeId == storeId)
        
    async def get_sales_classification(self, storeId:int) -> List[SaleDetail]:
        return await SaleDetail.select(   
            SaleDetail.productId._.name,
            SaleDetail.productId._.id,
            SaleDetail.productId._.brandId._.name,
            SaleDetail.productId._.stockCode,
            SaleDetail.productId._.description,
            SaleDetail.productId._.categoryId,
            
            SaleDetail.unitPrice,
            SaleDetail.discount,
            SaleDetail.quantity,
            
            SaleDetail.salesId._.invoiceNo,
            SaleDetail.salesId._.customerId,
            SaleDetail.salesId._.saleDate,
            # SaleDetail.salesId.customerId.gender,
            # SaleDetail.salesId.customerId.zipcode,
            # SaleDetail.salesId.customerId.age,
            # SaleDetail.salesId.customerId.customerSegment,
            # SaleDetail.salesId.customerId.income,
            
        ).output(nested=True).where(SaleDetail.salesId.storeId == storeId)