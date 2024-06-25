from .base import BasePaymentBackend


class BankPayment(BasePaymentBackend):                      # TODO: После получения от заказчика апишки банка
    '''Платежный бэкенд для банковского перевода'''         # реализовать логику отправки запроса на оплату и обработки колбэка
    def send_payment_request(self, payment_info):
        # Логика отправки запроса на оплату
        pass

    def handle_payment_callback(self, request):
        # Логика обработки коллбэка от платежной системы
        pass
