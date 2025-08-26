from fastapi import Response, Request, HTTPException
from .auth import create_access_token, SECRET_KEY, ALGORITHM
from jose import jwt, JWTError
import os

# Cookie settings
COOKIE_NAME = "access_token"
COOKIE_MAX_AGE = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30")) * 60  # Convert to seconds

def set_auth_cookie(response: Response, token: str):
    """Set httpOnly authentication cookie"""
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        max_age=COOKIE_MAX_AGE,
        httponly=True,
        secure=True,  # Use HTTPS in production
        samesite="lax"
    )

def get_token_from_cookie(request: Request) -> str:
    """Extract token from httpOnly cookie"""
    token = request.cookies.get(COOKIE_NAME)
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return token

def clear_auth_cookie(response: Response):
    """Clear authentication cookie"""
    response.delete_cookie(key=COOKIE_NAME, httponly=True, secure=True, samesite="lax")

def verify_token_from_cookie(request: Request) -> dict:
    """Verify JWT token from cookie"""
    token = get_token_from_cookie(request)
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")