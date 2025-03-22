from django.db import models

class WomenInTech(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField()
    image_url = models.URLField("Image URL", max_length=500, blank=True)

    def __str__(self):
        return self.name