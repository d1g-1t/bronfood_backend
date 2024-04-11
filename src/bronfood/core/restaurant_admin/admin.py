from django.contrib import admin

from .models import RestaurantAdmin


@admin.register(RestaurantAdmin)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'user', 'restaurant_owner')
