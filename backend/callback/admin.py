from django.contrib import admin

from callback.models import Callback


@admin.register(Callback)
class CallbackAdmin(admin.ModelAdmin):
    pass