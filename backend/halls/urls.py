from rest_framework.routers import DefaultRouter

from halls.views import HallApiView, HallCenterApiView

halls_router = DefaultRouter()
halls_router.register(r'hall', HallApiView)
halls_router.register(r'hall-centers', HallCenterApiView)
