#!/bin/bash
set -e

# 1️⃣ Copy example env if .env missing
if [ ! -f .env ]; then
    cp .env.example .env
    php artisan key:generate
fi

# 2️⃣ Run Laravel migrations
php artisan migrate --force

# 3️⃣ Run database seeders
php artisan db:seed --force

# 4️⃣ Start Laravel server
exec "$@"