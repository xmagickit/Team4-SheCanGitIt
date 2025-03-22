from django import forms

class MentorSearchForm(forms.Form):
    skills = forms.CharField(
        label="Enter skills (comma-separated)", 
        required=True, 
        widget=forms.TextInput(attrs={"class": "border p-2 rounded w-full"})
    )


class FeedbackForm(forms.Form):
    rating = forms.ChoiceField(choices=[(i, i) for i in range(1, 6)], label="Rating (1–5)")
    feedback = forms.CharField(widget=forms.Textarea, required=False, label="Feedback")