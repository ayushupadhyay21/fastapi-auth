## TokenHaven – FastAPI JWT Auth with Lightweight Frontend

A simple, secure authentication system built on FastAPI with JWT, plus a minimal, user‑friendly frontend you can open in a browser. Includes signup, login, protected route, and profile view.

### Features
- **JWT auth**: Signup, login, and access protected endpoints with Bearer tokens
- **Profile**: `/user/me` returns the current user
- **Protected route**: `/protected` demonstrates auth gating
- **Frontend included**: Simple HTML/CSS/JS UI with login redirect and theme toggle
- **CORS enabled**: Browser apps can call the API

### Project Structure
```
fastapi-auth/
├─ app/
│  ├─ auth.py                  # Hash/verify password, create JWT
│  ├─ database.py              # SQLAlchemy engine/session, Base
│  ├─ dependencies.py          # get_db dependency
│  ├─ main.py                  # FastAPI app, CORS, static mount
│  ├─ models.py                # SQLAlchemy models (User)
│  ├─ schemas.py               # Pydantic schemas
│  └─ routes/
│     ├─ auth_routes.py        # /signup, /login
│     └─ protected_routes.py   # /protected, /user/me
├─ frontend/
│  ├─ index.html               # Home: signup/login + actions
│  ├─ PortfolioAyush.html      # Post-login portfolio/profile page
│  ├─ styles.css               # Shared styles
│  └─ main.js                  # Frontend logic
├─ requirements.txt
└─ README.md
```

### API Routes

| Method | Endpoint     | Description                | Auth |
|--------|--------------|----------------------------|------|
| POST   | `/signup`    | Register a new user        | No   |
| POST   | `/login`     | Get JWT access token       | No   |
| GET    | `/protected` | Example protected resource | Yes  |
| GET    | `/user/me`   | Current user profile       | Yes  |

### Environment
Create a `.env` file in the project root (same folder as `requirements.txt`):
```
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DATABASE_URL=sqlite:///./test.db
```

SQLite works out of the box. For Postgres or others, set `DATABASE_URL` accordingly (e.g., `postgresql://user:pass@host:5432/dbname`).

### Run the Backend
1) Install dependencies
```
pip install -r requirements.txt
```
2) Start the API
```
uvicorn app.main:app --reload
```
3) API docs
- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

### Use the Frontend
Option A — served by FastAPI (recommended)
- Visit: `http://127.0.0.1:8000/frontend/`

Option B — open directly as static files
- Open `frontend/index.html` in your browser

Flow
- Sign up → Log in → You’ll be redirected to `frontend/PortfolioAyush.html`
- “Show my profile” from home also navigates to `PortfolioAyush.html`
- Token is stored in `localStorage` and sent as `Authorization: Bearer <token>`
- Theme toggle: switch between light and translucent dark

### CORS
`app/main.py` enables permissive CORS so the browser UI can call the API.

### Tech Stack
- **FastAPI**, **Pydantic**, **SQLAlchemy**
- **python-jose** for JWT
- **passlib[bcrypt]** for password hashing
- **Vanilla HTML/CSS/JS** frontend

### Notes
- Keep secrets out of Git (do not commit `.env`)
- Default DB is SQLite; change `DATABASE_URL` for production

### License
MIT © Ayush Upadhyay

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
