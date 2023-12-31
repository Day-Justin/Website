from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer, UpdateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

# Create your views here.
# don't forget to put url for these endpoints

def main(request):
    return(HttpResponse("<h1>Hello</h1>"))


class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key): # session check
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                self.request.session['rm_code'] = room.rm_code
                return Response(RoomSerializer(room).data, status=status.HTTP_202_ACCEPTED)

            else:
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()
                self.request.session['rm_code'] = room.rm_code
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
    
class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup)
        if code != None:
            room = Room.objects.filter(rm_code=code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            
            return Response({'Room Not Found'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'Bad Request'}, status=status.HTTP_400_BAD_REQUEST)
    
class JoinRoom(APIView):
    lookup = 'code'

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get(self.lookup)
        if code != None:
            room = Room.objects.filter(rm_code=code)
            if len(room) > 0:
                room = room[0]
                self.request.session['rm_code'] = code
                return Response({'Room Joined'}, status=status.HTTP_200_OK)
            
            return Response({'Bad Request: Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)
            
        return Response({'Bad Request: Invalid Post Data'}, status=status.HTTP_400_BAD_REQUEST)

class UserInRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        data = {
            'rm_code': self.request.session.get("rm_code") 
        }
        
        return (JsonResponse(data, status=status.HTTP_200_OK))

class LeaveRoom(APIView):
    def post(self, request, format=None):
        if 'rm_code' in self.request.session:
            self.request.session.pop('rm_code')
            host_id = self.request.session.session_key
            room = Room.objects.filter(host=host_id)

            if len(room) > 0: # delete room if host is the one that left
                room = room[0]
                room.delete()
        
        return Response({"Sucess"}, status=status.HTTP_200_OK)
    
class UpdateRoom(APIView):
    serializer_class = UpdateRoomSerializer

    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            rm_code = serializer.data.get('rm_code')
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')

            queryset = Room.objects.filter(rm_code=rm_code)
            if not queryset.exists():
                return Response({'Room not Found'}, status=status.HTTP_404_NOT_FOUND)
            
            room = queryset[0]
            user_id = self.request.session.session_key
            if room.host != user_id:
                return Response({'Not Host'}, status=status.HTTP_403_FORBIDDEN)
            
            room.guest_can_pause = guest_can_pause
            room.votes_to_skip = votes_to_skip
            room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

        return Response({'Bad Request Data'}, status=status.HTTP_400_BAD_REQUEST)