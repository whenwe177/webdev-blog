from django.forms import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from django.views.decorators.csrf import csrf_exempt
from django.template.loader import render_to_string

from .models import BlogPost, Comment
from .forms import BlogForm

import json

# Create your views here.
def loadJson(reqBody):
    body = reqBody.decode("utf-8")
    response = json.loads(body)

    return response


def homePage(req):
    context = {}

    top3Posts = BlogPost.objects.all()[:3]
    context["posts"] = top3Posts

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
    comments = Comment.objects.filter(post = post)
    context["post"] = post
    context["comments"] = comments
    context["user"] = req.user

    return render(req, "viewBlog.html", context)

@login_required(login_url="/account/login/")
@csrf_exempt
def deleteComment(req, id):
    if req.method == "POST":
        comment = Comment.objects.get(id = id)
        comment.delete()
        return HttpResponse(status=200)

@login_required(login_url="/account/login/")
@csrf_exempt
def addComment(req, postId):
    if req.method == "POST":
        post = BlogPost.objects.get(id = postId)

        response = loadJson(req.body)
        content = response["content"]

        comment = Comment.objects.create(content = content, commenter = req.user, post = post)
        comment.save()

        allComments = Comment.objects.all()

        commentList = render_to_string(
            "comments.html", {
                "comments" : allComments,
                "user" : req.user,
            }
        )

        return JsonResponse({
            "commentList" : commentList,
        })

@login_required(login_url="/account/login")
@csrf_exempt
def editComment(req, id):
    if req.method == "POST":
        comment = Comment.objects.get(id = id)

        response = loadJson(req.body)
        content = response["content"]

        comment.content = content
        comment.save()

        commentJson = model_to_dict(comment)
        return JsonResponse({
            "comment" : commentJson,
        })


