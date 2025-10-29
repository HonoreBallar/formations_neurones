import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Investissez dans l'innovation médicale de demain";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(58, 153, 255, 0.8), rgba(30, 41, 59, 0.9)), url('data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)"/>
              <circle cx="200" cy="150" r="3" fill="rgba(58, 153, 255, 0.6)"/>
              <circle cx="800" cy="300" r="2" fill="rgba(58, 153, 255, 0.4)"/>
              <circle cx="600" cy="600" r="4" fill="rgba(58, 153, 255, 0.8)"/>
              <circle cx="1000" cy="200" r="2" fill="rgba(58, 153, 255, 0.5)"/>
              <path d="M200,150 Q400,100 600,200 T1000,200" stroke="rgba(58, 153, 255, 0.3)" stroke-width="2" fill="none"/>
            </svg>
          `)}')`
        }}
      />
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="animate-fadeInUp">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wide">
            {displayText}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Devenez actionnaire d'un projet révolutionnaire avant son entrée en bourse
          </p>
          <button 
            onClick={() => document.getElementById('offre')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-2xl inline-flex items-center space-x-2"
          >
            <span>Je deviens actionnaire</span>
            <ChevronRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;