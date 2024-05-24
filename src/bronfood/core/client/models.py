from bronfood.core.useraccount.models import (
    UserAccount, UserAccountManager)


class ClientManager(UserAccountManager):

    def get_queryset(self, *args, **kwargs):
        queryset = super().get_queryset(*args, **kwargs)
        queryset = queryset.filter(role=UserAccount.Role.CLIENT)
        return queryset


class Client(UserAccount):
    """ Модель Клиента"""

    def save(self, *args, **kwargs):
        self.role = UserAccount.Role.CLIENT
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.fullname

    class Meta:
        proxy = True
    objects = ClientManager()
