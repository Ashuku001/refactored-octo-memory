from fastapi import APIRouter
from fastapi.responses import JSONResponse

from app.blog.repository.user import UserRepository
from app.blog.schema import PostCreate

router = APIRouter()


@router.post("/post/add")
async def add_post(req:PostCreate):
    post_repo = req.model_dump(exclude_unset=True)
    repo = UserRepository()
    result = await repo.insert_post(post_repo) 
    if result == True:
        return req
    else:
        return JSONResponse(content={'message':'insert post problem encountered'}, status_code=500)
    
@router.patch("/post/update")
async def update_post(id:int, req:PostCreate):
    post_repo = req.model_dump(exclude_unset=True)
    repo = UserRepository()
    result = await repo.update_post(id, post_repo) 
    if result == True: 
        return req 
    else: 
        return JSONResponse(content={'message':'update post problem encountered'}, status_code=500)
    
@router.delete("/post/delete/{id}")
async def delete_post(id:int):
    repo = UserRepository()
    result = await repo.delete_post(id)
    if result == True: 
        return JSONResponse(content={'message':'delete post record successfully'}, status_code=201)
    else: 
        return JSONResponse(content={'message':'delete post problem encountered'}, status_code=500)
    
@router.get("/post/list")
async def list_all_post():
    repo = UserRepository()
    return await repo.get_all_post()

@router.get("/post/get/{id}")
async def get_post(id:int):
    repo = UserRepository()
    return await repo.get_post(id)