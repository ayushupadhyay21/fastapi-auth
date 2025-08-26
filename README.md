# 🛡️ TokenHaven - Modern FastAPI Authentication System

<div align="center">

![TokenHaven Logo](https://img.shields.io/badge/TokenHaven-Secure%20Auth-6366f1?style=for-the-badge&logo=shield&logoColor=white)

**A beautiful, secure, and modern authentication system built with FastAPI and JWT**

[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-00a393?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-3776ab?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0+-red?style=flat-square&logo=sqlalchemy)](https://sqlalchemy.org/)

[🚀 Live Demo](#-quick-start) • [📖 Documentation](#-api-documentation) • [🎨 Features](#-features) • [⚡ Quick Start](#-quick-start)

</div>

---

## ✨ Features

### 🔐 **Authentication & Security**
- **JWT Authentication** with secure token management
- **Password Hashing** using bcrypt
- **Input Validation** with Pydantic schemas
- **CORS Protection** with configurable origins
- **Environment Variables** validation
- **Timezone-aware** token expiration

### 🎨 **Modern Frontend**
- **Responsive Design** that works on all devices
- **Dark/Light Theme** with persistent storage
- **Smooth Animations** and transitions
- **Loading States** for better UX
- **Form Validation** with real-time feedback
- **Professional UI** with glassmorphism effects

### 📝 **Blog System**
- **Create, Read, Update, Delete** blog posts
- **User-specific** blog management
- **Rich Content** support
- **Timestamp tracking** for posts

### 🏠 **Dashboard Features**
- **Profile Management** with user details
- **Authentication Testing** tools
- **Activity Logging** and monitoring
- **Account Actions** (password change, data export)
- **Security Status** indicators

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- PostgreSQL (or SQLite for development)

### 1. Clone & Setup
```bash
git clone https://github.com/ayushupadhyay21/fastapi-auth.git
cd fastapi-auth
pip install -r requirements.txt
```

### 2. Environment Configuration
Create `.env` file:
```env
SECRET_KEY=your_super_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DATABASE_URL=sqlite:///./tokenhaven.db
ALLOWED_ORIGINS=http://127.0.0.1:8000,http://localhost:8000
```

### 3. Run the Application
```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### 4. Access the Application
- **Frontend**: http://127.0.0.1:8000/frontend/
- **API Docs**: http://127.0.0.1:8000/docs
- **ReDoc**: http://127.0.0.1:8000/redoc

---

## 🏗️ Project Structure

```
fastapi-auth/
├── 📁 app/
│   ├── 🔐 auth.py              # JWT & password utilities
│   ├── 🗄️ database.py          # Database configuration
│   ├── 📊 models.py            # SQLAlchemy models
│   ├── 📋 schemas.py           # Pydantic schemas
│   ├── 🔒 security.py          # Security utilities
│   ├── 📝 blog_models.py       # Blog database models
│   ├── 📄 blog_schemas.py      # Blog Pydantic schemas
│   ├── 🍪 cookie_auth.py       # Cookie authentication
│   ├── 🔧 dependencies.py      # FastAPI dependencies
│   ├── 🚀 main.py              # FastAPI application
│   └── 📁 routes/
│       ├── 🔑 auth_routes.py   # Authentication endpoints
│       ├── 🛡️ protected_routes.py # Protected endpoints
│       └── 📝 blog_routes.py   # Blog CRUD endpoints
├── 📁 frontend/
│   ├── 🏠 index.html           # Landing page
│   ├── 📊 dashboard.html       # User dashboard
│   ├── 📝 blog.html            # Blog management
│   ├── 👤 PortfolioAyush.html  # Profile page
│   ├── 🎨 styles.css           # Modern CSS styling
│   ├── ⚡ main.js              # Core JavaScript
│   └── 📝 blog.js              # Blog functionality
├── 📋 requirements.txt         # Python dependencies
├── 🔒 .env                     # Environment variables
└── 📖 README.md               # This file
```

---

## 🔌 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/signup` | Register new user | ❌ |
| `POST` | `/login` | User login | ❌ |
| `GET` | `/user/me` | Get current user | ✅ |
| `GET` | `/protected` | Test protected route | ✅ |

### 📝 Blog Management
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/blogs` | Get user's blogs | ✅ |
| `POST` | `/blogs` | Create new blog | ✅ |
| `GET` | `/blogs/{id}` | Get specific blog | ✅ |
| `PUT` | `/blogs/{id}` | Update blog | ✅ |
| `DELETE` | `/blogs/{id}` | Delete blog | ✅ |

### 📊 System
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/status` | System status | ❌ |
| `GET` | `/` | Landing page | ❌ |

---

## 🎨 Screenshots

### 🌅 Landing Page
Beautiful hero section with authentication forms and theme toggle.

### 📊 Dashboard
Comprehensive user dashboard with profile management and activity monitoring.

### 📝 Blog System
Create and manage blog posts with a modern, intuitive interface.

### 🌙 Dark Theme
Elegant dark mode with smooth transitions and professional styling.

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **Pydantic** - Data validation using Python type hints
- **python-jose** - JWT implementation
- **passlib** - Password hashing library
- **python-dotenv** - Environment variable management

### Frontend
- **Vanilla JavaScript** - Modern ES6+ features
- **CSS Grid & Flexbox** - Responsive layouts
- **Font Awesome** - Beautiful icons
- **CSS Custom Properties** - Theme system

### Database
- **PostgreSQL** - Production database
- **SQLite** - Development database

---

## 🔒 Security Features

- ✅ **JWT Token Authentication**
- ✅ **Password Hashing** with bcrypt
- ✅ **Input Validation** and sanitization
- ✅ **CORS Protection**
- ✅ **Environment Variable** validation
- ✅ **SQL Injection** prevention
- ✅ **XSS Protection** measures
- ✅ **Secure Headers** implementation

---

## 🚀 Deployment

### Using Docker (Recommended)
```bash
# Build image
docker build -t tokenhaven .

# Run container
docker run -p 8000:8000 tokenhaven
```

### Using Heroku
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set SECRET_KEY=your_secret_key
heroku config:set DATABASE_URL=your_database_url

# Deploy
git push heroku main
```

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ayush Upadhyay**
- GitHub: [@ayushupadhyay21](https://github.com/ayushupadhyay21)
- LinkedIn: [Ayush Upadhyay](https://linkedin.com/in/ayushupadhyay21)

---

## 🙏 Acknowledgments

- FastAPI team for the amazing framework
- Pydantic for excellent data validation
- SQLAlchemy for powerful ORM capabilities
- Font Awesome for beautiful icons

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Ayush Upadhyay](https://github.com/ayushupadhyay21)

</div>