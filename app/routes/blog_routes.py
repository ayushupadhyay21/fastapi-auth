from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..dependencies import get_db
from ..routes.protected_routes import get_current_user

router = APIRouter(prefix="/blogs", tags=["blogs"])

@router.post("/", response_model=schemas.BlogResponse)
def create_blog(
    blog: schemas.BlogCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_blog = models.Blog(
        title=blog.title,
        content=blog.content,
        author_id=current_user.id
    )
    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)
    
    return schemas.BlogResponse(
        id=db_blog.id,
        title=db_blog.title,
        content=db_blog.content,
        author_id=db_blog.author_id,
        author_username=current_user.username,
        created_at=db_blog.created_at
    )

@router.get("/", response_model=List[schemas.BlogResponse])
def get_blogs(db: Session = Depends(get_db)):
    blogs = db.query(models.Blog).join(models.User).all()
    return [
        schemas.BlogResponse(
            id=blog.id,
            title=blog.title,
            content=blog.content,
            author_id=blog.author_id,
            author_username=blog.author.username,
            created_at=blog.created_at
        )
        for blog in blogs
    ]

@router.get("/my", response_model=List[schemas.BlogResponse])
def get_my_blogs(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    blogs = db.query(models.Blog).filter(models.Blog.author_id == current_user.id).all()
    return [
        schemas.BlogResponse(
            id=blog.id,
            title=blog.title,
            content=blog.content,
            author_id=blog.author_id,
            author_username=current_user.username,
            created_at=blog.created_at
        )
        for blog in blogs
    ]