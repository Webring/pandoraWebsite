from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response

from directions.models import Direction
from directions.serializers import DirectionShortSerializer, DirectionDetailSerializer


class DirectionApiView(viewsets.ReadOnlyModelViewSet):
    queryset = Direction.objects.all()
    list_serializer_class = DirectionShortSerializer
    retrieve_serializer_class = DirectionDetailSerializer

    def list(self, request):
        queryset = Direction.objects.all()
        serializer = self.list_serializer_class(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        item = get_object_or_404(self.queryset, pk=pk)
        serializer = self.retrieve_serializer_class(item, context={'request': request})
        return Response(serializer.data)
