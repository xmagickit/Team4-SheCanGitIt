from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages
from .forms import UserUpdateForm, ProfileUpdateForm
from .models import Profile

@login_required
def profile_view(request, username=None):
    """
    View for displaying a user's profile.
    If username is provided, show that user's profile.
    If not, show the current user's profile.
    """
    if username:
        profile_user = get_object_or_404(User, username=username)
    else:
        profile_user = request.user
    
    return render(request, 'user_profile/profile.html', {
        'profile_user': profile_user,
    })

@login_required
def edit_profile(request):
    """
    View for editing a user's profile.
    """
    # Initialize forms regardless of method
    user_form = UserUpdateForm(instance=request.user)
    profile_form = ProfileUpdateForm(instance=request.user.profile)
    
    if request.method == 'POST':
        user_form = UserUpdateForm(request.POST, instance=request.user)
        profile_form = ProfileUpdateForm(
            request.POST, 
            request.FILES, 
            instance=request.user.profile
        )
        
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            messages.success(request, 'Your profile has been updated!')
            return redirect('user_profile')
        else:
            # Add debug messages
            print("User form errors:", user_form.errors)
            print("Profile form errors:", profile_form.errors)
            messages.error(request, 'Error updating profile. Please check the form.')
    
    # Profile image choices
    predefined_images = [
        {'id': 1, 'name': 'Avatar 1', 'url': '/static/images/profiles/avatar1.png'},
        {'id': 2, 'name': 'Avatar 2', 'url': '/static/images/profiles/avatar2.png'},
        {'id': 3, 'name': 'Avatar 3', 'url': '/static/images/profiles/avatar3.png'},
        {'id': 4, 'name': 'Avatar 4', 'url': '/static/images/profiles/avatar4.png'},
        {'id': 5, 'name': 'Avatar 5', 'url': '/static/images/profiles/avatar5.png'},
        {'id': 6, 'name': 'Avatar 6', 'url': '/static/images/profiles/avatar6.png'},
    ]
    
    context = {
        'user_form': user_form,
        'profile_form': profile_form,
        'predefined_images': predefined_images,
    }
    return render(request, 'user_profile/edit_profile.html', context)

def profile_list(request):
    """
    View for displaying a list of user profiles.
    Filter by mentor or buddy status if requested.
    Search by username if provided.
    """
    profiles = Profile.objects.all()
    
    # Apply filters
    if request.GET.get('mentor') == 'true':
        profiles = profiles.filter(is_mentor=True)
    elif request.GET.get('buddy') == 'true':
        profiles = profiles.filter(seeking_buddy=True)
    
    # Simple username search
    search_query = request.GET.get('search', '').strip()
    if search_query:
        profiles = profiles.filter(user__username__icontains=search_query)
    
    return render(request, 'user_profile/profile_list.html', {
        'profiles': profiles,
    })
@login_required
def select_profile_image(request):
    """Handle selection of a predefined profile image"""
    if request.method == 'POST':
        image_id = request.POST.get('image_id')
        if image_id:
            # Get the profile
            profile = request.user.profile
            # Save the avatar choice
            profile.avatar_choice = image_id
            profile.save()
            messages.success(request, 'Profile avatar updated!')
        return redirect('user_profile')
    
    return redirect('user_profile')