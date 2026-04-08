# Stage 1: Build React frontend
FROM node:22-alpine AS frontend-builder

WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client/ ./
RUN npm run build  # output: /app/client/dist

# Stage 2: Laravel backend
FROM php:8.5-cli

WORKDIR /app/server

RUN apt-get update && apt-get install -y \
    git unzip curl libzip-dev zip mariadb-client \
    && docker-php-ext-install zip pdo pdo_mysql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy Laravel backend
COPY server/ ./
RUN composer install --no-interaction --optimize-autoloader

# Copy frontend build into Laravel public folder
COPY --from=frontend-builder /app/client/dist ./public/

# Ensure SQLite database folder exists
RUN mkdir -p /app/server/database \
    && touch /app/server/database/ccsprofiling.sqlite

EXPOSE 8000

# Start Laravel
CMD bash -c "\
  php artisan storage:link && \
  php artisan migrate --force && \
  php artisan db:seed --force && \
  php artisan serve --host=0.0.0.0 --port=\${PORT:-8000} \
"
