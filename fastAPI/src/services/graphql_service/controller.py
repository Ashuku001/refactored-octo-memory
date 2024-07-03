from typing import List
from .schema import ProductType, StoreType
from app.store_insights.tables import Product
from app.store_insights.tables import Store


class Queries:
    async def get_all_products(self) -> List[StoreType]:
        # Fetch all stores
        stores: List[StoreType] = await Store.select(Store.id, Store.name).run()
        print(stores)
        
        # Fetch all products for each store
        for store in stores:
            print("the store>>>>>>>>>>>>>", store.id)
            store.products = await Product.select(Product.id, Product.name, Product.price).where(
                Product.storeId == store.id
            ).run()
        
        # Convert the data into the desired types
        return [
            StoreType(
                id=store.id,
                name=store.name,
                products=[
                    ProductType(
                        id=product.id,
                        name=product.name,
                        price=product.price
                    ) for product in store.products
                ]
            ) for store in stores
        ]
    
    # async def get_all_stores()
    
    