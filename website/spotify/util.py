from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from requests import post, put, get
import os
from dotenv import load_dotenv

load_dotenv()
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET =  os.getenv("CLIENT_SECRET")


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
        print(tokens)
        # spotfiy gives a time range of when tokens will expire, doing this converts the expires_in into a set datetime

        tokens.access_token = access_token
        tokens.token_type = token_type
        tokens.expires_in = expires_in
        tokens.refresh_token = refresh_token
        tokens.save(update_fields=[
            'access_token',
            'token_type'
            'expires_in',
            'refresh_token',
        ])

    else:
        print(session_id, access_token, expires_in, token_type, refresh_token)
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

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')
    refresh_token = response.get('refresh_token')
    
    update_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token)
