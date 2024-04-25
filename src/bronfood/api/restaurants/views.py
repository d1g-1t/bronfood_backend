from rest_framework import viewsets, serializers
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status

from bronfood.core.restaurants.models import (
    Meal,
    Menu,
    Restaurant,
    Tag,
    Order,
    OrderedMeal,
    Coordinates,
    Choice,
    Feature,
    Favorite,
    MealInBasket,
    Basket
)

from .serializers import (
    MealSerializer,
    MenuSerializer, 
    RestaurantSerializer, 
    TagSerializer,
    OrderSerializer,
    OrderedMealSerializer,
    CoordinatesSerializer,
    ChoiceSerializer,
    FavoriteSerializer,
    MealInBasketSerializer,
    BasketSerializer,
    FeatureSerializer
)


class CoordinatesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Coordinates.objects.all()
    serializer_class = CoordinatesSerializer


class ChoiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer


class FeatureViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer


class FavoriteViewSet(viewsets.ModelViewSet):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer


class MealInBasketViewSet(viewsets.ModelViewSet):
    queryset = MealInBasket.objects.all()
    serializer_class = MealInBasketSerializer


class BasketViewSet(viewsets.ModelViewSet):
    queryset = Basket.objects.all()
    serializer_class = BasketSerializer


class RestaurantViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer


class MenuViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class MealViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Meal.objects.all()
    serializer_class = MealSerializer


class OrderedMealViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = OrderedMeal.objects.all()
    serializer_class = OrderedMealSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
