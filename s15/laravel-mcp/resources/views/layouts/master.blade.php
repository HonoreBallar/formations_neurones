<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Mon Application')</title>

    <!-- Tailwind CSS via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Configuration optionnelle de Tailwind -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#1D4ED8',
                        secondary: '#9333EA',
                    },
                },
            },
        }
    </script>
</head>
<body class="bg-gray-100 text-gray-900">

    <!-- Barre de navigation -->
    <nav class="bg-white shadow p-4">
        <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-xl font-bold text-primary">Mon App</h1>
            <ul class="flex space-x-4">
                <li><a href="/" class="hover:text-secondary">Accueil</a></li>
                <li><a href="/about" class="hover:text-secondary">À propos</a></li>
            </ul>
        </div>
    </nav>

    <!-- Contenu principal -->
    <main class="container mx-auto py-8">
        @yield('content')
    </main>

    <!-- Pied de page -->
    <footer class="bg-white shadow p-4 mt-8 text-center text-sm text-gray-500">
        &copy; {{ date('Y') }} Mon Application. Tous droits réservés.
    </footer>

</body>
</html>
