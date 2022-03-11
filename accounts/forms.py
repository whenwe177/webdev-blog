from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class RegisterForm(UserCreationForm):
    first_name = forms.CharField(max_length = 100, required = True, widget=forms.TextInput(attrs={}))
    last_name = forms.CharField(max_length = 100, required = True, widget=forms.TextInput(attrs={}))

    def __init__(self, *args, **kwargs):
        super(RegisterForm, self).__init__(*args, **kwargs)

        for fieldname in ["username", "password1", "password2"]:
            self.fields[fieldname].help_text = None

    class Meta:
        model = User
        fields = ("username", "first_name", "last_name", "password1", "password2")