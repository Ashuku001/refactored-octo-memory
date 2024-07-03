from typing import  List
from app.machine_learning.tables import Category

class CategoryRepository:    
    async def get_all_Categories(self, storeId:int) -> List[Category]:
        return await Category.select(
            Category.id,
            Category.name,
        ).output(nested=True).where(Category.storeId == storeId)