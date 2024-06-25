class BasePaymentBackend:
    '''Базовый класс для платежных систем'''
    # Отправляет запрос на оплату
    def send_payment_request(self, payment_info):
        # Этот метод должен быть реализован в подклассах
        raise NotImplementedError
    
    # Обрабатывает колбэк от платежной системы
    def handle_payment_callback(self, request):
        # Этот метод должен быть реализован в подклассах
        raise NotImplementedError
