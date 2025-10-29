import React from 'react';
import { Check, Award } from 'lucide-react';

const Offers = () => {
  const offers = [
    {
      title: "Investisseur Débutant",
      amount: "$100 - $1,000",
      description: "Parfait pour commencer votre parcours d'investissement",
      features: ["Certificat d'investissement", "Rapports trimestriels", "Accès communauté"],
      popular: false
    },
    {
      title: "Investisseur Confirmé",
      amount: "$1,000 - $50,000",
      description: "Pour les investisseurs expérimentés",
      features: ["Certificat d'investissement", "Rapports mensuels", "Accès privilégié", "Webinaires exclusifs"],
      popular: true
    },
    {
      title: "Investisseur Premium",
      amount: "$50,000 - $2,000,000",
      description: "Le summum de l'investissement MLC",
      features: ["Certificat premium", "Rapports hebdomadaires", "Accès VIP", "Conseiller dédié", "Événements privés"],
      popular: false
    }
  ];

  return (
    <section id="offre" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 tracking-wide">
            Nos Offres d'Investissement
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choisissez le niveau d'investissement qui vous correspond et recevez votre 
            certificat de détention de parts avant l'IPO de 2030
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                offer.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {offer.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Populaire
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{offer.title}</h3>
                <div className="text-3xl font-bold text-blue-500 mb-2">{offer.amount}</div>
                <p className="text-slate-600">{offer.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {offer.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  offer.popular 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : 'bg-slate-100 hover:bg-blue-500 text-slate-800 hover:text-white'
                }`}
              >
                Investir maintenant
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-blue-500 text-white rounded-2xl p-8 max-w-4xl mx-auto">
            <Award className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Certificat d'Investissement Garanti</h3>
            <p className="text-blue-100 text-lg">
              Chaque investisseur reçoit un certificat officiel attestant de sa détention de parts 
              dans MLC avant l'entrée en bourse prévue en 2030. Ce document constitue une preuve 
              légale de votre participation au capital de l'entreprise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offers;