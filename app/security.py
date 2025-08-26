"""Security configuration and utilities"""
import secrets
import os
from typing import List

def generate_secret_key() -> str:
    """Generate a secure random secret key"""
    return secrets.token_urlsafe(32)

def validate_environment():
    """Validate all required environment variables"""
    required_vars = [
        "SECRET_KEY",
        "ALGORITHM", 
        "ACCESS_TOKEN_EXPIRE_MINUTES",
        "DATABASE_URL"
    ]
    
    missing_vars = []
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")

def get_allowed_origins() -> List[str]:
    """Get allowed CORS origins from environment"""
    origins = os.getenv("ALLOWED_ORIGINS", "http://127.0.0.1:8000,http://localhost:8000")
    return [origin.strip() for origin in origins.split(",")]

# Security headers
SECURITY_HEADERS = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY", 
    "X-XSS-Protection": "1; mode=block",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Content-Security-Policy": "default-src 'self'"
}