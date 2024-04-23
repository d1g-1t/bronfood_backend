from django.contrib import admin  # noqa
from .models import Restaurant, Menu, Meal, Tag


admin.site.register(Restaurant)
admin.site.register(Menu)
admin.site.register(Meal)
admin.site.register(Tag)
