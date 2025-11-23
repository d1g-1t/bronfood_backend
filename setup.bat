@echo off
setlocal enabledelayedexpansion

echo ===================================
echo   BronFood Project Quick Start
echo ===================================
echo.

where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Docker is not installed. Please install Docker first.
    echo Visit: https://docs.docker.com/get-docker/
    exit /b 1
)

where docker-compose >nul 2>nul
if %errorlevel% neq 0 (
    docker compose version >nul 2>nul
    if %errorlevel% neq 0 (
        echo ERROR: Docker Compose is not installed.
        echo Visit: https://docs.docker.com/compose/install/
        exit /b 1
    )
)

if not exist .env (
    echo Creating .env file...
    copy .env.example .env >nul
    echo .env file created
) else (
    echo .env file already exists
)

if not exist frontend\.env.local (
    echo Creating frontend\.env.local...
    copy frontend\.env.example frontend\.env.local >nul
    echo frontend\.env.local created
) else (
    echo frontend\.env.local already exists
)

echo.
echo Building and starting containers...
echo This may take a few minutes on first run...
echo.

docker-compose up -d --build

echo.
echo Waiting for services to be ready...
timeout /t 30 /nobreak >nul

echo.
echo ===================================
echo   BronFood is ready!
echo ===================================
echo.
echo Frontend:        http://localhost:3000
echo Backend API:     http://localhost:8002
echo API Docs:        http://localhost:8002/api/swagger
echo ReDoc:           http://localhost:8002/api/redoc
echo Admin Panel:     http://localhost:8002/admin
echo.
echo Default credentials:
echo   Phone: 0123456789
echo   Password: admin
echo.
echo To view logs:       docker-compose logs -f
echo To stop services:   docker-compose stop
echo To remove all:      docker-compose down -v
echo.

pause
