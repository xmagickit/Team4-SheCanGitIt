from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Mentor, MentorshipRequest
from .utils import match_mentors
from .forms import MentorSearchForm

@login_required
def mentor_list(request):
    """List mentors based on mentee skill input."""
    mentors = Mentor.objects.all()
    form = MentorSearchForm(request.GET)

    if form.is_valid():
        skills = form.cleaned_data['skills']
        mentors = match_mentors(skills)

    return render(request, "her_mentor/mentor_list.html", {"mentors": mentors, "form": form})

@login_required
def send_request(request, mentor_id):
    """Allow a mentee to send a mentorship request."""
    mentor = get_object_or_404(Mentor, id=mentor_id)
    mentee = request.user

    # Ensure mentee does not send duplicate requests
    existing_request = MentorshipRequest.objects.filter(mentee=mentee, mentor=mentor).exists()
    if not existing_request:
        MentorshipRequest.objects.create(mentee=mentee, mentor=mentor)
    
    return redirect("mentorship_dashboard")

@login_required
def mentorship_dashboard(request):
    """Display mentorship requests for the logged-in user."""
    user = request.user

    if hasattr(user, "mentor"):  # If user is a mentor
        requests = MentorshipRequest.objects.filter(mentor=user.mentor)
    else:
        requests = MentorshipRequest.objects.filter(mentee=user)

    return render(request, "her_mentor/mentor_dashboard.html", {"requests": requests})

