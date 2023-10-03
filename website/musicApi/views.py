from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room
# Create your views here.
# remember to makeigrations and migrate when editing views


def main(request):
    return(HttpResponse("<h1>Hello</h1>"))


class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer