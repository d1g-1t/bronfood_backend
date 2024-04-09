from django.db import models
from django.db.models import UniqueConstraint
from bronfood.core.client.models import Client


class Coordinates(models.Model):
    '''Координаты заведения для Yandex Maps.'''
    latitude = models.DecimalField(
        'Широта',
        max_digits=8,
        decimal_places=6
    )
    longitude = models.DecimalField(
        'Долгота',
        max_digits=9,
        decimal_places=6
    )


class Tag(models.Model):
    '''Класс тегов к заведениям.'''
    name = models.CharField(
        'Название',
        max_length=255,
        unique=True
    )

    def __str__(self):
        return self.name


class Complement(models.Model):
    '''Дополнение к основному блюду.'''
    name = models.CharField(
        'Дополнение',
        max_length=200
    )
    price = models.PositiveIntegerField('Цена')

    class Meta:
        verbose_name = 'Дополнение'
        verbose_name_plural = 'Дополнения'

    def __str__(self):
        return self.name


class Dish(models.Model):
    '''Блюдо.'''
    class SizeOfDish(models.TextChoices):
        SMALL = "S"
        MEDIUM = "M"
        LARGE = "L"
    name = models.CharField(
        'Название блюда',
        max_length=255
    )
    description = models.CharField(
        'Описание',
        max_length=255,
        null=True
    )
    price = models.PositiveIntegerField(
        'Цена'
    )
    coocking_time = models.PositiveIntegerField(
        'Время приготовления',
        default=1
    )
    image = models.ImageField(
        'Изображение блюда',
        upload_to='pics'
    )
    size = models.CharField(
        'Размер блюда',
        max_length=2,
        choices=SizeOfDish.choices,
        default=SizeOfDish.LARGE
    )
    complement = models.ManyToManyField(
        Complement,
        verbose_name='Дополнения'
    )

    def __str__(self):
        return self.name


class Menu(models.Model):
    '''Модель меню.'''
    dishes = models.ManyToManyField(
        Dish,
        verbose_name='Блюда'
    )
    category = models.CharField(
        'Категория меню',
        max_length=255
    )


class Restaurant(models.Model):
    '''Модель ресторана.'''
    class TypeOfShop(models.TextChoices):
        FASTFOOD = "FF"
        CAFE = "CA"
        COFFESHOP = "CS"
    name = models.CharField(
        'Название',
        max_length=255
    )
    address = models.CharField(
        'Адрес',
        max_length=255
    )
    coordinates = models.ForeignKey(
        Coordinates,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        verbose_name='Яндекс карты координаты'
    )
    description = models.TextField(
        'Описание'
    )
    image = models.ImageField(
        'Изображение ресторана',
        upload_to='pics'
    )
    begin_time = models.CharField(
        'Начало работы',
        max_length=255
    )
    end_time = models.CharField(
        'Конец работы',
        max_length=255
    )
    menu = models.ForeignKey(
        Menu,
        verbose_name='Меню',
        on_delete=models.CASCADE
    )
    tags = models.ForeignKey(
        Tag,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name='Теги'
    )
    type_of_shop = models.CharField(
        max_length=2,
        choices=TypeOfShop.choices,
        default=TypeOfShop.FASTFOOD,
    )
    rating = models.PositiveIntegerField(
        'Рейтинг заведения',
        default=0
    )

    def __str__(self):
        return self.name


class Favorite(models.Model):
    '''Избранные блюда.'''
    user = models.ForeignKey(
        Client,
        related_name='favorites',
        on_delete=models.CASCADE,
        verbose_name='Клиент'
    )
    shop = models.ForeignKey(
        Restaurant,
        related_name='favorites',
        on_delete=models.CASCADE,
        verbose_name='Блюдо'
    )

    class Meta:
        verbose_name = 'Избранное заведение'
        verbose_name_plural = 'Избранные заведения'
        constraints = [
            UniqueConstraint(
                fields=['user', 'shop'],
                name="unique_shop"
            )
        ]

        def __str__(self):
            return f"{self.user.name} likes {self.shop.name}"


class ShopingCart(models.Model):
    '''Список блюд.'''
    user = models.ForeignKey(
        Client,
        related_name='shopingcarts',
        on_delete=models.CASCADE,
        verbose_name='Клиент'
    )
    dish = models.ManyToManyField(
        Dish,
        related_name="shopingcarts",
        verbose_name='Блюдо'
    )

    class Meta:
        verbose_name = 'Блюдо в корзине'
        verbose_name_plural = 'Блюда в корзине'

    def __str__(self):
        return f"{self.user}'s {self.dish}"


class Order(models.Model):
    '''Заказ'''
    user = models.ForeignKey(
        Client,
        related_name='order',
        on_delete=models.CASCADE,
        verbose_name='Клиент'
    )
    wait = models.PositiveIntegerField(
        'Время ожидания',
        default=1
    )
    number = models.CharField(
        'кодовый номер заказа',
        default='NHG347',
        max_length=10
    )
    meals = models.ManyToManyField(
        Dish,
        related_name="order",
        verbose_name='Блюда в заказе'
    )
    price = models.PositiveIntegerField('Цена заказа')
    is_cancel_available = models.BooleanField(
        default=False,
        verbose_name='Возможность отмены заказа'
    )
