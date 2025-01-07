from rest_framework.routers import DefaultRouter

from directions.views import DirectionApiView

direction_router = DefaultRouter()
direction_router.register(r'directions', DirectionApiView)
