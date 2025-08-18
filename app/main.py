from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routes import auth_routes, protected_routes
import os
from fastapi.staticfiles import StaticFiles

app = FastAPI()


# CORS configuration for browser-based frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Create tables
Base.metadata.create_all(bind=engine)

# Include auth routes
app.include_router(auth_routes.router)

# Include protected routes
app.include_router(protected_routes.router)

@app.get("/TokenHaven Status")
def root():
    return {"message": "TokenHaven Auth System Running"}

# Optionally serve the static frontend if present
frontend_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend")
if os.path.isdir(frontend_dir):
    app.mount("/frontend", StaticFiles(directory=frontend_dir, html=True), name="frontend")
