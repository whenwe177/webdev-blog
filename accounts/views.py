from django.shortcuts import render, redirect

from accounts.forms import RegisterForm

# Create your views here.
def signUp(req):
    context = {}
    form = RegisterForm()

    context["form"] = form

    if req.method == "POST":
        form = RegisterForm(req.POST)
        if form.is_valid():
            form.save()       
            return redirect("/account/login")
        else:
            print(form.errors)
            form = RegisterForm(req.POST)

    return render(req, "signUp.html", context)
