from rest_framework.permissions import BasePermission


class IsAuthenticatedCustom(BasePermission):
    '''Проверка на авторизацию пользователя'''
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated
