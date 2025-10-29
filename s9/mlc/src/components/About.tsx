import React from 'react';
import { Users, TrendingUp, Award } from 'lucide-react';

const About = () => {
  return (
    <section id="apropos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 tracking-wide">
            À propos de MLC
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 tracking-wide">
              Une société d'ingénierie innovante
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              MLC est une société d'ingénierie de pointe spécialisée dans le développement 
              de technologies médicales révolutionnaires. Notre mission est de créer un 
              système de surveillance continue de la glycémie destiné au marché international.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Grâce à nos innovations technologiques et notre expertise en ingénierie biomédicale, 
              nous développons des solutions qui transformeront la vie de millions de personnes 
              diabétiques à travers le monde.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800">50M+</div>
                <div className="text-sm text-slate-600">Patients potentiels</div>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800">2030</div>
                <div className="text-sm text-slate-600">Entrée en bourse</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Award className="w-12 h-12 text-white mb-4" />
                <h4 className="text-xl font-bold mb-2">Innovation Médicale</h4>
                <p className="text-white/90">
                  Technologie de surveillance continue révolutionnaire pour 
                  améliorer la qualité de vie des patients diabétiques.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;