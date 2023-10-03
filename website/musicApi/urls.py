from django.urls import path
from .views import RoomView, CreateRoomView
# don't forget to include in urls.py in main folder


urlpatterns = [
    path('home', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
]
