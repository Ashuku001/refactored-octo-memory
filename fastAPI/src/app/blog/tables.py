from piccolo.table import Table
from piccolo.columns import Varchar, Text, Timestamp, Boolean, ForeignKey

class User_bg(Table):
    username = Varchar(length=50, unique=True)
    email = Varchar(length=100, unique=True)
    password_hash = Varchar(length=100)
    is_active = Boolean(default=True)
    created_at = Timestamp()

class Post_bg(Table):
    title = Varchar(length=100)
    content = Text()
    author = ForeignKey(references=User_bg)
    created_at = Timestamp()
    updated_at = Timestamp(null=True)

class Comment_bg(Table):
    content = Text()
    post = ForeignKey(references=Post_bg)
    author = ForeignKey(references=User_bg)
    created_at = Timestamp()

class Category_bg(Table):
    name = Varchar(length=50, unique=True)
    created_at = Timestamp()

class PostCategory_bg(Table):
    post = ForeignKey(references=Post_bg)
    category = ForeignKey(references=Category_bg)
    created_at = Timestamp()
