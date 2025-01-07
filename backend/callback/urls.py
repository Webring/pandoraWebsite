from rest_framework.routers import DefaultRouter

from .views import CallbackViewSet

callback_form_router = DefaultRouter()
callback_form_router.register(r'callback-form', CallbackViewSet)
