from django.db import models
from django.db.models import UniqueConstraint

from bronfood.core.client.models import Client
from bronfood.core.restaurants.models import Restaurant, Order


class Bill(models.Model):
    '''Модель счета на оплату заказа.'''
    STATUS_CHOICES = [
        (0, 'pending'),
        (1, 'waiting for confirmation'),
        (2, 'completed'),
        (-1, 'failed'),
    ]
# TODO: сейчас на ревью генератор уникальных кодов заказа для Order.
# После мержа связать с этим полем id заказа.
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        verbose_name='Заказ',
        null=True,
        blank=True
    )
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        verbose_name='Клиент'
    )
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        verbose_name='Ресторан'
    )
    status = models.SmallIntegerField(
        'Статус платежа',
        choices=STATUS_CHOICES,
        default=0
    )
    total_amount = models.DecimalField(
        'Общая сумма',
        max_digits=10,
        decimal_places=2
    )
    payment_date = models.DateTimeField(
        'Дата платежа',
        auto_now_add=True
    )

    class Meta:
        verbose_name = 'Счет'
        verbose_name_plural = 'Счета'
        constraints = [
            UniqueConstraint(
                fields=['order_id', 'client', 'restaurant'], name='unique_bill'
            )
        ]

    def __str__(self):
        return f"Счет {self.id} на сумму {self.total_amount}"


class Card(models.Model):
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name='cards',
        verbose_name='Клиент'
    )
    card_id = models.CharField(
        'ID банковской карты',
        max_length=255
    )
    account_id = models.CharField(
        'ID аккаунта',
        max_length=255
    )
    masked_pan = models.CharField(
        'Замаскированный номер карты',
        max_length=16
    )
    name = models.CharField(
        'Имя держателя карты',
        max_length=255
    )
    expire = models.DateField(
        'Срок действия карты'
    )

    class Meta:
        verbose_name = 'Карта'
        verbose_name_plural = 'Карты'


class Payment(models.Model):
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name='payments',
        verbose_name='Клиент'
    )
    payment_id = models.CharField(
        'ID платежа',
        max_length=255
    )
    amount = models.DecimalField(
        'Сумма платежа',
        max_digits=10,
        decimal_places=2
    )
    status = models.CharField(
        'Статус платежа',
        max_length=100
    )
    created_at = models.DateTimeField(
        'Дата создания',
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        'Дата обновления',
        auto_now=True)

    class Meta:
        verbose_name = 'Платеж'
        verbose_name_plural = 'Платежи'

    def __str__(self):
        return f"Payment {self.payment_id} - {self.status}"
