from django.urls import path
from .views import *

urlpatterns = [
    path("", homePage, name="home"),
    path("create-blog/", createBlogPost, name="createBlog"),
    path("blog/<int:id>/", viewBlogPost, name="viewBlog"),
]