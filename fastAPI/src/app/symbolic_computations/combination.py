from typing import Any
from fastapi import APIRouter, Body
from pydantic import BaseModel
import requests

import numpy as np
class Variation(BaseModel):
    name: str
    options: list[str]

router = APIRouter()

@router.post("/products")
async def get(data:  list[Variation] = Body(...)) -> list[list[str]]:
    
    variations = [item.options for item in data if len(item.options)]
    combined =  np.array(np.meshgrid(*variations)).T.reshape(-1, len(variations))
    return combined

class ParseEmail:
    sender: str
    body: str
    date: str

@router.post("/post")
async def post(data: Any = Body(...)):
    print(data)