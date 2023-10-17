from django.shortcuts import render, redirect
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
import base64
import os
import json
import random
import string
from dotenv import load_dotenv
from .util import *
from musicApi.models import Room

load_dotenv()
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET =  os.getenv("CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")

state = ''.join(random.choices(string.ascii_uppercase, k=16))

# Create your views here.

class AuthURL(APIView):
    def get(self, request, format=None):
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'state': state,
            'client_id': CLIENT_ID,
        }).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)
    

def spotify_callback(request, format=None):
    code = request.GET.get('code')
    state_r = request.Get.get('state')
    error = request.GET.get('error')

    if state_r != state:
        return Response({"Error": "statemismatch"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    if not error is None:
        return Response({'error' : response.get('error_description')}, status=status.HTTP_400_BAD_REQUEST)

    auth_string = CLIENT_ID + ":" + CLIENT_SECRET
    auth_bytes = auth_string.encode("utf-8")
    auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")
    url = "https://accounts.spotify.com/api/token"
    headers ={
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {"grant_type": "client_credentials", 'code': code, "redirect_uri": REDIRECT_URI}

    result = post(
        url,
        headers=headers,
        data=data
    )

    response = json.loads(result.content)

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')
    refresh_token = response.get('refresh_token')
    error = response.get('error')

    if not request.session.exists(request.session.session_key):
        request.session.create()

    update_create_user_tokens(request.session.session_key, access_token, token_type, expires_in, refresh_token)

    return redirect('frontend:')


class IsAuth(APIView):
    def get(self, request, format=None):
        isAuth = is_auth(self.request.session.session_key)

        return Response({'status': isAuth}, status=status.HTTP_200_OK)
    

class CurrentSong(APIView):
    def get(self, request, format=None):
        room_code = self.request.session.get('rm_code')
        room = Room.objects.filter(rm_code=room_code)
        if room.exists():
            room = room[0]
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        host = room.host
        endpoint = "me/player/currently-playing"
        response = spotify_api_call(host, endpoint)

        if 'error' in response or 'item' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        item = response.get('item')
        duration = item.get('duration_ms')
        progress =response.get('progress_ms')
        album_cover = item.get('album').get('images')[0].get('url')
        is_playing = response.get('is_playing')
        song_id = item.get('id')

        artist_string = ""

        for i, artist in enumerate(item.get('artists')):
            if i > 0:
                artist_string += ", "
            name = artist.get('name')
            artist_string += name

        song = {
            'title': item.get('name'),
            'artist': artist_string,
            'duration': duration,
            'time': progress,
            'image_url': album_cover,
            'is_playing': is_playing,
            'votes': 0,
            'id': song_id
        }

        return Response(song, status=status.HTTP_200_OK)

