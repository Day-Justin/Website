from django.db import models
import string
import random
# Create your models here.
# Remember to create a serializer and add to views


def gen_unique_code(): # unique room code generator that checks all room objects 
    x = 6

    while True:
        gen = ''.join(random.choices(string.ascii_uppercase, k=x))
        if Room.objects.filter(rm_code=gen).count() == 0:
            break

    return gen


class Room(models.Model):
    rm_code = models.CharField(max_length=8, default=gen_unique_code, unique=True) # unigue room code
    host = models.CharField(max_length=50, unique=True) # host based on session id
    guest_can_pause = models.BooleanField(null=False, default=False) # whether or not the guest will be able to pause music
    votes_to_skip = models.IntegerField(null=False, default=1) # amount of guest votes to skip
    created_at = models.DateTimeField(auto_now_add=True) # room creation date time
    current_song = models.CharField(max_length=50, null=True)

    