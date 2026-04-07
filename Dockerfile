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

# Create .env if missing and generate key
RUN if [ ! -f .env ]; then cp .env.example .env && php artisan key:generate; fi

# Run migrations and seeders
RUN php artisan migrate --force && php artisan db:seed --force

# Expose port
EXPOSE 10000

# Start Laravel server using PORT env (Render compatible)
CMD php artisan serve --host=0.0.0.0 --port=${PORT:-10000}
