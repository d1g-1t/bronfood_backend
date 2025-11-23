#!/bin/bash

# 🔍 Проверка безопасности перед пушем
echo "🔍 Проверка безопасности GitHub Actions workflows..."
echo ""

# Проверка 1: Найдены ли только правильные workflows
echo "1️⃣ Проверка структуры workflows:"
WORKFLOWS=$(find .github/workflows -type f -name "*.yml" 2>/dev/null | sort)
echo "$WORKFLOWS"
echo ""

# Проверка 2: Нет ли чужих настроек
echo "2️⃣ Проверка на чужие Docker Hub и серверы:"
if grep -r "solodnikov" .github/workflows/ 2>/dev/null; then
    echo "❌ ВНИМАНИЕ: Найдены упоминания чужого Docker Hub аккаунта!"
    exit 1
else
    echo "✅ Чужой Docker Hub не найден"
fi

if grep -r "45.82.14.98" .github/workflows/ 2>/dev/null; then
    echo "❌ ВНИМАНИЕ: Найдены упоминания чужого сервера!"
    exit 1
else
    echo "✅ Чужой сервер не найден"
fi
echo ""

# Проверка 3: Старые workflows игнорируются
echo "3️⃣ Проверка .gitignore для старых workflows:"
if git check-ignore backend/.github/workflows/main.yml 2>/dev/null; then
    echo "✅ Старые backend workflows игнорируются"
else
    echo "⚠️ Старые backend workflows могут быть добавлены в git"
fi

if git check-ignore frontend/.github/workflows/node.js.yml 2>/dev/null; then
    echo "✅ Старые frontend workflows игнорируются"
else
    echo "⚠️ Старые frontend workflows могут быть добавлены в git"
fi
echo ""

# Проверка 4: Что будет добавлено в коммит
echo "4️⃣ Файлы для коммита (.github):"
git status --short .github/ 2>/dev/null || echo "Нет изменений в .github/"
echo ""

# Итоговый статус
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Проверка безопасности завершена!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Следующие шаги:"
echo "1. git add .github/ .gitignore README.md MIGRATION.md"
echo "2. git add backend/ frontend/ docker-compose.yml Makefile *.sh *.bat"
echo "3. git commit -m 'feat: merge backend and frontend into monorepo'"
echo "4. git push origin develop_next"
echo ""
echo "   ИЛИ безопаснее создать новую ветку:"
echo "   git checkout -b feature/monorepo-structure"
echo "   git push origin feature/monorepo-structure"
echo ""
