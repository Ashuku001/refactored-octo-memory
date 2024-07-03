from typing import  Dict, List, Any
from app.blog.tables import Post_bg
from app.blog.schema import PostCreate

class PostRepository:
    async def insert_post(self, details:PostCreate) -> bool: 
        try:
            post = Post_bg(**details)
            await post.save()
            
        except Exception as e:
            print(e)
            return False
        return True
    
    async def update_post(self, id:int, details:PostCreate) -> bool: 
       try:
         post = await Post_bg.objects().get(Post_bg.id == id)
         for key, value in details.items():
            setattr(post, key, value)
         await post.save()
       except: 
           return False 
       return True
   
    async def delete_post(self, id:int) -> bool: 
        try:
            post = await Post_bg.objects().get(Post_bg.id == id)
            await post.remove()
        except Exception as e: 
            print(e)
            return False 
        return True
    
    async def get_all_post(self):
        return await Post_bg.select().order_by(Post_bg.id)
        
    async def get_post(self, id:int): 
        return await Post_bg.objects().get(Post_bg.id == id)