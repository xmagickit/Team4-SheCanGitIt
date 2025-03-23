from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import CodeSnippet, TechPioneerTip, CodeSample
from .forms import CodeSnippetForm
import random

def editor_home(request):
    """Landing page for the code editor"""
    public_snippets = CodeSnippet.objects.filter(is_public=True).order_by('-created_at')[:5]
    return render(request, 'retro_editor/index.html', {'public_snippets': public_snippets})

@login_required
def editor(request, snippet_id=None):
    """Main editor view for creating/editing snippets"""
    # Get random tip
    tips = TechPioneerTip.objects.all()
    random_tip = random.choice(tips) if tips.exists() else None
    
    if snippet_id:
        snippet = get_object_or_404(CodeSnippet, id=snippet_id)
        # Check if user owns the snippet or if it's public
        if snippet.user != request.user and not snippet.is_public:
            return redirect('editor_home')
    else:
        snippet = None
        
    if request.method == 'POST':
        if snippet and snippet.user == request.user:
            form = CodeSnippetForm(request.POST, instance=snippet)
        else:
            form = CodeSnippetForm(request.POST)
            
        if form.is_valid():
            new_snippet = form.save(commit=False)
            new_snippet.user = request.user
            new_snippet.save()
            return redirect('editor', snippet_id=new_snippet.id)
    else:
        form = CodeSnippetForm(instance=snippet) if snippet else CodeSnippetForm()
        
    return render(request, 'retro_editor/editor.html', {
        'form': form, 
        'snippet': snippet,
        'random_tip': random_tip
    })

@login_required
def my_snippets(request):
    """View for listing user's saved snippets"""
    snippets = CodeSnippet.objects.filter(user=request.user).order_by('-last_modified')
    return render(request, 'retro_editor/my_snippets.html', {'snippets': snippets})

def get_random_tip(request):
    """API endpoint for retrieving random tips"""
    language = request.GET.get('language', '')
    if language:
        tips = TechPioneerTip.objects.filter(language__in=[language, ''])
    else:
        tips = TechPioneerTip.objects.all()
        
    if tips.exists():
        random_tip = random.choice(tips)
        return JsonResponse({
            'pioneer': random_tip.pioneer,
            'content': random_tip.tip_content
        })
    return JsonResponse({'error': 'No tips available'}, status=404)
  
def load_sample(request, sample_id):
    sample = get_object_or_404(CodeSample, id=sample_id)
    form = CodeSnippetForm(initial={
        'title': f"My version of {sample.title}",
        'language': sample.language,
        'code_content': sample.code_content
    })
    
    # Get a random tip appropriate for this language
    tips = TechPioneerTip.objects.filter(language__in=[sample.language, ''])
    random_tip = random.choice(tips) if tips.exists() else None
    
    return render(request, 'retro_editor/editor.html', {
        'form': form,
        'sample': sample,
        'random_tip': random_tip
    })

def sample_library(request):
    samples = CodeSample.objects.all().order_by('difficulty', 'title')
    return render(request, 'retro_editor/sample_library.html', {'samples': samples})