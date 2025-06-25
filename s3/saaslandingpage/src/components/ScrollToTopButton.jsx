// src/components/ScrollToTopButton.jsx

import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Icône de flèche vers le haut

/**
 * Composant ScrollToTopButton.
 *
 * Affiche un bouton flottant en bas à droite de l'écran
 * lorsque l'utilisateur a fait défiler la page de plus de 100px.
 * Clique sur le bouton pour faire défiler la page en douceur jusqu'en haut.
 */
function ScrollToTopButton() {
  // État pour contrôler la visibilité du bouton
  const [showButton, setShowButton] = useState(false);

  // Fonction pour gérer le défilement et mettre à jour l'état
  const handleScroll = () => {
    // Le bouton apparaît si le défilement vertical est supérieur à 100px
    if (window.scrollY > 100) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  // Fonction pour faire défiler la page vers le haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Utilise le défilement doux
    });
  };

  // Effet pour ajouter et nettoyer l'écouteur d'événements de défilement
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Nettoyage de l'écouteur d'événements lors du démontage du composant
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Le tableau vide [] signifie que cet effet ne s'exécute qu'une fois au montage

  return (
    // Rendu conditionnel du bouton : seulement s'il doit être affiché
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top-btn"
          aria-label="Retourner en haut de la page"
        >
          {/* <FaArrowUp size={24} style={{ color: 'red', fontSize: '24px' }}/> */}
          
          <span style={{fontSize: '22px', color: 'white'}}>⬆︎</span>
        </button>
      )}
    </>
  );
}

export default ScrollToTopButton;