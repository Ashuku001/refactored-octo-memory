from typing import  List
from app.machine_learning.tables import Customer

class CustomerRepository:    
    async def get_all_Customers(self, merchantId:int) -> List[Customer]:
        return await Customer.select(
            Customer.id,
            Customer.gender,
            Customer.age,
            Customer.income,
            Customer.zipcode,
            Customer.customerSegment,
        ).output(nested=True).where(Customer.merchantId == merchantId)
        
        