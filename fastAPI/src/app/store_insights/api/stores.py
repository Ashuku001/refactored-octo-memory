# from io import StringIO
from fastapi import APIRouter
# from fastapi.responses import StreamingResponse
import numpy as np
import pandas as pd
from app.store_insights.repository.stores import StoreRepository

router = APIRouter()

@router.get("/")
async def get_stores(merchantId: int):
    repo =  StoreRepository()
    stores = await repo.get_all_stores(merchantId==merchantId)
    return stores
