from rest_framework import serializers
from .models import Page


class PageShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ["id", "title", "image"]



class PageDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ["id", "title", "image", "content"]
