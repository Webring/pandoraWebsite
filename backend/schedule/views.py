from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from schedule.models import ScheduleItem, ScheduleAnnouncement
from schedule.serializers import ScheduleItemSerializer, ScheduleAnnouncementSerializer


class ScheduleItemApiView(viewsets.ReadOnlyModelViewSet):
    queryset = ScheduleItem.objects.all()
    serializer_class = ScheduleItemSerializer

    def list(self, request):
        schedules = ScheduleItem.objects.prefetch_related('teachers').order_by('weekday', 'start_time')

        grouped_schedules = {}
        for schedule in schedules:
            if schedule.weekday not in grouped_schedules:
                grouped_schedules[schedule.weekday] = []
            grouped_schedules[schedule.weekday].append(schedule)

        result = {}
        for weekday, items in grouped_schedules.items():
            result[weekday] = self.serializer_class(items, many=True).data

        return Response(result)


class ScheduleAnnouncementApiView(viewsets.ReadOnlyModelViewSet):
    queryset = ScheduleAnnouncement.objects.active()
    serializer_class = ScheduleAnnouncementSerializer
