from django.shortcuts import render
from .models import ChatRoom
from her_mentor.models import Mentor, MentorshipRequest

def chat(request):
    user = request.user

    # Check if the user is a mentor
    is_mentor = Mentor.objects.filter(user=user).exists()

    mentors = Mentor.objects.filter(
        mentor_requests__mentee=user,
        mentor_requests__status="accepted"
    ).select_related("user")  # Get all mentors with their user details
    return render(request, "chat/chat.html", {"mentors": mentors, "is_mentor": is_mentor})


def chatroom(request, room_name):
    user = request.user

    is_mentor = Mentor.objects.filter(user=user).exists()

    print(f"DEBUG -- is_mentor: ", is_mentor)

    assigned_mentors = Mentor.objects.filter(
        mentor_requests__mentee=user,
        mentor_requests__status="accepted"
    ).select_related("user")

    if is_mentor:
        assigned_mentors = list(assigned_mentors) + [Mentor(user=user)] 

    mentor_usernames = [mentor.user.username for mentor in assigned_mentors]

    print(f"DEBUG -- room_name: {room_name}")
    print(f"DEBUG -- mentor_usernames: {mentor_usernames}")
    print(f"DEBUG -- room_name in mentor_usernames: {room_name in mentor_usernames}")

    if room_name not in mentor_usernames:
        return render(request, "chat/chatroom_not_found.html", {"room_name": room_name})

    matched_mentor = next((mentor for mentor in assigned_mentors if mentor.user.username == room_name), None)
    
    friendly_name = f"{matched_mentor.user.first_name} {matched_mentor.user.last_name}" if matched_mentor else "Unknown"

    # available_rooms = ChatRoom.objects.values_list('name', flat=True)
    # chatroom = ChatRoom.objects.filter(name=room_name).first()

    # chatroom_exists = room_name in available_rooms

    # if not chatroom_exists:
    #     return render(request, "chat/chatroom_not_found.html", {"room_name": room_name})
    
    return render(request, "chat/chatroom.html", {
        "room_name": room_name,
        "friendly_name": friendly_name,
    })
    