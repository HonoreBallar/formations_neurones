<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name', 'Laravel') }}</title>

    <script src="https://cdn.tailwindcss.com"></script>

    </head>
<body class="bg-gray-100 font-sans antialiased">

    <header class="bg-white shadow-sm py-4">
        <div class="container mx-auto px-4">
            <nav class="flex justify-between items-center">
                <a href="/" class="text-xl font-bold text-gray-800">Mon Application</a>
                <div class="space-x-4">
                    <a href="{{ route('tasks.index') }}" class="text-gray-600 hover:text-gray-900">Mes courses</a>
                    <a href="#" class="text-gray-600 hover:text-gray-900">Contact</a>
                </div>
            </nav>
        </div>
    </header>

    <main class="container mx-auto px-4 py-8">
        @yield('content')
    </main>

    <footer class="bg-gray-800 text-white py-4 mt-8">
        <div class="container mx-auto px-4 text-center">
            &copy; {{ date('Y') }} Mon Application. Tous droits réservés.
        </div>
    </footer>

</body>
</html>