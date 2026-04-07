FROM php:8.2-cli WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
git unzip curl libzip-dev zip \
&& docker-php-ext-install zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy project
COPY . .
# Install Laravel dependencies

RUN composer install

# Expose port
EXPOSE 10000
# Run Laravel
CMD php artisan serve --host=0.0.0.0 --port=10000