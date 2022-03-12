from django.urls import path
from .views import *

urlpatterns = [
    path("", homePage, name="home"),
    path("create-blog/", createBlogPost, name="createBlog"),
    path("blog/<int:id>/", viewBlogPost, name="viewBlog"),
    path("delete-comment/<int:id>/", deleteComment, name="deleteComment"),
    path("add-comment/<int:postId>/", addComment, name="addComment"),
    path("edit-comment/<int:id>/", editComment, name="editComment"),
]