from django.urls import path
from her_story.views import retro_computer_view

urlpatterns = [
     path('retro/', retro_computer_view, name='retro_computer'),

]