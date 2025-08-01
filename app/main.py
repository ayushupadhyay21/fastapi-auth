from fastapi import FastAPI
from .database import Base, engine
from .routes import auth_routes, protected_routes

app = FastAPI()



# Create tables
Base.metadata.create_all(bind=engine)

# Include auth routes
app.include_router(auth_routes.router)

# Include protected routes
app.include_router(protected_routes.router)

@app.get("/FastAPI Status")
def root():
    return {"message": "FastAPI Auth System Running"}
