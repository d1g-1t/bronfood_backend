#!/bin/bash

set -e

echo "==================================="
echo "  BronFood Project Quick Start"
echo "==================================="
echo ""

if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "   Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

if [ ! -f frontend/.env.local ]; then
    echo "📝 Creating frontend/.env.local..."
    echo "VITE_API_URL=http://localhost:8000" > frontend/.env.local
    echo "VITE_YNDX_API_KEY=your-yandex-maps-api-key" >> frontend/.env.local
    echo "✅ frontend/.env.local created"
else
    echo "✅ frontend/.env.local already exists"
fi

echo ""
echo "🐳 Building and starting containers..."
echo "   This may take a few minutes on first run..."
echo ""

docker-compose up -d --build

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 15

echo ""
echo "==================================="
echo "  ✅ BronFood is ready!"
echo "==================================="
echo ""
echo "📱 Frontend:        http://localhost:3000"
echo "🔧 Backend API:     http://localhost:8000"
echo "📚 API Docs:        http://localhost:8000/api/swagger"
echo "📖 ReDoc:           http://localhost:8000/api/redoc"
echo "🔐 Admin Panel:     http://localhost:8000/admin"
echo ""
echo "Default credentials:"
echo "  Phone: 0123456789"
echo "  Password: admin"
echo ""
echo "To view logs:       docker-compose logs -f"
echo "To stop services:   docker-compose stop"
echo "To remove all:      docker-compose down -v"
echo ""
