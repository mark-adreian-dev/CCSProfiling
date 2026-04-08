# Stage 1: Build React frontend
FROM node:22-alpine

WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client/ ./
RUN npm run build  # builds into /app/client/dist

# Stage 2: Build PHP Laravel backend
FROM php:8.5-cli

WORKDIR /app/server

# Install PHP extensions & dependencies
RUN apt-get update && apt-get install -y \
    git unzip curl libzip-dev zip mariadb-client \
    && docker-php-ext-install zip pdo pdo_mysql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy Laravel backend
COPY server/ ./

# Install PHP dependencies
RUN composer install --no-interaction --optimize-autoloader

# Copy frontend build into Laravel public folder
COPY --from=frontend-builder /app/client/dist ./public/frontend

# Ensure SQLite database folder exists
RUN mkdir -p /app/server/database \
    && touch /app/server/database/ccsprofiling.sqlite

# Expose port
EXPOSE 8000

# Start Laravel
CMD bash -c "\
  php artisan migrate --force && \
  php artisan db:seed --force && \
  php artisan serve --host=0.0.0.0 --port=\${PORT:-8000} \
"
