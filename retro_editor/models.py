from django.db import models
from django.contrib.auth.models import User

LANGUAGE_CHOICES = [
    ('html', 'HTML'),
    ('css', 'CSS'),
    ('js', 'JavaScript'),
    ('py', 'Python'),
]

class CodeSnippet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    language = models.CharField(max_length=20, choices=LANGUAGE_CHOICES)
    code_content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    is_public = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.title} ({self.language}) by {self.user.username}"

class TechPioneerTip(models.Model):
    pioneer = models.CharField(max_length=100)
    tip_content = models.TextField()
    language = models.CharField(max_length=20, choices=LANGUAGE_CHOICES, blank=True)
    
    def __str__(self):
        return f"Tip from {self.pioneer}"