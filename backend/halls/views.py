from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response

from halls.models import Hall, HallCenter
from halls.serializers import HallSerializer,HallCenterSerializer

class HallApiView(viewsets.ReadOnlyModelViewSet):
    queryset = Hall.objects.all()
    list_serializer_class = HallSerializer
    retrieve_serializer_class = HallSerializer

    def list(self, request):
        queryset = Hall.objects.all()
        serializer = self.list_serializer_class(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        item = get_object_or_404(self.queryset, pk=pk)
        serializer = self.retrieve_serializer_class(item, context={'request': request})
        return Response(serializer.data)

class HallCenterApiView(viewsets.ReadOnlyModelViewSet):
    queryset = HallCenter.objects.all()
    list_serializer_class = HallCenterSerializer
    retrieve_serializer_class = HallCenterSerializer

    def list(self, request):
        queryset = HallCenter.objects.all()
        serializer = self.list_serializer_class(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        item = get_object_or_404(self.queryset, pk=pk)
        serializer = self.retrieve_serializer_class(item, context={'request': request})
        return Response(serializer.data)
