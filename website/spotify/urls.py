from django.urls import path
from .views import AuthURL, spotify_callback, IsAuth
# don't forget to import and reference to custom views

urlpatterns = [
    path('get-auth', AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is-auth', IsAuth.as_view()),
]