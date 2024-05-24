# бронфуд.ком
[![Python](https://img.shields.io/badge/-Python-464646?style=flat-square&logo=Python)](https://www.python.org/)
[![Django](https://img.shields.io/badge/-Django-464646?style=flat-square&logo=Django)](https://www.djangoproject.com/)
[![REST API](https://img.shields.io/badge/-REST%20API-464646?style=flat-square&logo=REST%20API)](https://restfulapi.net/)
[![PostgreSQL](https://img.shields.io/badge/-SQLite-464646?style=flat-square&logo=PostgreSQL)](https://www.postgresql.org/)

Бронфуд.ком приложение позволяет найти заведение общепита на карте, посмотреть меню, сделать заказ еды на вынос, и благодаря отслеживанию времени прийти и забрать еду во время. Без ожидания приготовления в самом заведении.

## Над проектом работали:
- [Александр Солодников](https://github.com/Solodnikov)
- [Витас Вакаускас](https://github.com/Qerced)
- [Евгений Андронов](https://github.com/syberflea)
- [Дмитрий Луконин](https://t.me/folite999)

## Проект можно посмотреть по адресу:
...
## Подготовка и запуск проекта
### Склонировать репозиторий на локальную машину:
```
git clone https://github.com/bronfood-com/backend
```

### Запуск приложения для отладки:

> [!WARNING]
> Для запуска необходимо изменить `.env`:
> В поле `ENV_NAME` нужно установить значение `local`

```
docker-compose -f infra/docker-compose.local.yml up -d
python src/manage.py runserver
```

### Запуск приложения на сервере:

> [!WARNING]
> Все запросы будут обрабатываться через Gunicorn
> Nginx в проекте пока еще не настроен
> Значение в поле `ENV_NAME` устанавливается автоматически

```
docker-compose -f infra/docker-compose.prod.yml up -d
```

### Запуск приложения и базы данных с сервером nginx в контейнерах:

```
docker-compose -f infra/docker-compose.yml up -d --build
```
При запуске на локальной машине обрабатываются только запросы http.

При запуске на сервере доступны запросы на http/https.

### Запуск unit-testов:

```
cd src/
python manage.py test
```

### Запуск проекта локального сервера:

```
py -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd src/
python manage.py runserver
```
## Использованые фреймворки и библиотеки:
- [Django](https://www.djangoproject.com/)
- [Django REST framework](https://www.django-rest-framework.org/)
- [django-filter](https://django-filter.readthedocs.io/en/stable/)
- [django-cors-headers](https://github.com/adamchainz/django-cors-headers)
- [Djoser](https://djoser.readthedocs.io/)
- [drf-nested-routers](https://github.com/alanjds/drf-nested-routers)
- [drf-yasg](https://drf-yasg.readthedocs.io/en/stable/)
- [Gunicorn](https://gunicorn.org/)

## Первичная документация:
```
https://localhost:8000/api/redoc

https://localhost:8000/api/swagger
```

## Работа с API через Postman Agent
...