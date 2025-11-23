.PHONY: help setup start stop restart clean logs build test down dev prod shell-backend shell-frontend db-shell

help:
	@echo "BronFood Project - Available Commands:"
	@echo ""
	@echo "Setup & Start:"
	@echo "  make setup       - Initial setup and start the project (PRODUCTION)"
	@echo "  make dev         - Start in development mode with hot-reload"
	@echo ""
	@echo "Container Management:"
	@echo "  make start       - Start all services"
	@echo "  make stop        - Stop all services"
	@echo "  make restart     - Restart all services"
	@echo "  make build       - Rebuild all containers"
	@echo "  make down        - Stop and remove containers"
	@echo "  make clean       - Remove all containers, volumes and images"
	@echo ""
	@echo "Logs & Debugging:"
	@echo "  make logs        - Show logs from all services"
	@echo "  make logs-backend    - Show backend logs"
	@echo "  make logs-frontend   - Show frontend logs"
	@echo "  make logs-db         - Show database logs"
	@echo ""
	@echo "Shell Access:"
	@echo "  make shell-backend   - Open shell in backend container"
	@echo "  make shell-frontend  - Open shell in frontend container"
	@echo "  make db-shell        - Open PostgreSQL shell"
	@echo ""
	@echo "Testing:"
	@echo "  make test        - Run backend tests"
	@echo ""

setup:
	@echo "Setting up BronFood project..."
	@if [ ! -f .env ]; then \
		echo "Creating .env file from .env.example..."; \
		cp .env.example .env; \
	fi
	@if [ ! -f frontend/.env.local ]; then \
		echo "Creating frontend/.env.local..."; \
		cp frontend/.env.example frontend/.env.local; \
	fi
	@echo "Building and starting containers..."
	docker-compose up -d --build
	@echo ""
	@echo "Waiting for services to be ready..."
	@sleep 15
	@echo ""
	@echo "=========================================="
	@echo "  ✅ BronFood is ready!"
	@echo "=========================================="
	@echo ""
	@echo "📱 Frontend:        http://localhost:3000"
	@echo "🔧 Backend API:     http://localhost:8002"
	@echo "📚 API Docs:        http://localhost:8002/api/swagger"
	@echo "📖 ReDoc:           http://localhost:8002/api/redoc"
	@echo "🔐 Admin Panel:     http://localhost:8002/admin"
	@echo ""
	@echo "Default credentials:"
	@echo "  Phone: 0123456789"
	@echo "  Password: admin"
	@echo ""

dev:
	@echo "Starting BronFood in development mode..."
	@if [ ! -f .env ]; then \
		echo "Creating .env file..."; \
		cp .env.example .env; \
	fi
	@if [ ! -f frontend/.env.local ]; then \
		echo "Creating frontend/.env.local..."; \
		cp frontend/.env.example frontend/.env.local; \
	fi
	docker-compose -f docker-compose.dev.yml up -d --build
	@echo ""
	@echo "Development server is ready!"
	@echo "Frontend (Hot Reload): http://localhost:3000"
	@echo "Backend (Debug):       http://localhost:8000"
	@echo ""

start:
	@echo "Starting BronFood services..."
	docker-compose up -d
	@echo "Services started!"

stop:
	@echo "Stopping BronFood services..."
	docker-compose stop
	@echo "Services stopped!"

restart:
	@echo "Restarting BronFood services..."
	docker-compose restart
	@echo "Services restarted!"

build:
	@echo "Rebuilding BronFood containers..."
	docker-compose build --no-cache
	@echo "Containers rebuilt!"

logs:
	docker-compose logs -f

logs-backend:
	docker-compose logs -f backend

logs-frontend:
	docker-compose logs -f frontend

logs-db:
	docker-compose logs -f db

down:
	@echo "Stopping and removing BronFood containers..."
	docker-compose down
	@echo "Containers removed!"

clean:
	@echo "Cleaning up BronFood project..."
	docker-compose down -v --rmi all
	@echo "All containers, volumes and images removed!"

shell-backend:
	docker-compose exec backend sh

shell-frontend:
	docker-compose exec frontend sh

db-shell:
	docker-compose exec db psql -U postgres -d bronfood

test:
	@echo "Running backend tests..."
	docker-compose exec backend python manage.py test

migrate:
	@echo "Running database migrations..."
	docker-compose exec backend python manage.py migrate

makemigrations:
	@echo "Creating new migrations..."
	docker-compose exec backend python manage.py makemigrations

collectstatic:
	@echo "Collecting static files..."
	docker-compose exec backend python manage.py collectstatic --noinput

createsuperuser:
	@echo "Creating superuser..."
	docker-compose exec backend python manage.py createsuperuser
