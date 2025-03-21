from .models import CodeSnippet

def recent_code_snippets(request):
    """
    Context processor to add recent public code snippets to all templates
    """
    if request.user.is_authenticated:
        recent_snippets = CodeSnippet.objects.filter(
            is_public=True
        ).order_by('-created_at')[:3]
    else:
        recent_snippets = []
        
    return {
        'recent_code_snippets': recent_snippets
    }