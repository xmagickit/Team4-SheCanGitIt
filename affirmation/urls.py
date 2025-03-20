from django.urls import path
from . import views

urlpatterns = [
    path('', views.affirmation, name='affirmation'),
]