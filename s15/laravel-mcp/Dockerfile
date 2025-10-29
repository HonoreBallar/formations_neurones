# Utilisez une image de base PHP avec Apache
FROM php:8.2-apache

# Installer les dépendances système nécessaires
RUN apt-get update && apt-get install -y \
    libzip-dev \
    libonig-dev \
    libjpeg-dev \
    libpng-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    supervisor \
    && rm -rf /var/lib/apt/lists/*

# Installer les extensions PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Installer Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/local/bin/composer

# Configurer Apache pour le projet Laravel
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier le code du projet dans le conteneur
COPY . /var/www/html

# Installer les dépendances du projet
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Donner les permissions d'écriture
RUN chown -R www-data:www-data /var/www/html/storage \
    /var/www/html/bootstrap/cache

# Exposer le port 80 pour le serveur web
EXPOSE 80

# Démarrer le serveur Apache
CMD ["apache2-foreground"]