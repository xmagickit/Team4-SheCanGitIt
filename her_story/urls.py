from django.urls import path
from her_story.views import home_view

urlpatterns = [
     path('', home_view, name='home'),

]