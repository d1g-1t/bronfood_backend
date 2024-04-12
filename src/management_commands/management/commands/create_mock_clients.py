from django.core.management.base import BaseCommand
from rest_framework.exceptions import ValidationError
from ._utils import COUNT_MOCK_DATA, NAMES, random_name, random_phone_number
from bronfood.core.client.models import Client


def create_clients(count=COUNT_MOCK_DATA, role=Client.Role.CLIENT):
    """Создаёт несколько моковых клиентов в базе"""

    if role not in Client.Role.values:
        raise ValidationError('Такой роли не существует.')
    if count < 1 or count > 100:
        raise ValidationError(
            'Можно создать от 1 до 100 клиентов за один раз.'
        )

    objs = [
        Client(
            role=role,
            username=random_name(NAMES),
            password='password',
            phone=random_phone_number(),
            fullname='{} {}'.format(random_name(NAMES), random_phone_number()),
            status=Client.Status.CONFIRMED
        )
        for i in range(count)
    ]
    Client.objects.bulk_create(objs)
    print(f'Создано {str(count)} клиентов с ролью {role}')


class Command(BaseCommand):
    help = 'Создаёт моковых клиентов.'

    def handle(self, *args, **options):
        try:
            create_clients(options.get('count'), options.get('role'))
        except Exception as e:
            return str(e)

    def add_arguments(self, parser):
        parser.add_argument(
            '--count',
            type=int,
            default=COUNT_MOCK_DATA,
            help='Добавляет заданное колличество клиентов в базу.'
        )
        parser.add_argument(
            '--role',
            type=str,
            default=Client.Role.CLIENT,
            help='Указывает роль клиентов которых нужно добавить.'
        )
