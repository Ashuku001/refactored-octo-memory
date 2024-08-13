from typing import  List
from app.machine_learning.tables import Product

class ProductRepository:    
    async def get_all_products(self, storeId:int) -> List[Product]:
        return await Product.select(
            Product.id,
            Product.name,
            Product.description,
            Product.stockCode,
            Product.brandId.name,
            Product.price,
            Product.categoryId.name
        ).output(nested=True).where(Product.storeId == storeId)
        
        