from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from callback.urls import callback_form_router
from directions.urls import direction_router
from halls.urls import halls_router
from pages.urls import pages_router
from backend import settings
from pricelist.urls import pricelist_router
from schedule.urls import schedule_router
from socials.urls import socials_router
from teachers.urls import teacher_router

api_router = routers.DefaultRouter()
api_router.registry.extend(direction_router.registry)
api_router.registry.extend(teacher_router.registry)
api_router.registry.extend(pricelist_router.registry)
api_router.registry.extend(pages_router.registry)
api_router.registry.extend(halls_router.registry)
api_router.registry.extend(schedule_router.registry)
api_router.registry.extend(socials_router.registry)
api_router.registry.extend(callback_form_router.registry)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("ckeditor5/", include('django_ckeditor_5.urls')),
    path(r'api/v1/', include(api_router.urls))
]

admin.site.site_header = 'Танцевальный дом "Пандора"'
admin.site.site_title = 'Панель Администратора'

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
