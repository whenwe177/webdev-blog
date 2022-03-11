from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    dateCreated = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    commenter = models.ForeignKey(User, on_delete = models.CASCADE)
    post = models.ForeignKey(BlogPost, on_delete = models.CASCADE)
    dateCreated = models.DateTimeField(auto_now_add = True)

    content = models.TextField(max_length = 600)

    