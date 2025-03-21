from django import forms

class MentorSearchForm(forms.Form):
    skills = forms.CharField(
        label="Enter skills (comma-separated)", 
        required=True, 
        widget=forms.TextInput(attrs={"class": "border p-2 rounded w-full"})
    )
