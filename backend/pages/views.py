from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response

from pages.models import Page
from pages.serializers import PageShortSerializer, PageDetailSerializer


class PagesApiView(viewsets.ReadOnlyModelViewSet):
    queryset = Page.objects.all()
    list_serializer_class = PageShortSerializer
    retrieve_serializer_class = PageDetailSerializer

    def list(self, request):
        queryset = Page.objects.filter(show_in_list=True, disabled=False).all()
        serializer = self.list_serializer_class(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        item = get_object_or_404(self.queryset, pk=pk, disabled=False)
        serializer = self.retrieve_serializer_class(item, context={'request': request})
        return Response(serializer.data)
