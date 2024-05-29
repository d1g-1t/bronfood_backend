from django.db import models
from bronfood.core.useraccount.models import UserAccount


class RestaurantAdmin(models.Model):
    login = models.CharField(
        'Логин',
        max_length=255,
        unique=True,
    )
    password = models.CharField(
        'Пароль',
        max_length=255
    )
    restaurant_owner = models.ForeignKey(
        UserAccount,
        on_delete=models.CASCADE,
        related_name='restaurant_owner'
    )
    restaurant = models.ForeignKey(
        'restaurants.Restaurant',
        on_delete=models.CASCADE
    )
