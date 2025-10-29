# Utiliser l'image officielle de PHP avec Apache
FROM php:8.3-apache

# Installer les extensions nécessaires pour Laravel
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev zip git unzip libxml2-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql xml \
    && a2enmod rewrite


# (Optionnel) vérifier que mod_rewrite est activé
RUN a2enmod rewrite


# Copier le code de l'application Laravel dans le conteneur
COPY . /var/www/html

# Définir le répertoire de travail dans le conteneur
WORKDIR /var/www/html

# Installer les dépendances Composer (il faut avoir un fichier composer.json à la racine de ton projet Laravel)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-interaction

# Mettre à jour les permissions des fichiers et répertoires
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache


# Copier la configuration Apache personnalisée
COPY ./apache/default.conf /etc/apache2/sites-available/000-default.conf

# Exposer le port 80 pour l'application Laravel
EXPOSE 80
