// src/components/Footer.jsx

import React from 'react';
// Importe les icônes de médias sociaux de react-icons
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

/**
 * Composant Footer (Pied de page de l'application).
 *
 * Contient le copyright, les liens de navigation secondaires,
 * et les icônes de médias sociaux pour StreamLine.
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__container">
        {/* Colonne 1: Logo et Copyright */}
        <div className="footer__column footer__column--brand">
          <a href="/" className="footer__logo">StreamLine</a>
          <p className="footer__copyright">
            &copy; {currentYear} StreamLine. Tous droits réservés.
          </p>
        </div>

        {/* Colonne 2: Liens rapides */}
        <div className="footer__column">
          <h4 className="footer__heading">Navigation</h4>
          <ul className="footer__links-list">
            <li><a href="#features" className="footer__link">Fonctionnalités</a></li>
            <li><a href="#testimonials" className="footer__link">Témoignages</a></li>
            <li><a href="#pricing" className="footer__link">Tarifs</a></li>
            <li><a href="#signup" className="footer__link">S'inscrire</a></li>
          </ul>
        </div>

        {/* Colonne 3: Ressources */}
        <div className="footer__column">
          <h4 className="footer__heading">Ressources</h4>
          <ul className="footer__links-list">
            <li><a href="#blog" className="footer__link">Blog</a></li>
            <li><a href="#faq" className="footer__link">FAQ</a></li>
            <li><a href="#support" className="footer__link">Support</a></li>
            <li><a href="#privacy" className="footer__link">Politique de confidentialité</a></li>
          </ul>
        </div>

        {/* Colonne 4: Suivez-nous et Contact */}
        <div className="footer__column">
          <h4 className="footer__heading">Contact & Suivez-nous</h4>
          <ul className="footer__social-list">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Suivez-nous sur Facebook"><FaFacebookF size={20} /></a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Suivez-nous sur Twitter"><FaTwitter size={20} /></a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Suivez-nous sur LinkedIn"><FaLinkedinIn size={20} /></a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Suivez-nous sur Instagram"><FaInstagram size={20} /></a></li>
          </ul>
          <p className="footer__contact-text">
            contact@streamline.com
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;