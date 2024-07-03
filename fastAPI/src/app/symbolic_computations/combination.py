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
    print(combined)
    return combined

@router.get("/mpesa")
async def mpesa(): 
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer vLAck9SA7ahrscSAngIwv2y3AXbm'
    }

    payload = {
        "BusinessShortCode": 174379,
        'Password': 'MTc0Mzc5MjAyNDA1MDcwOTM0MTFiZmIyNzlmOWFhOWJkYmNmMTU4ZTk3ZGQ3MWE0NjdjZDJlMGM4OTMwNTliMTBmNzhlNmI3MmFkYTFlZDJjOTE5',
        'Timestamp': '20240507093411',
        'TransactionType': 'CustomerPayBillOnline',
        'Amount': 1,
        'PartyA': 254707737397,
        'PartyB': 174379,
        'PhoneNumber': 254707737397,
        'CallBackURL': 'https://a23e-197-136-96-155.ngrok-free.app/payment',
        'AccountReference': 'Ashuku & Co',
        'TransactionDesc': 'Make payment for order number 0000434'
    }

    response = requests.request("POST", 'https://example.com/mpesa/stkpush/v1/processrequest', headers = headers, json = payload)
    print(response.json)
    print(response.text.encode('utf8'))