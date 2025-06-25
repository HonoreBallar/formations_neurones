// src/components/FinalCTA.jsx

import React from 'react';

/**
 * Composant FinalCTA (Dernier Appel à l'Action).
 *
 * Une section percutante encourageant les visiteurs à passer à l'action finale,
 * comme s'inscrire ou demander une démo.
 */
function FinalCTA() {
  return (
    <section className="final-cta section-padding">
      <div className="container text-center"> {/* Utilise la classe text-center pour aligner le contenu */}
        <h2 className="final-cta__heading">
          Prêt à transformer la façon dont votre équipe travaille ?
        </h2>
        <p className="final-cta__description">
          Rejoignez les milliers d'équipes qui utilisent déjà StreamLine pour optimiser leurs flux de travail.
          Commencez votre essai gratuit dès aujourd'hui et découvrez la différence.
        </p>
        <div className="final-cta__button-wrapper">
          <a href="#signup" className="btn btn-primary">
            Inscrivez-vous Gratuitement
          </a>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;