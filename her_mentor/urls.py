from django.urls import path
from .views import mentor_list, send_request, mentorship_dashboard, accept_request, decline_request, give_feedback



urlpatterns = [
    path('mentors/', mentor_list, name="mentor_list"),
    path('send_request/<int:mentor_id>/', send_request, name="send_request"),
    path('mentor_dashboard/', mentorship_dashboard, name="mentorship_dashboard"),
    path('accept_request/<int:request_id>/', accept_request, name="accept_request"),
    path('decline_request/<int:request_id>/', decline_request, name="decline_request"),
    path('feedback/<int:request_id>/', give_feedback, name="give_feedback"),
]
