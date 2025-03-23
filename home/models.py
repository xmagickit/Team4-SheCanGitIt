from django.db import models

class WomenInTech(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField()
    image_url = models.URLField("Image URL", max_length=500, blank=True)

    def __str__(self):
        return self.name
    
class FeaturedWoman(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField()
    image = models.ImageField(upload_to='featured_women/', blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    date_featured = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = "Featured Woman"
        verbose_name_plural = "Featured Women"
        ordering = ['-date_featured']

    def __str__(self):
        return self.name