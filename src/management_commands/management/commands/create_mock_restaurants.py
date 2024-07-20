import logging
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
    },
    {
        "name": "Bar",
        "photo": "restaurant5.png",
        "rating": 4.7,
        "address": "пр. Мира 36",
        "latitude": 43.243019,
        "longitude": 76.909664,
        "workingTime": "12:00 - 01.00",
        "type": "cafeBar",
    },
]


def create_mock_restaurants():
    """Создает моковые рестораны в базе данных."""
    for restaurant_data in MOCK_RESTAURANTS_DATA:
        photo_path = IMAGE_PATH + restaurant_data["photo"]
        coordinates = Coordinates.objects.create(
            latitude=restaurant_data["latitude"],
            longitude=restaurant_data["longitude"]
        )
        Restaurant.objects.create(
            name=restaurant_data["name"],
            photo=photo_path,
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
