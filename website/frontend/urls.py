from django.urls import path
from .views import index

# don't forget to import and reference to custom views

urlpatterns = [
    path('', index),
    path('join', index),
    path('create', index),
    path('rooms/<str:roomCode>', index)
]