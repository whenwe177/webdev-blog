from django.shortcuts import render

# Create your views here.
def homePage(req):
    context = {}

    

    return render(req, "home.html", context)