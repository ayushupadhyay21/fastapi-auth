from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

# Schema for user signup
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50, pattern=r'^[a-zA-Z0-9_]+$')
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)

# Schema for user login
class UserLogin(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8, max_length=128)

# Schema for JWT response
class Token(BaseModel):
    access_token: str
    token_type: str

# Blog schemas
class BlogCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    content: str = Field(..., min_length=1)

class BlogResponse(BaseModel):
    id: int
    title: str
    content: str
    author_id: int
    author_username: str
    created_at: datetime
    
    class Config:
        from_attributes = True
