from rest_framework.routers import DefaultRouter

from .views import SocialsApiView

socials_router = DefaultRouter()
socials_router.register(r'socials', SocialsApiView)
