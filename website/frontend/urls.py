from django.urls import path
from .views import index

# don't forget to import and reference to custom views

urlpatterns = [
    path('', index)
]