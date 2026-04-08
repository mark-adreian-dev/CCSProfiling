# Use PHP 8.5 CLI image
FROM php:8.5-cli

# Set working directory
WORKDIR /app/server

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git unzip curl libzip-dev zip mariadb-client \
    && docker-php-ext-install zip pdo pdo_mysql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy Laravel app
COPY server/ ./

# Install PHP dependencies
RUN composer install --no-interaction --optimize-autoloader

# Ensure database folder exists (for SQLite)
RUN mkdir -p /app/server/database

# Expose port
EXPOSE 8000

# Start Laravel server, create SQLite file, migrate, seed (all at container start)
CMD bash -c "\
  touch /app/server/database/ccsprofiling.sqlite && \
  php artisan migrate --force && \
  php artisan db:seed --force && \
  php artisan serve --host=0.0.0.0 --port=\${PORT:-8000} \
"
