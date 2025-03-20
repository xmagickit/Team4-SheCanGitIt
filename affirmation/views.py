from django.shortcuts import render

def affirmation(request):
    return render(request, 'affirmation/affirmation.html')
