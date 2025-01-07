from django.contrib import admin

from pricelist.models import Price, PriceCategory

class PriceInlineAdmin(admin.TabularInline):
    model = Price
@admin.register(Price)
class PriceAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "price"]
    ordering = ["category", "price"]

@admin.register(PriceCategory)
class PriceCategoryAdmin(admin.ModelAdmin):
    inlines = (PriceInlineAdmin, )
    list_display = ('title', 'description')
