// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Le tableau `content` est crucial pour que Tailwind CSS puisse analyser
  // tes fichiers et générer uniquement le CSS nécessaire.
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Définition des couleurs spécifiques de Pront-ix
        'prontix-red': '#AF0000', // Le rouge distinctif de Pront-ix
        'prontix-dark': '#111111', // Le noir profond
        // Tu peux ajouter d'autres nuances ou couleurs secondaires si identifiées plus tard,
        // par exemple pour les fonds clairs ou les textes secondaires.
        'prontix-white': '#FFFFFF', // Le blanc, souvent utile pour les textes sur fonds sombres
        'prontix-light-gray': '#F5F5F5', // Un gris très clair pour les fonds de sections
        'prontix-text-gray': '#6B7280', // Un gris pour les textes courants
      },
      fontFamily: {
        // Définition des polices personnalisées.
        // J'ai mis 'Inter' comme un exemple courant et lisible.
        // Si Pront-ix utilise une police spécifique, remplace 'Inter'.
        sans: ['Inter', 'sans-serif'],
        // 'heading': ['YourCustomHeadingFont', 'sans-serif'], // Si tu as une police spécifique pour les titres
      },
      // Tu peux également étendre d'autres aspects du thème ici, comme :
      // spacing: {}, // Pour des espacements personnalisés
      // fontSize: {}, // Pour des tailles de police spécifiques
      // breakpoints: {}, // Pour des points de rupture personnalisés si nécessaire
    },
  },
  plugins: [
    // Ajoute ici les plugins Tailwind CSS si tu en utilises.
    // Par exemple, @tailwindcss/forms, @tailwindcss/typography, etc.
    // Pour l'instant, aucun plugin spécifique n'est requis au-delà de la configuration de base.
  ],
};