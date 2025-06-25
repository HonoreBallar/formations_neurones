// src/components/Pricing.jsx

import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Icône pour les points de liste des fonctionnalités

/**
 * Composant Pricing (Section Tarifs).
 *
 * Présente les différents plans tarifaires de StreamLine,
 * mettant en évidence les caractéristiques et les prix de chaque plan.
 * Un plan spécifique ('Pro') sera mis en avant.
 */
function Pricing() {
  // Tableau de données pour les plans tarifaires
  const pricingPlans = [
    {
      id: 1,
      name: 'Basique',
      price: 'Gratuit',
      description: 'Pour les petites équipes qui démarrent.',
      features: [
        'Jusqu\'à 5 utilisateurs',
        'Gestion de tâches basique',
        'Support communautaire',
        '1 Go de stockage',
      ],
      isHighlighted: false,
    },
    {
      id: 2,
      name: 'Pro',
      price: '29€',
      period: '/mois',
      description: 'Pour les équipes en croissance nécessitant plus de puissance.',
      features: [
        'Jusqu\'à 20 utilisateurs',
        'Automatisation avancée',
        'Support prioritaire',
        '10 Go de stockage',
        'Rapports personnalisés',
      ],
      isHighlighted: true, // Ce plan sera mis en avant
    },
    {
      id: 3,
      name: 'Entreprise',
      price: 'Sur Devis',
      description: 'Pour les grandes organisations aux besoins complexes.',
      features: [
        'Utilisateurs illimités',
        'Fonctionnalités personnalisées',
        'Gestionnaire de compte dédié',
        'Stockage illimité',
        'Intégrations avancées',
      ],
      isHighlighted: false,
    },
  ];

  return (
    <section className="pricing section-padding" id="pricing">
      <div className="container">
        <h2 className="text-center pricing__heading">
          Un plan pour chaque taille et besoin d'équipe
        </h2>
        <div className="pricing__grid">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.isHighlighted ? 'pricing-card--highlighted' : ''}`}
            >
              <h3 className="pricing-card__name">{plan.name}</h3>
              <p className="pricing-card__price">
                {plan.price}
                {plan.period && <span className="pricing-card__period">{plan.period}</span>}
              </p>
              <p className="pricing-card__description">{plan.description}</p>
              <ul className="pricing-card__features">
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <FaCheckCircle size={16} className="pricing-card__feature-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="pricing-card__cta">
                <a
                  href="#signup"
                  className={`btn ${plan.isHighlighted ? 'btn-primary' : 'btn-outline'}`}
                >
                  {plan.isHighlighted ? 'Choisir ce plan' : 'En savoir plus'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;