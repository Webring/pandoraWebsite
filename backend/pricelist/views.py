from rest_framework import viewsets

from pricelist.models import PriceCategory
from pricelist.serializers import PriceCategorySerializer


class PriceCategoryApiView(viewsets.ReadOnlyModelViewSet):
    queryset = PriceCategory.objects.all()
    serializer_class = PriceCategorySerializer
