from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def payment_callback(request, payment_system):       #TODO: После получения от заказчика апишки банка
    '''Обработчик колбэка от платежной системы'''    # реализовать логику обработки колбэка
    return JsonResponse({'status': 'success'})
