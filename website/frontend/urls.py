from django.urls import path
from .views import index

# don't forget to import and reference to custom views

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('join', index),
    path('create', index),
    path('rooms/<str:roomCode>', index)
]