from rest_framework import serializers
from .models import Hall, HallCenter, Photo


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'


class HallShortSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Hall
        fields = ["id", "title", "square", "photos"]


class HallCenterSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)
    halls = HallShortSerializer(many=True, read_only=True)

    class Meta:
        model = HallCenter
        fields = '__all__'


class HallCenterShortSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)

    class Meta:
        model = HallCenter
        fields = ["id", "address", "photos"]


class HallSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)

    hall_center = HallCenterShortSerializer(read_only=True)

    class Meta:
        model = Hall
        fields = '__all__'


class HallCenterScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = HallCenter
        fields = ["id", "address"]


class HallScheduleSerializer(serializers.ModelSerializer):
    hall_center = HallCenterScheduleSerializer(read_only=True)

    class Meta:
        model = Hall
        fields = ["id", "title", "hall_center"]
