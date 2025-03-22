from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.http import Http404
from .models import TechStack, StudyGroup, Discussion
from .forms import TechStackForm, DiscussionForm
from django.contrib import messages

def tech_list(request):
    tech_stacks = TechStack.objects.all()
    return render(request, 'her_buddies/tech_list.html', {'tech_stacks': tech_stacks})

def tech_discussion(request, study_group_id):
    study_group = get_object_or_404(StudyGroup, id=study_group_id)
    discussions = Discussion.objects.filter(study_group=study_group).order_by('-created_at')
    return render(request, 'her_buddies/tech_discussion.html', {
        'study_group': study_group,
        'discussions': discussions
    })

@login_required
def add_tech_stack(request):
    if request.method == "POST":
        form = TechStackForm(request.POST)
        if form.is_valid():
            tech_stack = form.save(commit=False)
            tech_stack.user = request.user
            tech_stack.save()

            # Create a StudyGroup associated with the TechStack
            StudyGroup.objects.create(
                tech_stack=tech_stack,
                description=f"Study group for {tech_stack.name}",
                date=form.cleaned_data['date'],
                time=form.cleaned_data['time'],
                meeting_link=form.cleaned_data['meeting_link']
            )
            return redirect('tech_list')
    else:
        form = TechStackForm()
    return render(request, 'her_buddies/add_tech_stack.html', {'form': form})

@login_required
def add_discussion(request, study_group_id):
    study_group = get_object_or_404(StudyGroup, id=study_group_id)
    if request.method == "POST":
        form = DiscussionForm(request.POST)
        if form.is_valid():
            discussion = form.save(commit=False)
            discussion.study_group = study_group
            discussion.user = request.user
            discussion.save()
            return redirect('tech_discussion', study_group_id=study_group.id)
        else:
            print(form.errors)  # Debugging: Print form errors if invalid
    else:
        form = DiscussionForm()
    return render(request, 'her_buddies/add_discussion.html', {'form': form, 'study_group': study_group})

def edit_discussion(request, discussion_id):
    discussion = get_object_or_404(Discussion, id=discussion_id, user=request.user)
    if request.method == "POST":
        form = DiscussionForm(request.POST, instance=discussion)
        if form.is_valid():
            form.save()
            return redirect('tech_discussion', study_group_id=discussion.study_group.id)
    else:
        form = DiscussionForm(instance=discussion)
    return render(request, 'her_buddies/edit_discussion.html', {'form': form, 'discussion': discussion})

def delete_discussion(request, discussion_id):
    discussion = get_object_or_404(Discussion, id=discussion_id, user=request.user)
    study_group_id = discussion.study_group.id
    if request.method == "POST":
        discussion.delete()
        return redirect('tech_discussion', study_group_id=study_group_id)
    return render(request, 'her_buddies/delete_discussion.html', {'discussion': discussion})