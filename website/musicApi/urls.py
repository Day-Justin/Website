from django.urls import path
from .views import RoomView
# don't forget to include in urls.py in main folder


urlpatterns = [
    path('home', RoomView.as_view()),
]
