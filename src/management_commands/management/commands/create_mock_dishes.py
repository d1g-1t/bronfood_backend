from django.core.management.base import BaseCommand

from ._variables import COUNT_MOCK_DATA
from ._utils import create_dishes


class Command(BaseCommand):
    help = 'Создаёт моковых Блюд.'

    def handle(self, *args, **options):
        try:
            create_dishes(options.get('count'))
        except Exception as e:
            return str(e)

    def add_arguments(self, parser):
        parser.add_argument(
            '--count',
            type=int,
            default=COUNT_MOCK_DATA,
            help='Добавляет заданное колличество блюд в базу.'
        )
