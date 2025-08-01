📦 FastAPI JWT Auth API
    A simple and secure authentication system built with FastAPI, JWT, and PostgreSQL.

🚀 Features

   ✅ User Registration
   🔐 Login with JWT Token
   🙋‍♂️ Protected /me route to view user profile
   🛠️ Modular code structure using FastAPI best practices
   📦 Uses SQLAlchemy + PostgreSQL

📁 Project Structure 

    fastapi-auth/
    ├── app/
    │   ├── auth.py
    │   ├── database.py
    │   ├── dependencies.py
    │   ├── main.py
    │   ├── models.py
    │   ├── schemas.py
    │   └── routes/
    │       ├── auth_routes.py
    │       └── protected_routes.py
    ├── requirements.txt
    ├── .gitignore
    └── README.md

🧪 API Routes
     Method	Endpoint	Description	Auth Required
     POST	/register	Register new user	❌
     POST	/login	Login and get token	❌
     GET	/me	Get logged-in profile	✅ (JWT)

▶️ Running Locally
1. Clone the repo:
    git clone https://github.com/ayushupadhyay21/fastapi-auth.git
    cd fastapi-auth
   
3. Create and activate virtual env:
    python -m venv env
    source env/bin/activate   # or env\Scripts\activate on Windows
   
5. Install dependencies:
    pip install -r requirements.txt
   
6. Start the FastAPI app:
    uvicorn app.main:app --reload
    Visit the API docs at: http://localhost:8000/docs

🧠 Tech Stack
     FastAPI
     PostgreSQL
     SQLAlchemy
     PyJWT

📌 License
MIT © Ayush Upadhyay
