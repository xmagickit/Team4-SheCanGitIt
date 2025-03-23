from django import forms
from .models import TechStack
from .models import Discussion

class TechStackForm(forms.ModelForm):
    date = forms.DateField(
        widget=forms.DateInput(attrs={'type': 'date'}),  # Adds a calendar picker
        required=True
    )
    time = forms.TimeField(
        widget=forms.TimeInput(attrs={'type': 'time'}),  # Adds a time picker
        required=True
    )
    meeting_link = forms.URLField(
        widget=forms.URLInput(attrs={'placeholder': 'Enter meeting link'}),
        required=False
    )

    class Meta:
        model = TechStack
        fields = ['name', 'description', 'date', 'time', 'meeting_link']

class DiscussionForm(forms.ModelForm):
    class Meta:
        model = Discussion
        fields = ['message']