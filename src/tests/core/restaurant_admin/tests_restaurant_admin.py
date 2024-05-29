from django.test import TestCase
from bronfood.core.useraccount.models import UserAccount
from bronfood.core.restaurants.models import Restaurant
from bronfood.core.restaurant_admin.models import RestaurantAdmin


class RestaurantAdminModelTest(TestCase):
    def setUp(self):
        self.user = UserAccount.objects.create(
            username='test_user'
        )
        self.restaurant = Restaurant.objects.create(
            name='test_restaurant'
        )

    def test_create_restaurant_admin(self):
        login = 'test_login'
        password = 'test_password'
        restaurant_admin = RestaurantAdmin.objects.create(
            login=login,
            password=password,
            restaurant_owner=self.user,
            restaurant=self.restaurant
        )

        self.assertEqual(restaurant_admin.login, login)
        self.assertEqual(restaurant_admin.password, password)
        self.assertEqual(restaurant_admin.restaurant_owner, self.user)
        self.assertEqual(restaurant_admin.restaurant, self.restaurant)
