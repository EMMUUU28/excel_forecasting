from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomUserSerializer, CustomTokenObtainPairSerializer
from .models import Role

User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        data = request.data
        if not data.get("role"):
            return Response({"error": "Role is required"}, status=status.HTTP_400_BAD_REQUEST)

        role, created = Role.objects.get_or_create(name=data["role"])
        user = User.objects.create_user(
            username=data["username"],
            email=data["email"],
            password=data["password"],
            role=role
        )
        serializer = CustomUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
