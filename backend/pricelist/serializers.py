from rest_framework import serializers
from .models import Price, PriceCategory


class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Price
        fields = "__all__"


class PriceCategorySerializer(serializers.ModelSerializer):
    prices = serializers.SerializerMethodField()

    class Meta:
        model = PriceCategory
        fields = ["id", "title", "description", "prices"]

    def get_prices(self, obj):
        ordered_prices = obj.prices.order_by("price")
        return PriceSerializer(ordered_prices, many=True).data
