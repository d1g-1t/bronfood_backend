from django.test import TestCase

from bronfood.core.restaurants.models import (
    Coordinates, Meal, Menu, Restaurant, Tag,
)


class TaskModelTest(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.tag = Tag.objects.create(name='test')
        cls.place = Coordinates.objects.create(
            latitude=11.111111,
            longitude=22.222222
        )
        cls.meal_1 = Meal.objects.create(
            id='1',
            name='doner',
            description='best doner',
            photo='test',
            price=100,
            type='food',
            waitingTime=99
        )
        menu = Menu.objects.create(
            category='fastfood'
        )
        menu.meals.set([cls.meal_1])
        cls.restaurant = Restaurant.objects.create(
            id=1,
            name='Turckish',
            photo='test',
            address='Palace',
            coordinates=cls.place,
            rating=100,
            workingTime='10:00-22:00',
            type='cafe'
        )
        cls.restaurant.meals.set([cls.meal_1])

    def test_title_label(self):
        """verbose_name поля title совпадает с ожидаемым."""
        tags = TaskModelTest.tag
        meals = TaskModelTest.meal_1
        restaurants = TaskModelTest.restaurant
        # Получаем из свойства класса Task значение verbose_name для title
        verboset = tags._meta.get_field('name').verbose_name
        self.assertEqual(verboset, 'Название')
        verbosed = meals._meta.get_field('name').verbose_name
        self.assertEqual(verbosed, 'Название блюда')
        verboser = restaurants._meta.get_field('address').verbose_name
        self.assertEqual(verboser, 'Адрес')