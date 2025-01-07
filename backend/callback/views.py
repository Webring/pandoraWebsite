from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Callback
from .serializers import CallbackFormSerializer


class CallbackViewSet(viewsets.ModelViewSet):
    queryset = Callback.objects.all()
    serializer_class = CallbackFormSerializer

    # Переопределяем методы, чтобы разрешить только POST запросы
    def list(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)  # Запрещаем GET

    def retrieve(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)  # Запрещаем GET

    def update(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)  # Запрещаем PUT

    def partial_update(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)  # Запрещаем PATCH

    def destroy(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)  # Запрещаем DELETE

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response({"success": True}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)