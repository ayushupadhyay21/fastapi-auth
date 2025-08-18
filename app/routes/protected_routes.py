from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
import os
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from ..dependencies import get_db
from ..models import User as UserModel

load_dotenv()

router = APIRouter(prefix="", tags=["protected"])
security = HTTPBearer()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token payload.")
        user = db.query(UserModel).filter(UserModel.username == username).first()
        if user is None:
            raise HTTPException(status_code=401, detail="User not found.")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Token verification failed.")

@router.get("/protected")
def protected_route(current_user: UserModel = Depends(get_current_user)):
    return {"message": f"Welcome, {current_user.username}! You have access to protected data."}

@router.get("/user/me")
def get_profile(current_user: UserModel = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
    }
