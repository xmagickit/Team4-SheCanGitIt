from django.urls import path
from her_story.views import home_view, retro_computer_view

urlpatterns = [
     path('', home_view, name='home'),
     path('retro/', retro_computer_view, name='retro_computer'),

]