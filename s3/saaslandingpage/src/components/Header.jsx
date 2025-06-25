// src/components/Header.jsx

import React, { useState } from 'react';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx'; // Icônes pour le menu burger/fermeture

/**
 * Composant Header (En-tête de la page).
 *
 * Contient le logo de l'entreprise "StreamLine",
 * les liens de navigation, et les boutons d'authentification.
 * Gère également l'état du menu burger pour l'affichage mobile.
 */
function Header() {
  // État pour gérer l'ouverture/fermeture du menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Fonction pour basculer l'état du menu mobile.
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="container header__container">
        {/* Logo de l'entreprise */}
        <div className="header__logo">
          <a href="/" className="header__logo-link">
            StreamLine
          </a>
        </div>

        {/* Bouton du menu burger (visible uniquement sur mobile) */}
        <button className="header__menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
          {isMobileMenuOpen ? <RxCross1 size={24} /> : <RxHamburgerMenu size={24} />}
        </button>

        {/* Navigation principale et boutons (cachés sur mobile par défaut, affichés via JS) */}
        <nav className={`header__nav ${isMobileMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <a href="#features" className="nav-link" onClick={toggleMobileMenu}>Fonctionnalités</a>
            </li>
            <li className="header__nav-item">
              <a href="#testimonials" className="nav-link" onClick={toggleMobileMenu}>Témoignages</a>
            </li>
            <li className="header__nav-item">
              <a href="#pricing" className="nav-link" onClick={toggleMobileMenu}>Tarifs</a>
            </li>
          </ul>

          <div className="header__auth-buttons">
            <a href="#login" className="btn btn-outline">Connexion</a> {/* Ajouter une classe pour bouton de contour */}
            <a href="#signup" className="btn btn-primary">Essai Gratuit</a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;