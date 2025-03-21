from django.contrib import admin
from .models import Mentor, MentorshipRequest

@admin.register(Mentor)
class MentorAdmin(admin.ModelAdmin):
    list_display = ('user', 'skills', 'experience_level')
    search_fields = ('user__username', 'skills', 'experience_level')

@admin.register(MentorshipRequest)
class MentorshipRequestAdmin(admin.ModelAdmin):
    list_display = ('mentee', 'mentor', 'status')
    list_filter = ('status',)
    search_fields = ('mentee__username', 'mentor__user__username')
