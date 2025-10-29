<header class="bg-white shadow-sm sticky top-0 z-50">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" class="flex items-center space-x-2">
            <img src="./public/assets/img/logo.png" alt="Pront-IX Logo" class="h-10">
            <!-- <span class="text-2xl font-bold text-gray-900">Pront-IX</span> -->
        </a>

        <div class="hidden md:flex space-x-8 items-center">
            <a href="#" class="text-gray-600 hover:text-blue-600 transition duration-300">Accueil</a>
            <a href="#about" class="text-gray-600 hover:text-blue-600 transition duration-300">Qui sommes-nous ?</a>
            <a href="#services" class="text-gray-600 hover:text-blue-600 transition duration-300">Services</a>
            <a href="#formations" class="text-gray-600 hover:text-blue-600 transition duration-300">Formations</a>
            <a href="#contact" class="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300">Contact</a>
        </div>

        <div class="md:hidden">
            <button id="mobile-menu-button" class="text-gray-600 hover:text-blue-600 focus:outline-none">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </div>
    </nav>

    <div id="mobile-menu" class="hidden md:hidden bg-white shadow-lg py-4">
        <div class="flex flex-col items-center space-y-4">
            <a href="#services" class="block text-gray-700 hover:text-blue-600 transition duration-300 py-2">Services</a>
            <a href="#formations" class="block text-gray-700 hover:text-blue-600 transition duration-300 py-2">Formations</a>
            <a href="#about" class="block text-gray-700 hover:text-blue-600 transition duration-300 py-2">Qui sommes-nous ?</a>
            <a href="#contact" class="block w-full text-center px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 mt-4">Contact</a>
        </div>
    </div>
</header>