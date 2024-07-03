from pydantic import BaseModel
from piccolo_api.crud.serializers import create_pydantic_model

class UserCreate(BaseModel):
    email: str
    username: str
    is_active: bool


class User(BaseModel):
    id: int
    email: str
    username: str


class PostCreate(BaseModel):
    author: int
    title: str
    content: str


class Post(BaseModel):
    id: int
    user: int
    title: str
    content: str

ProfileReq = create_pydantic_model(Post)