from django import forms
from .models import BlogPost

class BlogForm(forms.ModelForm):
    class Meta:
        model = BlogPost
        fields = ("title", "content")
        widgets = {
            "title" : forms.TextInput(attrs={
                "max_length" : 200,
                "required" : True,
                }),

            "content" : forms.Textarea(attrs = {
                "max_length" : 600,
                "required" : True,
            }),
                
        }
