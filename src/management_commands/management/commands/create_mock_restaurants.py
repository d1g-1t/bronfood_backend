import logging
import random

from django.core.management.base import BaseCommand

from bronfood.core.restaurants.models import (
    Coordinates, Dish, Menu, Restaurant, Tag
)
from ._variables import (
    COUNT_MOCK_DATA, MENU_CATEGORIES, RESTAURANT_TAGS, RESTAURANT_NAMES,
    RESTAURANT_ADDRESSES, RESTAURANT_DESCRIPTIONS, BEGIN_TIMES, END_TIMES,
    PATH_TO_RESTAURANTS_IMAGE_DIR, PATH_TO_MEDIA_PICS_FOLDER
)
from ._utils import (
    random_string, get_random_image, create_dishes, count_validate
)


def create_menu(dishes, restaurants_count=COUNT_MOCK_DATA):
    """Создаёт несколько моковых меню в базе"""
    menu = [
        Menu(
            category=random_string(MENU_CATEGORIES)
        )
        for i in range(int(restaurants_count))
    ]
    menu_in_bd = Menu.objects.bulk_create(menu)
    for menu in menu_in_bd:
        menu.dishes.add(*dishes)
    logging.info(f'Создано {str(restaurants_count)} меню.')
    return menu_in_bd


def create_restaurants(count=COUNT_MOCK_DATA, dish_count=COUNT_MOCK_DATA):
    """Создаёт несколько моковых ресторанов в базе"""

    count_validate(count)

    tag, created = Tag.objects.get_or_create(name=random_string(RESTAURANT_TAGS))
    place, created = Coordinates.objects.get_or_create(
        latitude=11.111111,
        longitude=22.222222
    )

    if dish_count > Dish.objects.all().count():
        dishes = create_dishes(dish_count)
    else:
        dishes = Dish.objects.all()[:dish_count]

    menu = create_menu(dishes, count)

    restaurants = [
        Restaurant(
            name=random_string(RESTAURANT_NAMES),
            address=random_string(RESTAURANT_ADDRESSES),
            coordinates=place,
            description=random_string(RESTAURANT_DESCRIPTIONS),
            image=get_random_image(
                PATH_TO_RESTAURANTS_IMAGE_DIR, PATH_TO_MEDIA_PICS_FOLDER
            ),
            begin_time=random_string(BEGIN_TIMES),
            end_time=random_string(END_TIMES),
            type_of_shop=random.choice(list(Restaurant.TypeOfShop)),
            tags=tag,
            rating=random.randint(50, 100),
            menu=menu[i]
        )
        for i in range(count)
    ]
    restaurants_in_bd = Restaurant.objects.bulk_create(restaurants)
    logging.info(f'Создано {str(count)} ресторанов.')
    return restaurants_in_bd


class Command(BaseCommand):
    help = 'Создаёт моковых Ресторанов.'

    def handle(self, *args, **options):
        try:
            create_restaurants(options.get('count'), options.get('dish_count'))
        except Exception as e:
            return logging.error(e)

    def add_arguments(self, parser):
        parser.add_argument(
            '--count',
            type=int,
            default=COUNT_MOCK_DATA,
            help='Добавляет заданное колличество ресторанов в базу.'
        )
        parser.add_argument(
            '--dish_count',
            type=int,
            default=COUNT_MOCK_DATA,
            help='Колличество блюд в меню для каждого ресторана.'
        )
