from typing import  List
from app.machine_learning.tables import Image

class ImageRepository:    
    async def get_all_images(self, storeId:int) -> List[Image]:
        return await Image.select(
            Image.id,
            Image.url,
            Image.productId,
            Image.storeId,
        ).output(nested=True).where(Image.storeId == storeId)
    async def get_image(self, storeId:int, id: int) -> List[Image]:
        return await Image.select(
            Image.id,
            Image.url,
            Image.productId,
            Image.storeId,
        ).output(nested=True).where(Image.storeId == storeId, Image.id == id)
        
        