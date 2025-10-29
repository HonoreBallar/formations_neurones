// src/components/ui/ScrollToTopButton.tsx
'use client'; // Indique que ce composant est un Client Component

import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/outline'; // Icône de flèche

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Gère la visibilité du bouton au défilement
  const toggleVisibility = () => {
    if (window.scrollY > 300) { // Le bouton apparaît après 300px de défilement
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Fait défiler la page vers le haut en douceur
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-prontix-red text-prontix-white p-3 rounded-full shadow-lg hover:bg-prontix-dark focus:outline-none focus:ring-2 focus:ring-prontix-red focus:ring-offset-2 transition-all duration-300 ease-in-out"
          aria-label="Retour au haut de page"
        >
          <ArrowUpIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}