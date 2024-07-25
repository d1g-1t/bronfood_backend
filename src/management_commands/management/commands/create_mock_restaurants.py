import os
import logging
from django.conf import settings
from django.core.management.base import BaseCommand
from django.db import transaction
from bronfood.core.restaurants.models import Restaurant, Coordinates

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

IMAGE_PATH = '/src/management_commands/images/meals/'

MOCK_RESTAURANTS_DATA = [
    {
        "name": "Jahu",
        "photo": "restaurant3.png",
        "rating": 4.8,
        "address": "ул. Березовая 21",
        "latitude": 43.243523441782585,
        "longitude": 76.91477137561034,
        "workingTime": "09:00 - 22.00",
        "type": "cafe",
        "meals": [
            {
                "name": "Куриный донер",
                "description": "Лаваш, курица, соленый огурец, помидор, капуста, лук, морковь, зелень.",
                "photo": "meal1.png",
                "price": 1350,
                "type": "food",
                "waitingTime": 10,
                "features": [
                    {
                        "name": "Размер",
                        "choices": [
                            {"name": "Маленький", "price": 1050, "default": False},
                            {"name": "Средний", "price": 1350, "default": True},
                            {"name": "Большой", "price": 1650, "default": False},
                        ],
                    },
                    {
                        "name": "Соусы",
                        "choices": [
                            {"name": "Кетчуп", "price": 100, "default": True},
                            {"name": "Чесночный", "price": 200, "default": False},
                            {"name": "Сырный", "price": 300, "default": False},
                        ],
                    },
                    {
                        "name": "Овощи",
                        "choices": [
                            {"name": "Томаты", "price": 100, "default": True},
                            {"name": "Огурцы", "price": 200, "default": False},
                            {"name": "Оливки", "price": 300, "default": False},
                            {"name": "Маринованные огурцы", "price": 400, "default": False},
                            {"name": "Зелень", "price": 500, "default": False},
                        ],
                    },
                ],
            },
            {
                "name": "Говяжий донер",
                "description": "Говядина",
                "photo": "meal1.png",
                "price": 1350,
                "type": "food",
                "waitingTime": 10,
                "features": [],
            },
            {
                "name": "Американо",
                "description": "Кофе",
                "photo": "drink1.png",
                "price": 200,
                "type": "drink",
                "waitingTime": 5,
                "features": [],
            },
            {
                "name": "Пуддинг",
                "description": "Пуддинг",
                "photo": "dessert1.png",
                "price": 350,
                "type": "dessert",
                "waitingTime": 5,
                "features": [],
            },
        ],
    },
    {
        "name": "Boom",
        "photo": "restaurant2.png",
        "rating": 4.9,
        "address": "ул. Морозова 56/1",
        "latitude": 43.239536903817104,
        "longitude": 76.9312294101257,
        "workingTime": "10:00 - 23.00",
        "type": "cafe",
        "meals": [
            {
                "name": "Куриный донер",
                "description": "Лаваш, курица, соленый огурец, помидор, капуста, лук, морковь, зелень.",
                "photo": "meal1.png",
                "price": 1350,
                "type": "food",
                "waitingTime": 10,
                "features": [
                    {
                        "name": "Размер",
                        "choices": [
                            {"name": "Маленький", "price": 1050, "default": False},
                            {"name": "Средний", "price": 1350, "default": True},
                            {"name": "Большой", "price": 1650, "default": False},
                        ],
                    },
                    {
                        "name": "Соусы",
                        "choices": [
                            {"name": "Кетчуп", "price": 100, "default": True},
                            {"name": "Чесночный", "price": 200, "default": False},
                            {"name": "Сырный", "price": 300, "default": False},
                        ],
                    },
                ],
            },
        ],
    },
    {
        "name": "Moon",
        "photo": "restaurant4.png",
        "rating": 5.0,
        "address": "пр. Мира 36",
        "latitude": 43.23818774310171,
        "longitude": 76.9074543094177,
        "workingTime": "12:00 - 01.00",
        "type": "cafe",
        "meals": [
            {
                "name": "Американо",
                "description": "Кофе",
                "photo": "drink1.png",
                "price": 200,
                "type": "drink",
                "waitingTime": 5,
                "features": [],
            },
        ],
    },
    {
        "name": "Ready",
        "photo": "restaurant1.png",
        "rating": 4.8,
        "address": "ул. Березовая 21",
        "latitude": 43.23531675447601,
        "longitude": 76.9158273458476,
        "workingTime": "09:00 - 22.00",
        "type": "fastFood",
        "meals": [
            {
                "name": "Пуддинг",
                "description": "Пуддинг",
                "photo": "dessert1.png",
                "price": 350,
                "type": "dessert",
                "waitingTime": 5,
                "features": [],
            },
        ],
    },
    {
        "name": "Bar",
        "photo": "restaurant3.png",
        "rating": 4.7,
        "address": "пр. Мира 36",
        "latitude": 43.243019,
        "longitude": 76.909664,
        "workingTime": "12:00 - 01.00",
        "type": "cafeBar",
        "meals": [
            {
                "name": "Капуччино",
                "description": "Кофе",
                "photo": "drink1.png",
                "price": 1,
                "type": "drink",
                "waitingTime": 5,
                "features": [],
            },
        ],
    },
]


def create_mock_restaurants():
    """Создает моковые рестораны в базе данных."""
    for restaurant_data in MOCK_RESTAURANTS_DATA:
        copied_image_path = IMAGE_PATH + restaurant_data["photo"]
        image_basename = os.path.basename(copied_image_path)
        image_url = os.path.join(settings.MEDIA_URL, 'pics', image_basename)

        coordinates = Coordinates.objects.create(
            latitude=restaurant_data["latitude"],
            longitude=restaurant_data["longitude"]
        )
        Restaurant.objects.create(
            name=restaurant_data["name"],
            photo=image_url,
            rating=restaurant_data["rating"],
            address=restaurant_data["address"],
            coordinates=coordinates,
            workingTime=restaurant_data["workingTime"],
            type=restaurant_data["type"],
        )


class Command(BaseCommand):
    help = 'Создает моковые рестораны в базе данных.'

    def handle(self, *args, **options):
        try:
            with transaction.atomic():
                create_mock_restaurants()
                logging.info('Создано 5 моковых ресторана.')
        except Exception as e:
            logging.error(f'Ошибка при создании моковых ресторанов: {e}')
