"""
Django settings for team_4 project.
"""

from pathlib import Path
import os
import dj_database_url # type: ignore
from dotenv import load_dotenv


# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Explicit path to .env file
env_path = BASE_DIR / '.env'

# Print to debug
print(f"Looking for .env file at: {env_path}")
print(f"File exists: {env_path.exists()}")

# Load the .env file
load_dotenv(dotenv_path=env_path)

# Security settings
SECRET_KEY = os.getenv("SECRET_KEY")

DEBUG = os.getenv("DEBUG", "True") != "False"
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "localhost,127.0.0.1,.herokuapp.com").split(",")


# Application definition

INSTALLED_APPS = [
    # predefined django apps
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'channels',  # for async messaging
    'daphne',  # for async messaging, must be placed before django.contrib.staticfiles
    'django.contrib.staticfiles',

    #cloudinary
    'cloudinary',
    'cloudinary_storage',

    #allauth
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
     
    # custom project apps
    'affirmation',
    'chat',
    'her_buddies',
    'her_mentor',
    'her_story',
    'home',
    'retro_editor',
]

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',  # Default auth backend
    'allauth.account.auth_backends.AuthenticationBackend',  # Django Allauth
]

# Configure Allauth
ACCOUNT_LOGIN_METHODS = ['email']  # Use email instead of username
ACCOUNT_SIGNUP_FIELDS = ['email*', 'password1*', 'password2*']
ACCOUNT_SIGNUP_REDIRECT_URL = '/'  # Redirect after sign-up
ACCOUNT_LOGOUT_REDIRECT_URL = '/'  # Redirect after logout
LOGIN_REDIRECT_URL = '/'  # Redirect after login
ACCOUNT_EMAIL_VERIFICATION = 'none'

MIDDLEWARE = [
    'allauth.account.middleware.AccountMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 'django.template.context_processors.request',
]

ROOT_URLCONF = 'team_4.urls'

TEMPLATES_DIR = os.path.join(BASE_DIR, 'templates')

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [TEMPLATES_DIR],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'retro_editor.context_processors.recent_code_snippets',
            ],
        },
    },
]

WSGI_APPLICATION = 'team_4.wsgi.application'
ASGI_APPLICATION = 'team_4.asgi.application'


# Database Configuration (Using DATABASE_URL)
DATABASE_URL = os.getenv("DATABASE_URL")
DATABASES = {
    'default': dj_database_url.parse(DATABASE_URL, conn_max_age=600) if DATABASE_URL else {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

CLOUDINARY_STORAGE = {
    'CLOUDINARY_URL': os.getenv('CLOUDINARY_URL'),
}

DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = '/static/'


STATICFILES_DIRS = [
    BASE_DIR / "static",  # Or wherever you store custom static files
]

# Static files for collecting in production
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Default auto field
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
