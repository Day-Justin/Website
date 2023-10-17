from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
import base64
import json
from rest_framework import status
from rest_framework.response import Response
import string
from requests import Request, post, put, get
import os
from dotenv import load_dotenv

load_dotenv()
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET =  os.getenv("CLIENT_SECRET")
BASE_URL = os.getenv("BASE_URL")


def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None


def update_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token):
    tokens = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in) 

    if tokens: 
        # spotfiy gives a time range of when tokens will expire, doing this converts the expires_in into a set datetime

        tokens.access_token = access_token
        tokens.token_type = token_type
        tokens.expires_in = expires_in
        tokens.refresh_token = refresh_token
        tokens.save(update_fields=[
            'access_token',
            'token_type',
            'expires_in',
            'refresh_token',
        ])

    else:
        tokens = SpotifyToken(user=session_id, access_token=access_token, token_type=token_type, expires_in=expires_in, refresh_token=refresh_token)
        tokens.save()


def is_auth(session_id):
    tokens = get_user_tokens(session_id)

    if tokens:
        expiration = tokens.expires_in

        if expiration <= timezone.now(): # need to refresh token if current time is greater than expiration
            refresh_token(session_id)
        
        return True

    return False


def refresh_token(session_id):
    refresh_token = get_user_tokens(session_id).refresh_token

    auth_string = CLIENT_ID + ":" + CLIENT_SECRET
    auth_bytes = auth_string.encode("utf-8")
    auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")
    url = "https://accounts.spotify.com/api/token"
    headers ={
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {"grant_type": "refresh_token", 'refresh_token': refresh_token, "client_id": CLIENT_ID}

    result = post(
        url,
        headers=headers,
        data=data
    )

    response = json.loads(result.content)

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')
    
    update_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token)


def spotify_api_call(session_id, endpoint, query=False, post_=False, put_=False):
    tokens = get_user_tokens(session_id)
    headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + tokens.access_token
        }
    response = None

    if post_:
        response = post(BASE_URL + endpoint, headers=headers) 
    
    elif put_:
        response = put(BASE_URL + endpoint, headers=headers)
        print(json.loads(response.content)) 
    
    elif query:
        response = get(BASE_URL + endpoint + query, {}, headers=headers)

    else:
        response = get(BASE_URL + endpoint, {}, headers=headers)
    
    try:
        json_response = json.loads(response.content)
        return json_response
    except:
        return {'Error': 'Bad Request'}
    

def pause_song(session_id):
    return spotify_api_call(session_id, "me/player/pause", put_=True)
    

def play_song(session_id):
    return spotify_api_call(session_id, "me/player/play", put_=True)


def skip_song(session_id):
    return spotify_api_call(session_id, "me/player/next", post_=True)