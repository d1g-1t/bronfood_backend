#!/bin/bash
set -e

echo "Waiting for PostgreSQL..."
while ! pg_isready -h $DB_HOST -p $DB_PORT -U $POSTGRES_USER; do
  sleep 1
done
echo "PostgreSQL is ready!"

echo "Running migrations..."
python manage.py makemigrations --noinput
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Creating superuser if needed..."
python manage.py shell <<EOF
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(phone='0123456789').exists():
    User.objects.create_superuser('0123456789', '0123456789', 'admin')
    print('Superuser created')
else:
    print('Superuser already exists')
EOF

echo "Starting Gunicorn..."
exec gunicorn bronfood.wsgi:application --bind 0.0.0.0:8000 --workers 3 --timeout 120
