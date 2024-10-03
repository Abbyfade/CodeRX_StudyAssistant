# views.py
from django.http import HttpResponse
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
from django.middleware.csrf import get_token

User = get_user_model()

class RegisterUserView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginUserView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)

        if user and user.is_active:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            csrf_token = get_token(request)
            response_data = {
                "message": "Login successful",
                "token": token.key
            }
            
            # Set CSRF token as a cookie (Optional, if needed)
            response = Response(response_data, status=status.HTTP_200_OK)
            return response
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    

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
