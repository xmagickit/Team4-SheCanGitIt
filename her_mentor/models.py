from django.db import models
from django.contrib.auth.models import User
from django.db import models
from django.contrib.auth.models import User


class Mentor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    skills = models.TextField(help_text="Comma-separated skills, e.g., Python, Django, AI")
    experience_level = models.CharField(max_length=50)
    bio = models.TextField(blank=True, null=True)

    def get_skill_list(self):
        """Convert comma-separated skills into a list."""
        return [skill.strip().lower() for skill in self.skills.split(",")]

    def __str__(self):
        return f"{self.user.username} - {self.experience_level}"


class MentorshipRequest(models.Model):
    mentee = models.ForeignKey(User, on_delete=models.CASCADE, related_name="mentee_requests")
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE, related_name="mentor_requests")
    status = models.CharField(
        choices=[("pending", "Pending"), ("accepted", "Accepted"), ("declined", "Declined")], 
        max_length=10, 
        default="pending"
    )

    def __str__(self):
        return f"Request from {self.mentee.username} to {self.mentor.user.username} - {self.status}"
