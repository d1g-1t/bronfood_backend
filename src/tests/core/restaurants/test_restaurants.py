from django.test import TestCase

from bronfood.core.restaurants.models import (
    Coordinates, Dish, Menu, Restaurant, Tag,
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
        cls.dish_1 = Dish.objects.create(
            name='doner',
            description='best doner',
            coocking_time=99,
            price=100,
            image='test',
            size="L"
        )
        menu = Menu.objects.create(
            category='fastfood'
        )
        menu.dishes.set([cls.dish_1])
        cls.restaurant = Restaurant.objects.create(
            name='Turckish',
            address='Palace',
            coordinates=cls.place,
            description='The best',
            image='test',
            begin_time='10:00',
            end_time='22:00',
            type_of_shop='tt',
            tags=cls.tag,
            rating=100,
            menu=menu
        )
        # cls.restaurant.menu.set([menu])

    def test_title_label(self):
        """verbose_name поля title совпадает с ожидаемым."""
        tags = TaskModelTest.tag
        dishes = TaskModelTest.dish_1
        restaurants = TaskModelTest.restaurant
        # Получаем из свойства класса Task значение verbose_name для title
        verboset = tags._meta.get_field('name').verbose_name
        self.assertEqual(verboset, 'Название')
        verbosed = dishes._meta.get_field('name').verbose_name
        self.assertEqual(verbosed, 'Название блюда')
        verboser = restaurants._meta.get_field('address').verbose_name
        self.assertEqual(verboser, 'Адрес')
