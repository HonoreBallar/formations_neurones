<footer class="bg-gray-800 text-gray-300 py-10 mt-16">
    <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
            <h3 class="text-white text-lg font-semibold mb-4">À propos de Pront-IX</h3>
            <p class="text-gray-400 text-sm">
                Pront-IX est une entreprise spécialisée dans la formation en intelligence artificielle et sa mise en œuvre au cœur du digital. [cite_start]Fondée à Abidjan par Thierry MEMEL, notre mission est de transformer l'Afrique en un acteur clé de la révolution numérique mondiale.
            </p>
            <div class="flex space-x-4 mt-4">
                <a href="https://www.linkedin.com/company/pront-lx" target="_blank" class="text-gray-400 hover:text-blue-500 transition duration-300">
                    <img src="../public/assets/img/logo.png" alt="LinkedIn" class="h-10">
                </a>
            </div>
        </div>

        <div>
            <h3 class="text-white text-lg font-semibold mb-4">Liens utiles</h3>
            <ul class="space-y-2">
                <li><a href="#services" class="text-gray-400 hover:text-blue-500 transition duration-300">Nos Services</a></li>
                <li><a href="#formations" class="text-gray-400 hover:text-blue-500 transition duration-300">Nos Formations</a></li>
                <li><a href="#about" class="text-gray-400 hover:text-blue-500 transition duration-300">Qui sommes-nous ?</a></li>
                <li><a href="#contact" class="text-gray-400 hover:text-blue-500 transition duration-300">Contact</a></li>
                </ul>
        </div>

        <div>
            <h3 class="text-white text-lg font-semibold mb-4">Contactez-nous</h3>
            <p class="text-gray-400 text-sm flex items-center mb-2">
                <img src="/assets/img/icons/email.svg" alt="Email" class="h-5 w-5 mr-2">
                [cite_start]Email: <a href="mailto:contact@pront-ix.com" class="ml-1 hover:text-blue-500 transition duration-300">contact@pront-ix.com</a> [cite: 143]
            </p>
            <p class="text-gray-400 text-sm flex items-center mb-2">
                <img src="/assets/img/icons/phone.svg" alt="Téléphone" class="h-5 w-5 mr-2">
                [cite_start]Téléphone: (+225) 0565596747, (+225) 0759587952 [cite: 143]
            </p>
            <p class="text-gray-400 text-sm flex items-center">
                <img src="/assets/img/icons/website.svg" alt="Site Web" class="h-5 w-5 mr-2">
                [cite_start]Site Web: <a href="https://www.pront-ix.com" target="_blank" class="ml-1 hover:text-blue-500 transition duration-300">www.pront-ix.com</a> [cite: 143]
            </p>
            <p class="text-gray-400 text-sm mt-4">Suivez-nous sur les réseaux sociaux: @pront-lx [cite: 143]</p>
        </div>
    </div>

    <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
        &copy; <?php echo date("Y"); ?> Pront-IX. Tous droits réservés.
    </div>
</footer>

<script src="/assets/js/main.js"></script>
<script>
    // Script pour le menu mobile
    document.getElementById('mobile-menu-button').addEventListener('click', function() {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });
</script>