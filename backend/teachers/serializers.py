from rest_framework import serializers
from .models import Teacher, Direction


class DirectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direction
        fields = ["id", "name"]


class TeacherShortSerializer(serializers.ModelSerializer):
    directions = serializers.SerializerMethodField()

    class Meta:
        model = Teacher
        fields = ["id", "name", "directions", "avatar"]

    def get_directions(self, obj):
        return obj.directions.values_list('name', flat=True)


class TeacherScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ["id", "name"]


class TeacherDetailSerializer(serializers.ModelSerializer):
    directions = DirectionSerializer(many=True, read_only=True)

    class Meta:
        model = Teacher
        fields = ["id", "name", "directions", "avatar", "description"]
