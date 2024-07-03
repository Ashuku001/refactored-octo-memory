from typing import  Dict, List, Any
from app.blog.tables import User_bg
from app.blog.schema import UserCreate

class UserRepository:
    async def insert_user(self, details:UserCreate) -> bool: 
        try:
            user = User_bg(**details)
            await user.save()
            
        except Exception as e: 
            print(e)
            return False 
        return True
    
    async def update_post(self, id:int, details:UserCreate) -> bool: 
       try:
         user = await User_bg.objects().get(User_bg.id == id)
         for key, value in details.items():
            setattr(user, key, value)
         await user.save()
       except: 
           return False 
       return True
   
    async def delete_post(self, id:int) -> bool: 
        try:
            user = await User_bg.objects().get(User_bg.id == id)
            await user.remove()
        except Exception as e: 
            print(e)
            return False 
        return True
    
    async def get_all_post(self):
        return await User_bg.select().order_by(User_bg.id)
        
    async def get_post(self, id:int): 
        return await User_bg.objects().get(User_bg.id == id)