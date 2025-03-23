from django import forms
from .models import CodeSnippet

class CodeSnippetForm(forms.ModelForm):
    class Meta:
        model = CodeSnippet
        fields = ['title', 'language', 'code_content', 'is_public']
        widgets = {
            'code_content': forms.Textarea(attrs={'class': 'code-editor'}),
            'title': forms.TextInput(attrs={'placeholder': 'Snippet Title', 'class': 'retro-input'}),
        }