🚀 FastAPI Auth API
    A secure, minimal REST API built using FastAPI with JWT-based authentication for user registration, login, and access to protected routes.

📁 Project Structure

app/
├── routes/
│   ├── auth_routes.py        # Signup and login routes
│   └── protected_routes.py   # Auth-protected endpoints
├── auth.py                   # JWT token logic and user authentication
├── database.py               # SQLAlchemy database setup
├── dependencies.py           # Dependency injection (e.g., get DB session)
├── main.py                   # FastAPI app entry point
├── models.py                 # SQLAlchemy models
├── schemas.py                # Pydantic schemas
.env                          # Environment variables
requirements.txt              # Dependencies

⚙️ Features

✅ Signup – Create a new user

✅ Login – Authenticate and get JWT token

✅ Protected Routes – Access restricted data using token

✅ User Profile – Fetch logged-in user’s details

🔐 JWT-based authentication

🧪 API Endpoints
Method	Endpoint	Description	Auth Required
POST	/signup	Register a new user	❌
POST	/login	Get access token	❌
GET	/protected	Test protected access	✅
GET	/user/me	Get current user info	✅

🔐 Authentication
Use the /login route to get a JWT access token. Then click "Authorize" in Swagger UI and paste:

php-template
Copy
Edit
Bearer <your_access_token>


🛠️ Getting Started

1. Clone the repo:
    git clone https://github.com/ayushupadhyay21/fastapi-auth-api.git
    cd fastapi-auth-api

2. Install dependencies:
    pip install -r requirements.txt

3. Set environment variables: (see .env.example)
    Create a .env file:

    SECRET_KEY=your_secret_key
    ALGORITHM=HS256
    ACCESS_TOKEN_EXPIRE_MINUTES=30
    DATABASE_URL=sqlite:///./test.db

5. Run the app:
    uvicorn app.main:app --reload

    
🔍 API Docs:
    Swagger UI: http://127.0.0.1:8000/docs

    Redoc: http://127.0.0.1:8000/redoc


📦 Tech Stack:
    FastAPI

    SQLAlchemy

    Pydantic

    JWT

    SQLite (default DB)


🧑‍💻 Author
    Ayush Upadhyay
    Data Analyst & Python Developer