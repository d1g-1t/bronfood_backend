#!/bin/bash

echo "=================================="
echo "  BronFood Project Health Check"
echo "=================================="
echo ""

errors=0

check_command() {
    if command -v $1 &> /dev/null; then
        echo "✅ $1 is installed"
        $1 --version 2>&1 | head -n 1
    else
        echo "❌ $1 is NOT installed"
        ((errors++))
    fi
    echo ""
}

check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 || netstat -an | grep -q ":$1.*LISTEN" 2>&1; then
        echo "❌ Port $1 is already in use"
        ((errors++))
    else
        echo "✅ Port $1 is available"
    fi
}

check_file() {
    if [ -f "$1" ]; then
        echo "✅ $1 exists"
    else
        echo "⚠️  $1 not found (will be created)"
    fi
}

echo "=== Checking Prerequisites ==="
echo ""
check_command docker
check_command docker-compose

echo "=== Checking Ports ==="
echo ""
check_port 3000
check_port 8000
check_port 5432
echo ""

echo "=== Checking Configuration Files ==="
echo ""
check_file ".env"
check_file "frontend/.env.local"
check_file "docker-compose.yml"
check_file "backend/Dockerfile"
check_file "frontend/Dockerfile"
echo ""

echo "=== Checking Docker ==="
echo ""
docker_running=$(docker info >/dev/null 2>&1 && echo "yes" || echo "no")
if [ "$docker_running" = "yes" ]; then
    echo "✅ Docker daemon is running"
else
    echo "❌ Docker daemon is NOT running"
    echo "   Please start Docker Desktop or Docker service"
    ((errors++))
fi
echo ""

echo "=== Checking Disk Space ==="
echo ""
available_space=$(df -h . | awk 'NR==2 {print $4}')
echo "Available disk space: $available_space"
echo ""

echo "=== Summary ==="
echo ""
if [ $errors -eq 0 ]; then
    echo "✅ All checks passed! You can run: make setup"
else
    echo "❌ Found $errors error(s). Please fix them before running setup."
fi
echo ""
