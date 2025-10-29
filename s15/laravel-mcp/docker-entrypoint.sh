#!/bin/bash

# Installer les dépendances Laravel
composer install

# Générer la clé d'application
php artisan key:generate

# Lancer le serveur Apache
apache2-foreground
