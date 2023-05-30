from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerialiser
from .models import Todo
# Create your views here.

class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerialiser
    queryset = Todo.objects.all()
    
