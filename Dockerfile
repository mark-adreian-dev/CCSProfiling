# Use PHP 8.5 CLI image
FROM php:8.5-cli

# Set working directory inside container
WORKDIR /app/server

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git unzip curl libzip-dev zip mariadb-client \
    && docker-php-ext-install zip pdo pdo_mysql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy Laravel server folder
COPY server/ ./

# Install PHP dependencies
RUN composer install --no-interaction --optimize-autoloader

# Expose port for Laravel
EXPOSE 10000

# Copy entrypoint script
COPY server/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Run migrations, seed DB, and start Laravel
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
