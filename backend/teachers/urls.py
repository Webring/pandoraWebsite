from django.urls import include, path
from rest_framework.routers import DefaultRouter

from teachers.views import TeacherApiView

teacher_router = DefaultRouter()
teacher_router.register(r'teachers', TeacherApiView)
