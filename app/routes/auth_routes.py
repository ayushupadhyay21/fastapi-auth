from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, auth
from ..dependencies import get_db
from sqlalchemy.orm import Session
from passlib.context import CryptContext

router = APIRouter(prefix="", tags=["auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Signup Route
@router.post("/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if username or email exists
    existing_user = db.query(models.User).filter(
        (models.User.username == user.username) | (models.User.email == user.email)
    ).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or email already exists.")

    # Hash password
    hashed_pw = auth.hash_password(user.password)

    # Create user
    new_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_pw
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully."}

# Login Route
@router.post("/login", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()

    if not db_user or not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid username or password.")

    token = auth.create_access_token(data={"sub": db_user.username})
    return {"access_token": token, "token_type": "bearer"}

