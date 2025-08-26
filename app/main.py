from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routes import auth_routes, protected_routes, blog_routes
import os
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title="TokenHaven Auth API",
    description="Secure FastAPI JWT Authentication System",
    version="1.0.0"
)


# CORS configuration for browser-based frontend
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://127.0.0.1:8000,http://localhost:8000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in allowed_origins],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization", "Content-Type"],
)



# Create tables
Base.metadata.create_all(bind=engine)

# Include auth routes
app.include_router(auth_routes.router)

# Include protected routes
app.include_router(protected_routes.router)

# Include blog routes
app.include_router(blog_routes.router)

@app.get("/status")
def status():
    return {"message": "TokenHaven Auth System Running"}

@app.get("/")
def root():
    from fastapi.responses import FileResponse
    return FileResponse("frontend/landing.html")

# Optionally serve the static frontend if present
frontend_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend")
if os.path.isdir(frontend_dir):
    app.mount("/frontend", StaticFiles(directory=frontend_dir, html=True), name="frontend")
