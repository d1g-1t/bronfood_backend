from rest_framework import serializers
from bronfood.core.payments.models import Payment, Card


class SignInSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=255)


class CreatePaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            'client', 'amount', 'status'
        ]


class AddCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = [
            'client', 'card_id', 'account_id', 'masked_pan', 'name', 'expire'
        ]


class ListCustomerCardsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = [
            'card_id', 'account_id', 'masked_pan', 'name', 'expire'
        ]
