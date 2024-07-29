from rest_framework import serializers

from bronfood.core.restaurants.models import (
    Meal, Menu, Restaurant, Tag, Order, OrderedMeal,
    Coordinates, Choice, Feature, Favorites, MealInBasket, Basket
)


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


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
        fields = ['latitude', 'longitude']


class RestaurantSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()
    coordinates = CoordinatesSerializer(read_only=True)
    type = serializers.ChoiceField(choices=Restaurant.RESTAURANT_TYPES)

    class Meta:
        model = Restaurant
        fields = [
            'id', 'name', 'photo', 'address', 'isLiked',
            'coordinates', 'rating', 'workingTime', 'type'
        ]

    def get_photo(self, obj):
        request = self.context.get('request')
        if obj.photo:
            return request.build_absolute_uri(obj.photo)
        return None


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'name', 'price', 'default']


class FeatureSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True)

    class Meta:
        model = Feature
        fields = ['id', 'name', 'choices']


class MealSerializer(serializers.ModelSerializer):
    features = FeatureSerializer(many=True)

    class Meta:
        model = Meal
        fields = ['id', 'name', 'description', 'photo', 'price', 'type', 'waitingTime', 'features']

class FavoritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorites
        fields = '__all__'


class MealInBasketSerializer(serializers.ModelSerializer):
    meal = MealSerializer(read_only=True)

    class Meta:
        model = MealInBasket
        fields = ['meal', 'count']


class MenuSerializer(serializers.ModelSerializer):
    meals = MealSerializer(many=True)

    class Meta:
        model = Menu
        fields = ['id', 'meals', 'restaurant']


class BasketSerializer(serializers.ModelSerializer):
    meals = MealInBasketSerializer(many=True)

    class Meta:
        model = Basket
        fields = ['restaurant', 'meals']

    def create(self, validated_data):
        meals_data = validated_data.pop('meals')
        basket = Basket.objects.create(**validated_data)
        for meal_data in meals_data:
            MealInBasket.objects.create(basket=basket, **meal_data)
        return basket
