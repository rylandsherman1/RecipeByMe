# config.py
from os import path, environ

# Define the base directory of the application
BASE_DIR = path.abspath(path.dirname(__file__))


class Config:
    # Secret key for sessions, cookies, CSRF protection, etc.
    SECRET_KEY = environ.get("SECRET_KEY") or "your-default-secret-key"

    # Database configuration
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + path.join(BASE_DIR, "instance", "app.db")

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # You can add other configuration settings as needed
