import os
import random
import shutil

from rest_framework.exceptions import ValidationError

from bronfood.core.restaurants.models import Dish
from ._variables import (
    COUNT_MOCK_DATA, DISH_NAMES, DISH_DESCRIPTIONS, PATH_TO_DISHES_IMAGE_DIR,
    PATH_TO_MEDIA_PICS_FOLDER
)


def random_string(names):
    '''Возвращает случайную строку из списка.'''
    return random.choice(names)


def random_phone_number():
    "Возвращает случайный номер телефона."
    return f'7{random.randint(1000000000, 9999999999)}'


def get_random_image(folder_path, target_folder):
    """Получаем путь для папки из которой нужно выбрать случайное изображение
    и путь до папки куда нужно его копировать.
    Если папки в которую нужно копировать не существует, создаём её.
    Возвращаем путь скопированного изображения.
    """
    images = os.listdir(folder_path)
    random_image = random.choice(images)
    random_image_path = os.path.join(folder_path, random_image)
    try:
        os.makedirs(target_folder)
    except FileExistsError:
        pass
    return shutil.copy(random_image_path, target_folder)


def create_dishes(count=COUNT_MOCK_DATA):
    """Создаёт несколько моковых блюд в базе"""
    count_validate(count)

    dishes = [
        Dish(
            name=random_string(DISH_NAMES),
            description=random_string(DISH_DESCRIPTIONS),
            coocking_time=random.randint(1, 120),
            price=random.randint(10, 500),
            image=get_random_image(
                PATH_TO_DISHES_IMAGE_DIR, PATH_TO_MEDIA_PICS_FOLDER
            ),
            size=random.choice(list(Dish.SizeOfDish))
        )
        for i in range(count)
    ]
    dishes_in_bd = Dish.objects.bulk_create(dishes)
    print(f'Создано {str(count)} блюд.')
    return dishes_in_bd


def count_validate(count):
    """Проверяет входящее значение."""
    if count < 1 or count > 100:
        raise ValidationError(
            'Можно создать от 1 до 100 объектов за один раз.'
        )
