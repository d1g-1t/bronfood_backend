# 🍔 BronFood - Food Ordering Platform

[![Python](https://img.shields.io/badge/-Python_3.11-464646?style=flat-square&logo=Python)](https://www.python.org/)
[![Django](https://img.shields.io/badge/-Django_4.2-464646?style=flat-square&logo=Django)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/-React_18-464646?style=flat-square&logo=React)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/-PostgreSQL_15-464646?style=flat-square&logo=PostgreSQL)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/-Docker-464646?style=flat-square&logo=Docker)](https://www.docker.com/)

Платформа для онлайн-заказа еды с возможностью просмотра меню, оформления заказов на вынос и отслеживания времени приготовления. Позволяет клиентам находить заведения на карте, делать заказы и забирать готовую еду без ожидания.

## 📋 Содержание

- [Возможности](#возможности)
- [Технологический стек](#технологический-стек)
- [Быстрый старт](#быстрый-старт)
- [Структура проекта](#структура-проекта)
- [Разработка](#разработка)
- [API документация](#api-документация)
- [Команда проекта](#команда-проекта)

## ✨ Возможности

### Backend (Django REST Framework)
- 🔐 Двухфакторная OTP-аутентификация по SMS
- 👥 Ролевая система (клиенты, владельцы, администраторы)
- 🗺️ Геолокация ресторанов с интеграцией Yandex Maps
- 🛒 Система корзины и заказов
- ⏱️ Отслеживание времени приготовления
- 📱 Интеграция с SMS-провайдером KazInfoTech
- 📊 Автоматическая документация API (Swagger/ReDoc)

### Frontend (React + TypeScript)
- 🎨 Современный интерфейс на React 18
- 🗺️ Интерактивная карта с ресторанами
- 📱 Адаптивный дизайн
- 🌐 Мультиязычность (i18next)
- 🔄 Управление состоянием (TanStack Query)

## 🛠 Технологический стек

### Backend
- Python 3.11
- Django 4.2
- Django REST Framework 3.14
- PostgreSQL 15
- Celery 5.2 + Redis
- Gunicorn
- pytest

### Frontend
- React 18
- TypeScript
- Vite
- TanStack Query
- Framer Motion
- Yandex Maps API

### DevOps
- Docker & Docker Compose
- Nginx
- GitHub Actions (CI/CD)

## 🚀 Быстрый старт

### Предварительные требования

- Docker >= 20.10
- Docker Compose >= 2.0
- Make (опционально, но рекомендуется)
- 2GB RAM минимум
- 5GB свободного места на диске

### Установка и запуск

1. **Клонируйте репозиторий:**
```bash
git clone https://github.com/d1g-1t/BronFood.git
cd BronFood

# По умолчанию будет ветка main с готовой к запуску структурой
```

2. **Запустите проект одной командой:**

**С Make (рекомендуется):**
```bash
make setup
```

**Без Make (Linux/Mac):**
```bash
./setup.sh
```

**Без Make (Windows):**
```cmd
setup.bat
```

**Вручную с Docker Compose:**
```bash
# Создать .env файлы
cp .env.example .env
cp frontend/.env.example frontend/.env.local

# Запустить
docker-compose up -d --build
```

### Что происходит автоматически:

✅ Создаются `.env` файлы из примеров  
✅ Собираются Docker-образы для frontend и backend  
✅ Запускается PostgreSQL база данных  
✅ Применяются миграции Django  
✅ Собирается статика  
✅ Создается суперпользователь (0123456789 / admin)  
✅ Запускаются все сервисы  

3. **Откройте приложение в браузере:**

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8002
- **Swagger:** http://localhost:8002/api/swagger
- **ReDoc:** http://localhost:8002/api/redoc
- **Admin Panel:** http://localhost:8002/admin

### Доступы

**Суперпользователь:**
- Телефон: `0123456789`
- Пароль: `admin`

**Админ-панель Django:**  
http://localhost:8002/admin

## 📁 Структура проекта

```
bronfood_backend/
├── backend/                # Django backend
│   ├── src/
│   │   ├── bronfood/      # Основное приложение
│   │   │   ├── api/       # API endpoints
│   │   │   ├── core/      # Бизнес-логика
│   │   │   └── settings.py
│   │   ├── tests/         # Тесты
│   │   └── manage.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # React компоненты
│   │   ├── utils/         # Утилиты и хуки
│   │   └── vendor/        # Статические ресурсы
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── docker-compose.yml     # Конфигурация Docker Compose
├── Makefile              # Команды для управления проектом
└── README.md
```

## 🔧 Разработка

### Доступные команды Make

```bash
make help              # Показать все доступные команды

# Запуск и управление
make setup             # Начальная настройка (production mode)
make dev               # Запуск в режиме разработки (hot reload)
make start             # Запустить все сервисы
make stop              # Остановить все сервисы
make restart           # Перезапустить все сервисы
make down              # Остановить и удалить контейнеры
make clean             # Полная очистка (containers + volumes + images)

# Сборка
make build             # Пересобрать все контейнеры

# Логи и отладка
make logs              # Показать логи всех сервисов
make logs-backend      # Логи backend
make logs-frontend     # Логи frontend
make logs-db           # Логи базы данных

# Shell-доступ
make shell-backend     # Открыть shell в backend контейнере
make shell-frontend    # Открыть shell в frontend контейнере
make db-shell          # Открыть PostgreSQL shell

# Django команды
make migrate           # Применить миграции
make makemigrations    # Создать новые миграции
make collectstatic     # Собрать статику
make createsuperuser   # Создать суперпользователя

# Тестирование
make test              # Запустить тесты backend
```

### Режимы запуска

#### Production Mode (по умолчанию)
```bash
make setup
# или
docker-compose up -d
```

Особенности:
- Оптимизированные сборки
- Gunicorn вместо runserver
- Минимальные логи
- Nginx для frontend

#### Development Mode (с hot reload)
```bash
make dev
# или
docker-compose -f docker-compose.dev.yml up -d
```

Особенности:
- Hot reload для React (Vite)
- Django runserver (debug mode)
- Исходный код смонтирован как volume
- Детальные логи

### Разработка без Docker

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Настроить .env
cp env.example .env
# Изменить DB_HOST=localhost

# Запустить PostgreSQL
docker-compose up -d db

cd src
python manage.py migrate
python manage.py runserver
```

#### Frontend

```bash
cd frontend
npm install

# Настроить .env.local
cp .env.example .env.local

npm run dev
```

### Запуск тестов

**Backend тесты:**
```bash
make test
# или без Docker:
cd backend/src
python manage.py test
```

**Frontend тесты:**
```bash
cd frontend
npm run test
```

### Линтинг и форматирование

**Backend:**
```bash
cd backend
flake8 src/
black --check src/
# Автофикс:
black src/
```

**Frontend:**
```bash
cd frontend
npm run lint
npm run prettier
# Автофикс:
npm run lint:fix
```

## 📚 API документация

После запуска проекта документация API доступна по адресам:

- **Swagger UI:** http://localhost:8002/api/swagger
- **ReDoc:** http://localhost:8002/api/redoc
- **JSON Schema:** http://localhost:8002/swagger.json

### Основные эндпоинты

- `POST /client/request_to_signup/` - Регистрация клиента
- `POST /client/signup/` - Подтверждение регистрации
- `POST /signin/` - Авторизация
- `GET /api/restaurants/` - Список ресторанов
- `GET /api/restaurants/{id}/menu/` - Меню ресторана
- `POST /api/basket/` - Управление корзиной
- `POST /api/orders/` - Создание заказа

## 🌐 CI/CD и Автоматизация

Проект настроен с GitHub Actions для автоматической проверки кода:

### Автоматические проверки при Push/PR:

1. **Backend качество кода:**
   - ✅ Flake8 линтинг
   - ✅ Black форматирование
   - ✅ isort проверка импортов

2. **Frontend качество кода:**
   - ✅ ESLint проверка
   - ✅ Prettier форматирование
   - ✅ TypeScript type checking

3. **При Push в `develop_next` или `main`:**
   - ✅ Запуск всех тестов backend (pytest, Django tests)
   - ✅ Запуск frontend сборки
   - ✅ Сборка Docker образов (локально, без публикации)
   - ✅ Проверка безопасности (Trivy)

### Переменные окружения для production

Создайте файл `.env` на production-сервере:

```env
SECRET_KEY=your-secure-secret-key
DEBUG=false
ENV_NAME=production

POSTGRES_DB=bronfood_prod
POSTGRES_USER=bronfood_user
POSTGRES_PASSWORD=secure-password
DB_HOST=db
DB_PORT=5432

KAZINFOTECH_USERNAME=your-sms-username
KAZINFOTECH_PASSWORD=your-sms-password
```

### Ручной деплой

Для деплоя на ваш сервер:

```bash
# 1. На вашем сервере клонируйте репозиторий
git clone https://github.com/d1g-1t/bronfood_backend.git
cd bronfood_backend

# 2. Настройте .env файлы
cp .env.example .env
cp frontend/.env.example frontend/.env.local
# Отредактируйте .env с production настройками

# 3. Запустите проект
docker-compose up -d --build
```

## 👥 Команда проекта

- [Александр Солодников](https://github.com/Solodnikov)
- [Витас Вакаускас](https://github.com/Qerced)
- [Евгений Андронов](https://github.com/syberflea)
- [Дмитрий Луконин](https://t.me/folite999)
- [Павел Охрим](https://github.com/d1g-1t)

**Сделано с ❤️ командой BronFood**
