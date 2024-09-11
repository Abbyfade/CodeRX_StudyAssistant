# views.py
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, UserDetailSerializer, UserListSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import redirect
from rest_framework.authtoken.models import Token

User = get_user_model()

class RegisterUserView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        header = {"Access-Control-Allow-Origin":"*"}
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED, headers=header)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, headers=header)

class LoginUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        header = {"Access-Control-Allow-Origin":"*"}
        # username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        # user = authenticate(username=username, password=password)
        user = authenticate(email=email, password=password)

        if user and user.is_active:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({"message": "Login successful", "token": token.key}, status=status.HTTP_200_OK, headers=header)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST, headers=header)


class LogoutUserView(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserDetailSerializer(user)
        return Response(serializer.data)

class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer
