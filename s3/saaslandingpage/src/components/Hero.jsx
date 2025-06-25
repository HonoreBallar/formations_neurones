// src/components/Hero.jsx

import React from 'react';

/**
 * Composant Hero (Section d'introduction principale).
 *
 * Présente le message clé de l'entreprise StreamLine,
 * une brève description et un appel à l'action principal.
 */
function Hero() {
  return (
    <section className="hero section-padding">
      <div className="container hero__container">
        <h1 className="hero__title">
          Automatisez vos tâches, gérez vos projets. <br className="hero__title-break" />
          Tout en un seul endroit.
        </h1>
        <p className="hero__description">
          StreamLine est la plateforme SaaS innovante qui transforme la façon dont les équipes collaborent.
          Optimisez vos flux de travail, centralisez votre gestion de projet et libérez votre potentiel.
        </p>
        <div className="hero__cta">
          <a href="#signup" className="btn btn-primary">
            Démarrer votre Essai Gratuit
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;