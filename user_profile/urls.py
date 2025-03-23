from django.urls import path
from . import views

urlpatterns = [
    path('profile/edit/', views.edit_profile, name='edit_profile'),
    path('profile/select-image/', views.select_profile_image, name='select_profile_image'),
    path('profile/<str:username>/', views.profile_view, name='view_profile'),
    path('user_profile/', views.profile_view, name='user_profile'),
    path('profiles/', views.profile_list, name='profile_list'),
]