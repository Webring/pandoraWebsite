from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response

from teachers.models import Teacher
from teachers.serializers import TeacherShortSerializer, TeacherDetailSerializer

class TeacherApiView(viewsets.ReadOnlyModelViewSet):
    queryset = Teacher.objects.all()
    list_serializer_class = TeacherShortSerializer
    retrieve_serializer_class = TeacherDetailSerializer

    def list(self, request):
        queryset = Teacher.objects.all()
        serializer = self.list_serializer_class(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Teacher.objects.all()
        item = get_object_or_404(queryset, pk=pk)
        serializer = self.retrieve_serializer_class(item, context={'request': request})
        return Response(serializer.data)
