from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.profile_view, name='profile'),
    path('profile/<str:username>/', views.profile_view, name='view_profile'),
    path('profile/edit/', views.edit_profile, name='edit_profile'),
    path('profiles/', views.profile_list, name='profile_list'),
]