from django.shortcuts import render
from rest_framework.viewsets import ReadOnlyModelViewSet

from socials.models import Social
from socials.serializers import SocialSerializer


class SocialsApiView(ReadOnlyModelViewSet):
    queryset = Social.objects.all()
    serializer_class = SocialSerializer
