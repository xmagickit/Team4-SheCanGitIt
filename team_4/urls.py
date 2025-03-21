"""
URL configuration for team_4 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

import os

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('', include('home.urls')),  # Added the home view as the root URL
    # Add your app URLs here as the project develops
    path('herstory/', include('her_story.urls')),
    # path('mentor/', include('her_mentor.urls')),
    # path('buddies/', include('her_buddies.urls')),
    path('chat/', include('chat.urls')),
    path('affirmation/', include('affirmation.urls')),
]
