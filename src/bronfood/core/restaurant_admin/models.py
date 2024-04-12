from django.contrib.auth.models import AbstractBaseUser
from django.db import models

from bronfood.core.useraccount.models import (
    UserAccount
)
from bronfood.core.restaurant_owner.models import (
    RestaurantOwner
)
from bronfood.core.restaurants.models import (
    Restaurant
)


class RestaurantAdmin(AbstractBaseUser):
    """
    Restaurant administrator model 'RestaurantAdmin'.
    """
    username = models.CharField(
        unique=True,
        max_length=40
    )
    user = models.OneToOneField(
        UserAccount,
        on_delete=models.CASCADE,
        related_name='restaurant_admin',
        blank=True
    )
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name='restaurant_admins'
    )
    restaurant_owner = models.ForeignKey(
        RestaurantOwner,
        on_delete=models.CASCADE,
        related_name='restaurant_admins'
    )
    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username
