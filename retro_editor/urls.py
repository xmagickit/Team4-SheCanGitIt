from django.urls import path
from . import views

app_name = 'retro_editor'

urlpatterns = [
    path('', views.editor_home, name='editor_home'),
    path('editor/', views.editor, name='new_editor'),
    path('editor/<int:snippet_id>/', views.editor, name='editor'),
    path('my-snippets/', views.my_snippets, name='my_snippets'),
    path('api/tip/', views.get_random_tip, name='get_random_tip'),
]