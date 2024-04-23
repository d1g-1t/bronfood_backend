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


class Choice(models.Model):
    '''Вариант выбора для дополнения.'''
    id = models.PositiveIntegerField(
        'Идентификатор',
        primary_key=True
    )
    name = models.CharField(
        'Название варианта',
        max_length=200
    )
    price = models.DecimalField(
        'Цена',
        max_digits=5,
        decimal_places=2
    )
    default = models.BooleanField(
        'По умолчанию',
        default=False
    )

    class Meta:
        verbose_name = 'Вариант дополнения'
        verbose_name_plural = 'Варианты дополнения'

    def __str__(self):
        return self.name


class Feature(models.Model):
    '''Дополнение к блюду.'''
    name = models.CharField(
        'Название дополнения',
        max_length=200
    )
    choices = models.ManyToManyField(
        'Choice',
        verbose_name='Варианты выбора'
    )

    class Meta:
        verbose_name = 'Дополнение'
        verbose_name_plural = 'Дополнения'

    def __str__(self):
        return self.name


class Meal(models.Model):
    '''Блюдо.'''
    MEAL_TYPES = [
        ('food', 'Еда'),
        ('drink', 'Напиток'),
        ('dessert', 'Десерт'),
    ]
    id = models.PositiveIntegerField(
        'Идентификатор',
        primary_key=True
    )
    name = models.CharField(
        'Название блюда',
        max_length=255
    )
    photo = models.URLField(
        'URL фотографии'
    )
    price = models.DecimalField(
        'Цена',
        max_digits=5,
        decimal_places=2
    )
    type = models.CharField(
        'Тип блюда',
        max_length=7,
        choices=MEAL_TYPES
    )
    cookingTime = models.PositiveIntegerField(
        'Время приготовления'
    )
    features = models.ManyToManyField(
        Feature,
        verbose_name='Дополнения',
        blank=True
    )

    class Meta:
        verbose_name = 'Блюдо'
        verbose_name_plural = 'Блюда'

    def __str__(self):
        return self.name


class Menu(models.Model):
    '''Модель меню.'''
    meals = models.ManyToManyField(
        Meal,
        verbose_name='Блюда'
    )
    category = models.CharField(
        'Категория меню',
        max_length=255
    )


class Restaurant(models.Model):
    '''Модель ресторана.'''
    RESTAURANT_TYPES = [
        ('fastFood', 'Фастфуд'),
        ('cafe', 'Кафе'),
        ('cafeBar', 'Кафе-бар'),
    ]
    id = models.PositiveIntegerField(
        'Идентификатор',
        primary_key=True
    )
    name = models.CharField(
        'Название',
        max_length=255
    )
    photo = models.URLField(
        'URL фотографии'
    )
    address = models.CharField(
        'Адрес',
        max_length=255
    )
    coordinates = models.OneToOneField(
        Coordinates,
        on_delete=models.CASCADE,
        verbose_name='Координаты'
    )
    rating = models.DecimalField(
        'Рейтинг',
        max_digits=2,
        decimal_places=1
    )
    workingTime = models.CharField(
        'Время работы',
        max_length=255
    )
    meals = models.ManyToManyField(
        Meal,
        verbose_name='Меню'
    )
    type = models.CharField(
        'Тип ресторана',
        max_length=8,
        choices=RESTAURANT_TYPES
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
        verbose_name='Ресторан'
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


class MealInBasket(models.Model):
    '''Блюдо в корзине.'''
    meal = models.ForeignKey(
        Meal,
        on_delete=models.CASCADE
    )
    count = models.PositiveIntegerField(
        'Количество блюд'
    )

    def __str__(self):
        return f"{self.meal} - {self.count}"


class Basket(models.Model):
    '''Корзина.'''
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name='Ресторан'
    )
    meals = models.ManyToManyField(
        MealInBasket,
        related_name='baskets',
        verbose_name='Блюда в корзине'
    )

    class Meta:
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзины'

    def __str__(self):
        return f"Корзина {self.id} ресторана {self.restaurant}"


class Order(models.Model):
    '''Заказ'''
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False,
        verbose_name='Идентификатор заказа'
    )
    number = models.CharField(
        'кодовый номер заказа',
        default='NHG347',
        max_length=10
    )
    meals = models.ManyToManyField(
        Meal,
        related_name="order",
        verbose_name='Блюда в заказе'
    )
    price = models.PositiveIntegerField(
        'Цена заказа'
    )
    time = models.TimeField(
        'Время',
        auto_now_add=True
    )
    is_cancel_available = models.BooleanField(
        default=False,
        verbose_name='Возможность отмены заказа'
    )
