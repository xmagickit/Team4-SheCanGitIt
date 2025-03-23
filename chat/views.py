from django.shortcuts import render
from .models import ChatRoom
from her_mentor.models import Mentor, MentorshipRequest

def chat(request):
    user = request.user

    print(f"DEBUG -- user type: {type(user)}")

    # Check if the user is a mentor
    is_mentor = Mentor.objects.filter(user=user).exists()

    mentors = Mentor.objects.filter(
        mentor_requests__mentee=user,
        mentor_requests__status="accepted"
    ).select_related("user")  # Get all mentors with their user details
    return render(request, "chat/chat.html", {"mentors": mentors}, "is_mentor": is_mentor})


def chatroom(request, room_name):
    available_rooms = ChatRoom.objects.values_list('name', flat=True)
    chatroom = ChatRoom.objects.filter(name=room_name).first()

    chatroom_exists = room_name in available_rooms

    if not chatroom_exists:
        return render(request, "chat/chatroom_not_found.html", {"room_name": room_name})
    
    return render(request, "chat/chatroom.html", {
        "room_name": room_name,
        "friendly_name": chatroom.friendly_name,
    })
    