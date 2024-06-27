import requests


class AuthService:
    '''Сервис для авторизации пользователя'''
    @staticmethod
    def sign_in(username, password):
        url = "https://ps.airbapay.kz/acquiring-api/api/v1/auth/sign-in"
        response = requests.post(
            url, json={"username": username, "password": password}
        )
        if response.status_code == 200:
            return response.json()["access_token"]
        return None


class CardService:
    '''Сервис для работы с картами пользователя'''
    @staticmethod
    def add_card(user, **kwargs):
        token = AuthService.sign_in(user.username, user.password)
        headers = {"Authorization": f"Bearer {token}"}
        url = "https://ps.airbapay.kz/acquiring-api/api/v1/cards"
        response = requests.post(url, headers=headers, json=kwargs)
        return response.json()

    @staticmethod
    def list_cards(user, account_id):
        token = AuthService.sign_in(user.username, user.password)
        headers = {"Authorization": f"Bearer {token}"}
        url = f"https://ps.airbapay.kz/acquiring-api/api/v1/cards/{account_id}"
        response = requests.get(url, headers=headers)
        return response.json()

    @staticmethod
    def delete_card(user, card_id):
        token = AuthService.sign_in(user.username, user.password)
        headers = {"Authorization": f"Bearer {token}"}
        url = f"https://ps.airbapay.kz/acquiring-api/api/v1/cards/{card_id}"
        response = requests.delete(url, headers=headers)
        return response.status_code == 200


class PaymentService:
    '''Сервис для работы с платежами'''
    @staticmethod
    def get_payment_info(user, payment_id):
        token = AuthService.sign_in(user.username, user.password)
        headers = {"Authorization": f"Bearer {token}"}
        url = f"https://ps.airbapay.kz/acquiring-api/api/v1/payments/{payment_id}"
        response = requests.get(url, headers=headers)
        return response.json()
