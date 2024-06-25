from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# TODO: После получения от заказчика апишки банка
# реализовать логику обработки колбэка


@csrf_exempt
def payment_callback(request, payment_system):
    '''Обработчик колбэка от платежной системы'''
    return JsonResponse({'status': 'success'})
