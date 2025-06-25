// src/components/Testimonials.jsx

import React from 'react';
// Tu peux ajouter des icônes si tu veux des étoiles de notation, par exemple
// import { FaStar } from 'react-icons/fa';

/**
 * Composant Testimonials (Section Témoignages).
 *
 * Affiche des témoignages de clients satisfaits pour renforcer la crédibilité
 * et la confiance envers la plateforme StreamLine.
 * Utilise un tableau de données pour générer dynamiquement les cartes de témoignages.
 */
function Testimonials() {
  // Tableau de données pour les témoignages
  const testimonialsData = [
    {
      id: 1,
      quote: "StreamLine a révolutionné la gestion de nos projets. L'automatisation nous a fait gagner des heures précieuses chaque semaine. Indispensable !",
      author: "Sophie Dubois",
      title: "Directrice Marketing, Agence CreativeFlow",
    },
    {
      id: 2,
      quote: "La collaboration n'a jamais été aussi fluide. Toutes nos équipes sont sur la même longueur d'onde, et le suivi est d'une simplicité enfantine.",
      author: "Marc Lefebvre",
      title: "CEO, TechSolutions Startup",
    },
    // Tu peux ajouter d'autres témoignages ici si tu le souhaites
  ];

  return (
    <section className="testimonials section-padding" id="testimonials">
      <div className="container">
        <h2 className="text-center testimonials__heading">
          Ils nous font confiance et transforment leur productivité
        </h2>
        <div className="testimonials__grid">
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              {/* Optionnel: Icônes d'étoiles si tu veux les ajouter */}
              {/* <div className="testimonial-card__stars">
                {[...Array(5)].map((_, i) => <FaStar key={i} color="#FFD700" size={18} />)}
              </div> */}
              <p className="testimonial-card__quote">"{testimonial.quote}"</p>
              <p className="testimonial-card__author">- {testimonial.author}</p>
              <p className="testimonial-card__title">{testimonial.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;