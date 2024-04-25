from rest_framework import serializers

from bronfood.core.restaurants.models import (
    Meal, Menu, Restaurant, Tag, Order, OrderedMeal,
    Coordinates, Choice, Feature, Favorite, MealInBasket, Basket
)


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = '__all__'


class MealSerializer(serializers.ModelSerializer):
    features = FeatureSerializer(many=True, read_only=True)

    class Meta:
        model = Meal
        fields = ['photo', 'name', 'price', 'features']


class MenuSerializer(serializers.ModelSerializer):
    meals = MealSerializer(many=True, read_only=True)

    class Meta:
        model = Menu
        fields = '__all__'

    @staticmethod
    def get_menu_pic(obj):
        last_meal = obj.meals.last()

        if last_meal:
            return last_meal.pic


class RestaurantSerializer(serializers.ModelSerializer):
    menu = MenuSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Restaurant
        fields = '__all__'


class OrderedMealSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderedMeal
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderedMeals = OrderedMealSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'


class CoordinatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coordinates
        fields = '__all__'


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = '__all__'


class FeatureSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True)

    class Meta:
        model = Feature
        fields = '__all__'


class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = '__all__'


class MealInBasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealInBasket
        fields = '__all__'


class BasketSerializer(serializers.ModelSerializer):
    meals = MealInBasketSerializer(many=True)

    class Meta:
        model = Basket
        fields = '__all__'
