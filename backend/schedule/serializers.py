from rest_framework import serializers

from directions.serializers import DirectionScheduleSerializer
from halls.serializers import HallScheduleSerializer
from teachers.serializers import TeacherScheduleSerializer
from .models import ScheduleItem, ScheduleAnnouncement


class ScheduleItemSerializer(serializers.ModelSerializer):
    start_time = serializers.TimeField(format="%H:%M")
    end_time = serializers.TimeField(format="%H:%M")
    hall = HallScheduleSerializer(read_only=True)
    direction = DirectionScheduleSerializer()
    teachers = TeacherScheduleSerializer(read_only=True, many=True)


    class Meta:
        model = ScheduleItem
        fields = ["id", "start_time", "end_time", "hall", "direction", "teachers", "remark"]


class ScheduleAnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduleAnnouncement
        fields = ["id", "text"]
