from django.urls import include, path
from rest_framework import routers

from .restaurants.views import (
    RestaurantViewSet,
    MenuViewSet,
    TagViewSet,
    MealViewSet,
    OrderViewSet,
    OrderedMealViewSet,
    BasketViewSet,
    CoordinatesViewSet,
    ChoiceViewSet,
    FeatureViewSet,
    FavoritesViewSet,
    MealInBasketViewSet,
    RestaurantMeals,
    RestaurantMealDetail,
    UserFavoritesView,
    DeleteUserFavoriteView
)
from .payments.views import (
    payment_callback,
    CreatePaymentWithCardView,
    AddCardView,
    ListCustomerCardsView,
    DeleteCardView,
    SignInView,
    CreatePaymentView
)

router = routers.DefaultRouter()
router.register('restaurant', RestaurantViewSet, basename='restaurant')
router.register('menus', MenuViewSet, basename='menu')
router.register('tags', TagViewSet, basename='tag')
router.register('meals', MealViewSet, basename='meal')
router.register('orders', OrderViewSet, basename='order')
router.register('ordered_meals', OrderedMealViewSet, basename='ordered_meal')
router.register('basket', BasketViewSet, basename='basket')
router.register('coordinates', CoordinatesViewSet, basename='coordinates')
router.register('choices', ChoiceViewSet, basename='choice')
router.register('features', FeatureViewSet, basename='feature')
router.register('favorites', FavoritesViewSet, basename='favorite')
router.register('meals_in_basket', MealInBasketViewSet, basename='meal_in_basket')

urlpatterns = [
    path('', include(router.urls)),
    path('restaurant/<int:pk>/meal', RestaurantMeals.as_view(), name='restaurant-meals'),
    path('restaurant/<int:restaurant_id>/meal/<int:meal_id>', RestaurantMealDetail.as_view(), name='restaurant-meal-detail'),
    path('user/<int:user_id>/favorites', UserFavoritesView.as_view(), name='user-favorites'),
    path('user/<int:user_id>/favorites/<int:restaurant_id>', DeleteUserFavoriteView.as_view(), name='delete-user-favorite'),
    path('payments/<str:payment_system>/callback/', payment_callback, name='payment-callback'),
    path('auth/sign-in/', SignInView.as_view(), name='sign_in'),
    path('payments/', CreatePaymentView.as_view(), name='create_payment'),
    path('payments/<str:cardId>/', CreatePaymentWithCardView.as_view(), name='create_payment_with_card'),
    path('cards/', AddCardView.as_view(), name='add_card'),
    path('cards/<str:accountId>/', ListCustomerCardsView.as_view(), name='list_customer_cards'),
    path('cards/<str:id>/', DeleteCardView.as_view(), name='delete_card'),
]
