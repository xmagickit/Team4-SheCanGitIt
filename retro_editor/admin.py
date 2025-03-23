from django.contrib import admin
from .models import CodeSnippet, TechPioneerTip

@admin.register(CodeSnippet)
class CodeSnippetAdmin(admin.ModelAdmin):
    list_display = ('title', 'language', 'user', 'created_at', 'is_public')
    list_filter = ('language', 'is_public', 'created_at')
    search_fields = ('title', 'code_content', 'user__username')
    date_hierarchy = 'created_at'

@admin.register(TechPioneerTip)
class TechPioneerTipAdmin(admin.ModelAdmin):
    list_display = ('pioneer', 'language', 'tip_content')
    list_filter = ('language', 'pioneer')
    search_fields = ('pioneer', 'tip_content')