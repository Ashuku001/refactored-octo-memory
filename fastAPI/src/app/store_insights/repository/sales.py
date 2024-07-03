from typing import  List
from app.store_insights.tables  import  Sale, SaleDetail

class SalesRepository:    
    async def get_all_sales(self, storeId: int) -> List[Sale]:
        return await Sale.select(Sale.customerId.id).output(nested=True).where(Sale.storeId == storeId).order_by(Sale.id)
    
class SaleDetailsRepository:    
    # async def get_sales_details(self, storeId:int) -> List[SaleDetail]:
    #     return await SaleDetail.select( SaleDetail.salesId.invoiceNo, SaleDetail.salesId.customerId, SaleDetail.salesId.saleDate, SaleDetail.productId.name, SaleDetail.productId.stockCode, SaleDetail.unitPrice, SaleDetail.discount, SaleDetail.quantity).output(nested=True).where(SaleDetail.salesId.storeId == storeId)
    async def get_sales_details(self, storeId:int) -> List[SaleDetail]:
        return await SaleDetail.select(
            SaleDetail.salesId.invoiceNo,
            SaleDetail.salesId.customerId,
            SaleDetail.salesId.saleDate,
            SaleDetail.productId.name,
            SaleDetail.productId.stockCode,
            SaleDetail.productId.id,
            SaleDetail.unitPrice,
            SaleDetail.discount,
            SaleDetail.quantity
        ).output(nested=True).where(SaleDetail.salesId.storeId == storeId)
        
    async def get_sale_details(self, storeId:int, salesId) -> List[SaleDetail]:
        return await SaleDetail.select(
            SaleDetail.salesId.invoiceNo,
            SaleDetail.salesId.customerId,
            SaleDetail.salesId.saleDate,
            SaleDetail.productId.name,
            SaleDetail.productId.id,
            SaleDetail.productId.stockCode,
            SaleDetail.unitPrice,
            SaleDetail.discount,
            SaleDetail.quantity
        ).output(nested=True).where(SaleDetail.salesId.storeId == storeId, SaleDetail.salesId==salesId)
    
