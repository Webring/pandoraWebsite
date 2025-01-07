from django.contrib import admin
from .models import ScheduleItem, ScheduleAnnouncement

@admin.register(ScheduleAnnouncement)
class ScheduleAnnouncementAdmin(admin.ModelAdmin):
    list_display = ('text', 'start_display', 'end_display', "is_active")
    ordering = ("-end_display", "start_display")

    @admin.display(boolean=True)
    def is_active(self, obj):
        return obj.is_active

@admin.register(ScheduleItem)
class ScheduleItemAnnouncementAdmin(admin.ModelAdmin):
    list_display = ["hall", "direction", "weekday", "start_time", "end_time", "remark"]