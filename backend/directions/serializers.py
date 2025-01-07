from rest_framework import serializers
from .models import Direction, DirectionTag


class DirectionTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = DirectionTag
        fields = "__all__"


class DirectionShortSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()

    class Meta:
        model = Direction
        fields = ["id", "name", "image", "tags"]

    def get_tags(self, obj):
        return obj.tags.values_list("title", flat=True)


class DirectionDetailSerializer(serializers.ModelSerializer):
    tags = DirectionTagSerializer(many=True)

    class Meta:
        model = Direction
        fields = ["id", "name", "image", "tags", "description"]


class DirectionScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direction
        fields = ["id", "name"]
