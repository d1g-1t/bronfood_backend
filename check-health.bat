@echo off
setlocal enabledelayedexpansion

echo ==================================
echo   BronFood Project Health Check
echo ==================================
echo.

set errors=0

echo === Checking Prerequisites ===
echo.

where docker >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] docker is installed
    docker --version
) else (
    echo [ERROR] docker is NOT installed
    set /a errors+=1
)
echo.

where docker-compose >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] docker-compose is installed
    docker-compose --version
) else (
    docker compose version >nul 2>nul
    if %errorlevel% equ 0 (
        echo [OK] docker compose is installed
        docker compose version
    ) else (
        echo [ERROR] docker compose is NOT installed
        set /a errors+=1
    )
)
echo.

echo === Checking Ports ===
echo.

netstat -ano | findstr ":3000" | findstr "LISTENING" >nul 2>nul
if %errorlevel% equ 0 (
    echo [ERROR] Port 3000 is already in use
    set /a errors+=1
) else (
    echo [OK] Port 3000 is available
)

netstat -ano | findstr ":8000" | findstr "LISTENING" >nul 2>nul
if %errorlevel% equ 0 (
    echo [ERROR] Port 8000 is already in use
    set /a errors+=1
) else (
    echo [OK] Port 8000 is available
)

netstat -ano | findstr ":5432" | findstr "LISTENING" >nul 2>nul
if %errorlevel% equ 0 (
    echo [ERROR] Port 5432 is already in use
    set /a errors+=1
) else (
    echo [OK] Port 5432 is available
)
echo.

echo === Checking Configuration Files ===
echo.

if exist .env (
    echo [OK] .env exists
) else (
    echo [WARNING] .env not found ^(will be created^)
)

if exist frontend\.env.local (
    echo [OK] frontend\.env.local exists
) else (
    echo [WARNING] frontend\.env.local not found ^(will be created^)
)

if exist docker-compose.yml (
    echo [OK] docker-compose.yml exists
) else (
    echo [ERROR] docker-compose.yml not found
    set /a errors+=1
)
echo.

echo === Checking Docker ===
echo.

docker info >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Docker daemon is running
) else (
    echo [ERROR] Docker daemon is NOT running
    echo    Please start Docker Desktop
    set /a errors+=1
)
echo.

echo === Summary ===
echo.

if %errors% equ 0 (
    echo [OK] All checks passed! You can run: setup.bat
) else (
    echo [ERROR] Found %errors% error^(s^). Please fix them before running setup.
)
echo.

pause
