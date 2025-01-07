from django.contrib import admin

from halls.models import Hall, HallCenter, Photo

@admin.register(Hall)
class HallAdmin(admin.ModelAdmin):
    pass

@admin.register(HallCenter)
class HallCenterAdmin(admin.ModelAdmin):
    pass

@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    pass
