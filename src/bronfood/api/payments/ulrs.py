from django.urls import path
from . import views

urlpatterns = [
    path('auth/sign-in/', views.SignInView.as_view(), name='sign_in'),
    path('payments/', views.CreatePaymentView.as_view(), name='create_payment'),
    path('payments/<str:cardId>/', views.CreatePaymentWithCardView.as_view(), name='create_payment_with_card'),
    path('cards/', views.AddCardView.as_view(), name='add_card'),
    path('cards/<str:accountId>/', views.ListCustomerCardsView.as_view(), name='list_customer_cards'),
    path('cards/<str:id>/', views.DeleteCardView.as_view(), name='delete_card'),
]
