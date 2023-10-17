from django.urls import path
from .views import index

# don't forget to import and reference to custom views

app_name = 'frontend'

urlpatterns = [
    path('', index),
    path('music/', index, name=''),
    path('music/join', index),
    path('music/create', index),
    path('music/rooms/<str:roomCode>', index)
]