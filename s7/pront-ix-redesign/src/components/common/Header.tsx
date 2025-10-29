// src/components/common/Header.tsx
'use client'; // Indique que ce composant est un Client Component

import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Utilisation d'icônes pour le menu hamburger

const navLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'À propos', href: '/about' }, // Ces liens seront des ancres vers les sections plus tard
  { name: 'Nos programmes', href: '/programs' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-prontix-dark shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Pront-ix */}
        <Link href="/" className="text-prontix-red text-3xl font-bold">
          pront-ix
        </Link>

        {/* Liens de navigation (Desktop) */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-prontix-white hover:text-prontix-red transition-colors duration-200 text-lg"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Bouton Hamburger (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-prontix-white focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-8 w-8" />
            ) : (
              <Bars3Icon className="h-8 w-8" />
            )}
          </button>
        </div>
      </nav>

      {/* Menu Mobile (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-prontix-dark pb-4 transition-all duration-300 ease-in-out">
          <div className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-prontix-white hover:text-prontix-red transition-colors duration-200 text-lg py-2 w-full text-center"
                onClick={() => setIsMobileMenuOpen(false)} // Ferme le menu au clic
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}