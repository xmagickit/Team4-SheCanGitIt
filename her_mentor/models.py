from django.db import models
from django.contrib.auth.models import User
from django.db.models import Avg


class Mentor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    skills = models.TextField(help_text="Comma-separated skills, e.g., Python, Django, AI")
    experience_level = models.CharField(max_length=50)
    bio = models.TextField(blank=True, null=True)
    available = models.BooleanField(default=False)

    def get_skill_list(self):
        """Convert comma-separated skills into a list."""
        return [skill.strip().lower() for skill in self.skills.split(",")]

    def __str__(self):
        return f"{self.user.username} - {self.experience_level}"
    
    def average_rating(self):
        return self.mentor_requests.filter(status="accepted", rating__isnull=False).aggregate(
            Avg("rating")
        )["rating__avg"]


class MentorshipRequest(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("declined", "Declined"),
    ]
    mentee = models.ForeignKey(User, on_delete=models.CASCADE, related_name="mentee_requests")
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE, related_name="mentor_requests")
    status = models.CharField(choices=STATUS_CHOICES, max_length=10, default="pending")
    feedback = models.TextField(blank=True, null=True)
    rating = models.PositiveIntegerField(blank=True, null=True)  # 1-5

    def __str__(self):
        return f"Request from {self.mentee.username} to {self.mentor.user.username} - {self.status}"


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications")
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"To {self.user.username}: {self.message[:40]}"