import random


NAMES = ('Михаил', 'Ольга', 'Анна', 'Сергей', 'Елена')
COUNT_MOCK_DATA = 5


def random_name(names):
    '''Возвращает случайное имя из списка.'''
    return random.choice(names)


def random_phone_number():
    "Возвращает случайный номер телефона."
    return f'7{random.randint(1000000000, 9999999999)}'
