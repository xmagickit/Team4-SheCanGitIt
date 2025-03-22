from django.shortcuts import render

# Create your views here.
def profile_view(request, username=None):
    return render(request, 'user_profile/profile.html', {
        'username': username or request.user.username  # Optional: pass username
    })
    
def edit_profile(request):
    return render(request, 'user_profile/edit_profile.html')

def profile_list(request):
    return render(request, 'user_profile/profile_list.html')

