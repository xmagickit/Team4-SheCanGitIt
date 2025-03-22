from django.urls import path
from . import views

urlpatterns = [
    path('tech/', views.tech_list, name='tech_list'),
    path('tech/add/', views.add_tech_stack, name='add_tech_stack'),
    path('tech/<int:study_group_id>/', views.tech_discussion, name='tech_discussion'),    
    path('tech/<int:study_group_id>/add_discussion/', views.add_discussion, name='add_discussion'),
    path('discussion/<int:discussion_id>/edit/', views.edit_discussion, name='edit_discussion'),
    path('discussion/<int:discussion_id>/delete/', views.delete_discussion, name='delete_discussion'),
]