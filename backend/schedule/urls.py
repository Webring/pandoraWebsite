from rest_framework.routers import DefaultRouter

from schedule.views import ScheduleItemApiView, ScheduleAnnouncementApiView

schedule_router = DefaultRouter()
schedule_router.register(r'schedule', ScheduleItemApiView)
schedule_router.register(r'schedule-announcement', ScheduleAnnouncementApiView)
