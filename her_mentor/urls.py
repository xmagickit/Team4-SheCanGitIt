from django.urls import path
from .views import mentor_list, send_request, mentorship_dashboard


urlpatterns = [
    path('mentors/', mentor_list, name="mentor_list"),
    path('send_request/<int:mentor_id>/', send_request, name="send_request"),
    path('mentor_dashboard/', mentorship_dashboard, name="mentorship_dashboard"),
]
