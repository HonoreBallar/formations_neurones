// Exemple de script pour le lazy loading d'images (approche native)
document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages = document.querySelectorAll("img.lazyload");
    var lazyloadThrottleTimeout;

    function lazyload () {
        if(lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function() {
            var scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function(img) {
                if(img.offsetTop < (window.innerHeight + scrollTop + 200)) { // 200px de marge
                    img.src = img.dataset.src;
                    img.classList.remove('lazyload');
                }
            });
            if(lazyloadImages.length == 0) {
                document.removeEventListener("scroll", lazyload);
                window.removeEventListener("resize", lazyload);
                window.removeEventListener("orientationChange", lazyload);
            }
        }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
});

// Pour une image lazy-loaded, utilisez:
// <img data-src="/assets/img/hero-ai-illustration.png" alt="Description" class="lazyload">
// Note: Le code Tailwind ne gère pas le lazyload JS. L'attribut `loading="lazy"` est la meilleure pratique moderne.

// Utilisation de loading="lazy" pour les images dans les sections PHP
// Assurez-vous d'ajouter loading="lazy" à vos balises <img> dans les fichiers includes/*.php
// Exemple: <img src="/assets/img/hero-ai-illustration.png" alt="Illustration d'Intelligence Artificielle" loading="lazy">