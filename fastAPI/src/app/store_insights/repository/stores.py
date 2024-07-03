from typing import Dict, List, Any
from app.store_insights.tables import Store

class StoreRepository:
    async def get_all_stores(self, merchantId: int) -> List[Store]:
        return await Store.select().where(Store.merchantId == merchantId).order_by(Store.id)
    
