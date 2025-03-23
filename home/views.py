from django.shortcuts import render
from .models import WomenInTech, FeaturedWoman

def home_view(request):
    return render(request, 'home/home.html')

def home(request):
    women = WomenInTech.objects.all()
    featured_women = FeaturedWoman.objects.all()[:2]

    return render(request, 'home/home.html', {
        'women': women,
        'featured_women': featured_women,
    })
