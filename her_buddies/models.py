from django.db import models
from django.contrib.auth.models import User

class TechStack(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class StudyGroup(models.Model):
    tech_stack = models.OneToOneField(TechStack, on_delete=models.CASCADE)  # One-to-One relationship
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    meeting_link = models.URLField()

    def __str__(self):
        return f"{self.tech_stack.name} Study Group on {self.date}"

class Discussion(models.Model):
    study_group = models.ForeignKey('StudyGroup', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message[:50]