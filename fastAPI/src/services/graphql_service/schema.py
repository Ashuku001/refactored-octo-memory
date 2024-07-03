import strawberry

from typing import List, Optional

@strawberry.type
class MerchantType:
    id: int
    business_name:str
    username: str
    password:str
    email:str
    whatsapp_phone_number:str
    
@strawberry.type
class ProductType:
    id: int
    name: str
    price: float
    isFeatured: bool
    isArchived: bool
    sizeId: int
    colorId: int
    categoryId: int

@strawberry.type
class StoreType:
    id: int  
    name: str
    merchant: Optional[MerchantType]
    products: Optional[List[ProductType]]
    
