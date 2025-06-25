// src/components/Features.jsx

import React from 'react';
// Importe les icônes nécessaires de react-icons
import { FaCog, FaChartLine, FaUsers } from 'react-icons/fa'; // Exemples d'icônes, tu peux choisir d'autres

/**
 * Composant Features (Section Fonctionnalités).
 *
 * Présente les principales fonctionnalités de la plateforme StreamLine
 * sous forme de cartes avec icône, titre et description.
 * Utilise un tableau de données pour générer dynamiquement les cartes.
 */
function Features() {
  // Tableau de données pour les fonctionnalités
  const featuresData = [
    {
      id: 1,
      icon: <FaCog size={48} />, // Icône d'engrenage pour l'automatisation
      title: 'Automatisation Intelligente',
      description: 'Définissez des règles et laissez StreamLine prendre en charge les tâches répétitives. Gagnez du temps et réduisez les erreurs manuelles.',
    },
    {
      id: 2,
      icon: <FaChartLine size={48} />, // Icône de graphique pour le suivi
      title: 'Suivi de Projet Avancé',
      description: 'Visualisez l\'avancement de vos projets en temps réel, identifiez les goulots d\'étranglement et prenez des décisions éclairées.',
    },
    {
      id: 3,
      icon: <FaUsers size={48} />, // Icône d'utilisateurs pour la collaboration
      title: 'Collaboration Transparente',
      description: 'Travaillez ensemble sans effort. Partagez des fichiers, communiquez et suivez les contributions de chaque membre de l\'équipe.',
    },
  ];

  return (
    <section className="features section-padding" id="features">
      <div className="container">
        <h2 className="text-center features__heading">
          Une plateforme conçue pour l'efficacité de votre équipe
        </h2>
        <div className="features__grid">
          {featuresData.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-card__icon">
                {feature.icon}
              </div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;