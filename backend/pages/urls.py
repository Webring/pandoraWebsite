from rest_framework.routers import DefaultRouter

from pages.views import PagesApiView

pages_router = DefaultRouter()
pages_router.register(r'pages', PagesApiView)
