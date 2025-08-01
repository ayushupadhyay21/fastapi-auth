from pydantic import BaseModel, EmailStr

# Schema for user signup
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

# Schema for user login
class UserLogin(BaseModel):
    username: str
    password: str

# Schema for JWT response
class Token(BaseModel):
    access_token: str
    token_type: str
