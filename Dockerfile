# Use PHP 8.5 CLI image
FROM php:8.5-cli

# Set working directory inside container to /app
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git unzip curl libzip-dev zip \
    && docker-php-ext-install zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy only the Laravel server folder into /app
COPY server/ ./server/

# Set working directory to the Laravel folder
WORKDIR /app/server

# Install Laravel dependencies
RUN composer install

# Expose port for php artisan serve
EXPOSE 10000

# Start Laravel
CMD php artisan serve --host=0.0.0.0 --port=10000
