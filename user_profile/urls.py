from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.profile_view, name='user_profile'),
    path('profile/<str:username>/', views.profile_view, name='view_user_profile'),
    path('profile/edit/', views.edit_profile, name='edit_user_profile'),
    path('profiles/', views.profile_list, name='user_profile_list'),
]