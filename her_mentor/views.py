from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Mentor, MentorshipRequest
from django.http import HttpResponseForbidden
from django.core.mail import send_mail
from django.contrib import messages
from .utils import match_mentors, send_notification
from .forms import MentorSearchForm, FeedbackForm, MentorProfileForm

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

        print("Sending email to mentor:", mentor.user.email)

        send_mail(
            subject="New Mentorship Request",
            message=(
                f"Hi {mentor.user.username},\n\n"
                f"You have a new mentorship request from {mentee.username}.\n"
                f"Log in to view it: http://127.0.0.1:8000/mentor_dashboard/"
            ),
            from_email=None,  # uses DEFAULT_FROM_EMAIL
            recipient_list=[mentor.user.email],
            fail_silently=False,
        )

        send_notification(mentor.user, f"You received a new mentorship request from {mentee.username}.")
    
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


@login_required
def accept_request(request, request_id):
    mentorship_request = get_object_or_404(MentorshipRequest, id=request_id)

    if mentorship_request.mentor.user != request.user:
        return HttpResponseForbidden("You're not allowed to do that.")

    mentorship_request.status = "accepted"
    mentorship_request.save()
    messages.success(request, "You accepted the mentorship request.")
    send_notification(mentorship_request.mentee, f"{request.user.username} accepted your mentorship request.")
    return redirect("mentorship_dashboard")


@login_required
def decline_request(request, request_id):
    mentorship_request = get_object_or_404(MentorshipRequest, id=request_id)

    if mentorship_request.mentor.user != request.user:
        return HttpResponseForbidden("You're not allowed to do that.")

    mentorship_request.status = "declined"
    mentorship_request.save()
    messages.info(request, "You declined the mentorship request.")
    send_notification(mentorship_request.mentee, f"{request.user.username} declined your mentorship request.")
    return redirect("mentorship_dashboard")


@login_required
def give_feedback(request, request_id):
    mentorship_request = get_object_or_404(MentorshipRequest, id=request_id)

    if mentorship_request.mentee != request.user or mentorship_request.status != "accepted":
        return HttpResponseForbidden("You can't leave feedback for this request.")

    if request.method == "POST":
        form = FeedbackForm(request.POST)
        if form.is_valid():
            mentorship_request.rating = form.cleaned_data["rating"]
            mentorship_request.feedback = form.cleaned_data["feedback"]
            mentorship_request.save()
            messages.success(request, "Feedback submitted!")
            return redirect("mentorship_dashboard")
    else:
        form = FeedbackForm()

    return render(request, "her_mentor/feedback_form.html", {"form": form, "request_obj": mentorship_request})

@login_required
def edit_profile(request):
    try:
        mentor = request.user.mentor
    except Mentor.DoesNotExist:
        mentor = None

    if request.method == "POST":
        form = MentorProfileForm(request.POST, instance=mentor)
        if form.is_valid():
            mentor = form.save(commit=False)
            mentor.user = request.user
            mentor.save()
            messages.success(request, "Profile updated!")
            return redirect("edit_profile")
    else:
        form = MentorProfileForm(instance=mentor)

    return render(request, "her_mentor/edit_profile.html", {"form": form, "mentor": mentor})


@login_required
def hermentor_redirect(request):
    """Redirects users to the correct HerMentor view based on their role."""
    if hasattr(request.user, "mentor"):
        return redirect("mentorship_dashboard")
    else:
        return redirect("mentor_list")

