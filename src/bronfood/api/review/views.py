from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from bronfood.api.client.serializers import (
    ClientRequestRegistrationSerializer,
    TempDataCodeSerializer, TempDataSerializer, PhoneValidationSerializer)
from bronfood.api.client.utils import error_data, success_data
from bronfood.api.views import BaseAPIView
from bronfood.core.client.models import Client
from bronfood.core.useraccount.models import UserAccountTempData
from bronfood.core.restaurants.models import Review


class ReviewRestoratView(BaseAPIView):
    permission_classes = (IsAuthenticated,)
    """
    Формирование данных для изменения профиля клиента.
    Отправка СМС с кодом подтверждения.
    Требует авторизации.
    """
    serializer_class = ReviewSerializer

    def post(self, request):
        request.data['user'] = self.current_client.id
        temp_data_serializer = self.serializer_class(
            data=request.data
        )
        # проверка зарезервирован ли телефон
        similar_client = Client.objects.filter(phone=request.data['phone']).first()
        similar_temp_data = UserAccountTempData.objects.filter(phone=request.data['phone']).first()
        if (similar_client and similar_client.id != self.current_client.id or
           similar_temp_data and similar_temp_data.user_id != self.current_client.id):
            return Response(
                data=error_data('PhoneNumberIsAlreadyUsed'),
                status=status.HTTP_409_CONFLICT
            )

        if not temp_data_serializer.is_valid():
            return Response(
                data=error_data('ValidationError'),
                status=status.HTTP_400_BAD_REQUEST
            )
        # Создание временных данных
        temp_data_serializer.save()

        return Response(success_data(None),
                        status=status.HTTP_200_OK)