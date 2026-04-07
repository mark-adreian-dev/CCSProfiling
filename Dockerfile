# Use PHP 8.5 CLI image
FROM php:8.5-cli

# Set working directory inside container to Laravel folder
WORKDIR /app/server

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git unzip curl libzip-dev zip \
    && docker-php-ext-install zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy entire repo into container
COPY . .

# Install Laravel dependencies inside server folder
RUN composer install --working-dir=/app/server

# Expose port for php artisan serve
EXPOSE 10000

# Start Laravel
CMD php artisan serve --host=0.0.0.0 --port=10000