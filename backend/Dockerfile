FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install -r requirements.txt --no-cache-dir

COPY ./src/ .

RUN mkdir -p /app/static /app/media

EXPOSE 8000

CMD ["gunicorn", "bronfood.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3", "--timeout", "120"]
