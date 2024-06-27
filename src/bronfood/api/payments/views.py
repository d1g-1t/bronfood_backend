from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    SignInSerializer,
    AddCardSerializer,
    CreatePaymentSerializer,
    ListCustomerCardsSerializer
)
from .services import AuthService, PaymentService, CardService


class SignInView(APIView):
    '''Вьюсет для авторизации пользователя'''
    def post(self, request):
        serializer = SignInSerializer(data=request.data)
        if serializer.is_valid():
            token = AuthService.sign_in(**serializer.validated_data)
            return Response({'token': token}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreatePaymentView(APIView):
    '''Вьюсет для создания платежа'''
    def post(self, request):
        serializer = CreatePaymentSerializer(data=request.data)
        if serializer.is_valid():
            payment = PaymentService.create_payment(
                **serializer.validated_data)
            return Response(payment, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreatePaymentWithCardView(APIView):
    '''Всьюет для создания платежа с картой'''
    def post(self, request, cardId):
        serializer = CreatePaymentSerializer(data=request.data)
        if serializer.is_valid():
            payment = PaymentService.create_payment_with_card(
                card_id=cardId, **serializer.validated_data)
            return Response(payment, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddCardView(APIView):
    '''Вьюсет для добавления карты'''
    def post(self, request):
        serializer = AddCardSerializer(data=request.data)
        if serializer.is_valid():
            card = CardService.add_card(**serializer.validated_data)
            return Response(card, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListCustomerCardsView(APIView):
    '''Вьюсет для получения списка карт пользователя'''
    def get(self, request, accountId):
        cards = CardService.list_customer_cards(account_id=accountId)
        serializer = ListCustomerCardsSerializer(cards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeleteCardView(APIView):
    '''Вьюсет для удаления карты пользователя'''
    def delete(self, request, id):
        result = CardService.delete_card(card_id=id)
        if result:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'error': 'Card not found'},
                        status=status.HTTP_404_NOT_FOUND)
