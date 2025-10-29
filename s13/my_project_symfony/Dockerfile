FROM php:8.2-apache

# Activer les modules Apache
RUN a2enmod rewrite

# Installer dépendances Symfony
RUN apt-get update && apt-get install -y \
    git unzip libicu-dev libzip-dev libonig-dev \
    && docker-php-ext-install intl pdo_mysql zip

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Config Apache
COPY ./apache/default.conf /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html
