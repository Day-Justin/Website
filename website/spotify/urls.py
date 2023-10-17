from django.urls import path
from .views import *
# don't forget to import and reference to custom views

urlpatterns = [
    path('get-auth', AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is-auth', IsAuth.as_view()),
    path('current-song', CurrentSong.as_view()),
    path('pause-song', PauseSong.as_view()),
    path('play-song', PlaySong.as_view()),
    path('skip-song', SkipSong.as_view()),
]