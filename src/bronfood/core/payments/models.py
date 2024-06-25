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

    order_id = models.CharField(   # TODO: сейчас на ревью генератор уникальных кодов заказа для Order.
                                   # После мержа связать с этим полем id заказа.
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
