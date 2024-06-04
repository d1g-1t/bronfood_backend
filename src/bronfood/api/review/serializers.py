from django.contrib.auth import authenticate
from django.core import validators
from rest_framework import serializers

from bronfood.core.client.models import Client
from bronfood.core.useraccount.models import UserAccount, UserAccountTempData
from bronfood.core.restaurants.models import Review
from bronfood.core.useraccount.validators import (
    FullnameValidator, KazakhstanPhoneNumberValidator,
    validate_password,
    validate_temp_data_code)


# class TempDataSerializer(serializers.ModelSerializer):
#     """
#     Сериализатор для обновления объекта клиента.
#     """
#     password = serializers.CharField(
#         required=False,
#         validators=[
#             validators.MinLengthValidator(4),
#             validators.MaxLengthValidator(256),
#             validate_password,
#         ]
#     )
#     password_confirm = serializers.CharField(
#         required=False,
#     )
#     fullname = serializers.CharField(
#         required=False,
#         validators=[FullnameValidator()]
#     )
#     phone = serializers.CharField(
#         required=False,
#         validators=[KazakhstanPhoneNumberValidator()]
#     )
#     user = serializers.PrimaryKeyRelatedField(
#         queryset=UserAccount.objects.all(),
#         required=True)

#     class Meta:
#         model = UserAccountTempData
#         fields = ['password',
#                   'password_confirm',
#                   'fullname',
#                   'phone',
#                   'user',
#                   ]

#     def create(self, validated_data):
#         user = validated_data.pop('user')
#         temp_data = UserAccountTempData.objects.create_temp_data(
#             user=user, **validated_data)
#         return temp_data

#     def validate(self, data):
#         password = data.get('password')
#         password_confirm = data.get('password_confirm')

#         if password or password_confirm:
#             if password != password_confirm:
#                 raise serializers.ValidationError(
#                     'Рasswords do not match')

#         if password_confirm:
#             password_confirm = data.pop('password_confirm')
#         return data


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
