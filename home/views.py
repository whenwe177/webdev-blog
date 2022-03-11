from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required

from .models import BlogPost, Comment
from .forms import BlogForm

# Create your views here.

def homePage(req):
    context = {}

    top5Posts = BlogPost.objects.all()[:5]
    context["posts"] = top5Posts

    return render(req, "home.html", context)

@staff_member_required(login_url="/account/login?next=/create-blog/")
def createBlogPost(req):
    context = {}
    form = BlogForm()

    context["form"] = form

    if req.method == "POST":
        form = BlogForm(req.POST)

        if form.is_valid():
            form.save()

        return redirect("/")


    return render(req, "createBlog.html", context)

def viewBlogPost(req, id):
    context = {}
    
    post = BlogPost.objects.get(id = id)
    context["post"] = post

    return render(req, "viewBlog.html", context)

