from django.urls import path
from .views import *

urlpatterns = [
    path("signup/", signUp, name="signUp"),
    
]