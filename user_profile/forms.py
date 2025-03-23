from django import forms
from django.contrib.auth.models import User
from .models import Profile

class UserUpdateForm(forms.ModelForm):
    """Form for updating user information"""
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']

class ProfileUpdateForm(forms.ModelForm):
    """Form for updating profile information"""
    class Meta:
        model = Profile
        fields = [
            'avatar_choice', 'bio', 'tech_interests', 'skills', 
            'experience_level', 'github_url', 'linkedin_url', 
            'twitter_url', 'portfolio_url', 'seeking_buddy', 
            'buddy_description', 'is_mentor', 'mentor_bio'
        ]
        widgets = {
            'bio': forms.Textarea(attrs={'rows': 3}),
            'buddy_description': forms.Textarea(attrs={'rows': 3}),
            'mentor_bio': forms.Textarea(attrs={'rows': 3}),
        }