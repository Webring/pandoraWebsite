from rest_framework.routers import DefaultRouter

from pricelist.views import PriceCategoryApiView

pricelist_router = DefaultRouter()
pricelist_router.register(r'pricelist', PriceCategoryApiView)
