from django.contrib import admin

from .models import Social


@admin.register(Social)
class SocialAdmin(admin.ModelAdmin):
    list_display = ('title', 'internal_link', 'direct_link', 'icon')
