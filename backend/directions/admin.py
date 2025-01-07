from django.contrib import admin

from directions.models import Direction, DirectionTag


@admin.register(Direction)
class DirectionAdmin(admin.ModelAdmin):
    pass


@admin.register(DirectionTag)
class DirectionTagAdmin(admin.ModelAdmin):
    list_display = ["title", "description"]
