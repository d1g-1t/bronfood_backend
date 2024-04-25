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
        fields = ['id', 'name', 'choices']


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
    class Meta:
        model = Restaurant
        fields = ['id', 'photo', 'name', 'rating', 'address', 'workingTime']


class OrderedMealSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderedMeal
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderedMeal = OrderedMealSerializer()

    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        ordered_meal_data = validated_data.pop('orderedMeal')
        ordered_meal = OrderedMeal.objects.create(**ordered_meal_data)
        order = Order.objects.create(orderedMeal=ordered_meal, **validated_data)
        return order

    def update(self, instance, validated_data):
        ordered_meal_data = validated_data.pop('orderedMeal', {})
        ordered_meal = instance.orderedMeal

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        for attr, value in ordered_meal_data.items():
            setattr(ordered_meal, attr, value)

        ordered_meal.save()
        instance.save()

        return instance


class CoordinatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coordinates
        fields = '__all__'


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
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
        fields = ['restaurant', 'meals']

    def create(self, validated_data):
        meals_data = validated_data.pop('meals')
        basket = Basket.objects.create(**validated_data)
        for meal_data in meals_data:
            MealInBasket.objects.create(**meal_data)
        return basket
