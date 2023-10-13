from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'rm_code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at')

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip')

class UpdateRoomSerializer(serializers.ModelSerializer):
    rm_code = serializers.CharField(validators=[])
    # rerefrence the rm_code field because in the model, it is unique, and when we call this
    # serializer it will become invalid because the code will already exist in the Rooms db
    class Meta:
        model = Room
        fields = ('rm_code', 'guest_can_pause', 'votes_to_skip')
    