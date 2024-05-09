from django.test import TestCase, Client


class UrlTests(TestCase):
    def test_get_restaurants(self):
        """
        Тест проверки получения статуса 200 при get запросе
        на адрес '/restaurant/'
        """
        guest_client = Client()
        response = guest_client.get("/api/restaurant/")
        self.assertEqual(response.status_code, 200)

    def test_get_menu(self):
        """
        Тест проверки получения статуса 200 при get запросе
        на адрес '/menus/'
        """
        guest_client = Client()
        response = guest_client.get("/api/menus/")
        self.assertEqual(response.status_code, 200)

    def test_get_meals(self):
        """
        Тест проверки получения статуса 200 при get запросе
        на адрес '/meals/'
        """
        guest_client = Client()
        response = guest_client.get("/api/meals/")
        self.assertEqual(response.status_code, 200)
