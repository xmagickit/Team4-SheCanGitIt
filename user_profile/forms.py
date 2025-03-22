from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from cloudinary.models import CloudinaryField

class Profile(models.Model):
    TECH_INTERESTS_CHOICES = [
        ('frontend', 'Frontend Development'),
        ('backend', 'Backend Development'),
        ('fullstack', 'Full Stack Development'),
        ('mobile', 'Mobile Development'),
        ('ai', 'Artificial Intelligence'),
        ('data', 'Data Science'),
        ('cybersecurity', 'Cybersecurity'),
        ('devops', 'DevOps'),
        ('game', 'Game Development'),
        ('ux', 'UX/UI Design'),
        ('other', 'Other'),
    ]
    
    EXPERIENCE_LEVEL_CHOICES = [
        ('beginner', 'Beginner (0-1 years)'),
        ('intermediate', 'Intermediate (1-3 years)'),
        ('advanced', 'Advanced (3-5 years)'),
        ('expert', 'Expert (5+ years)'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_image = CloudinaryField('image', null=True, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    tech_interests = models.CharField(
        max_length=100, 
        choices=TECH_INTERESTS_CHOICES, 
        blank=True
    )
    skills = models.TextField(help_text="Comma-separated skills, e.g., Python, Django, JavaScript", blank=True)
    experience_level = models.CharField(
        max_length=20, 
        choices=EXPERIENCE_LEVEL_CHOICES, 
        blank=True
    )
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    portfolio_url = models.URLField(blank=True)
    
    # For HerBuddies functionality
    seeking_buddy = models.BooleanField(default=False)
    buddy_description = models.TextField(max_length=500, blank=True)
    
    # For HerMentor functionality
    is_mentor = models.BooleanField(default=False)
    mentor_bio = models.TextField(max_length=500, blank=True)
    
    def __str__(self):
        return f"{self.user.username}'s profile"
    
    def get_skill_list(self):
        """Convert comma-separated skills into a list."""
        if not self.skills:
            return []
        return [skill.strip().lower() for skill in self.skills.split(",")]

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Create a Profile whenever a new User is created"""
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """Save the Profile whenever the User is saved"""
    instance.profile.save()