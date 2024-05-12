from django.contrib.auth import get_user_model
from django.test import TestCase

from bronfood.core.restaurant_owner.models import RestaurantOwner
from bronfood.core.useraccount.models import UserAccount

User = get_user_model()


class RestaurantOwnerTests(TestCase):

    def test_create_user(self):
        RestaurantOwner.objects.create_user(
            username="Pluto",
            phone="+7(777)5553344")

        owner = User.objects.get(username="Pluto")

        self.assertEqual(owner.username, "Pluto")
        self.assertEqual(owner.phone, "+7(777)5553344")
        self.assertEqual(owner.role, UserAccount.Role.OWNER)
