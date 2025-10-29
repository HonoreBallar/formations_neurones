import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Offers from './components/Offers';
import Contact from './components/Contact';
import './App.css'; // Import your global styles

const App = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Offers />
      <Contact />
      
      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl font-bold text-blue-500 mb-4">MLC</div>
          <p className="text-slate-400 mb-4">
            Société d'ingénierie spécialisée dans la surveillance continue de la glycémie
          </p>
          <div className="text-sm text-slate-500">
            © 2025 MLC Innovation. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;