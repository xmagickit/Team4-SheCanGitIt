from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'experience_level', 'is_mentor', 'seeking_buddy')
    list_filter = ('experience_level', 'is_mentor', 'seeking_buddy')
    search_fields = ('user__username', 'user__email', 'skills')