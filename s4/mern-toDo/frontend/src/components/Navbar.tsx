// frontend/src/components/Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Pour accéder à l'état de l'utilisateur et à la fonction de déconnexion

const Navbar: React.FC = () => {
  const { user, logout } = useAuth(); // Récupère l'utilisateur connecté et la fonction logout
  const navigate = useNavigate(); // Pour la navigation après déconnexion

  const handleLogout = () => {
    logout(); // Appelle la fonction de déconnexion du AuthContext
    navigate('/login'); // Redirige vers la page de connexion après déconnexion
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo ou titre de l'application */}
        <Link to="/" className="text-white text-2xl font-bold hover:text-gray-200 transition duration-200">
          MERN
        </Link>

        {/* Liens de navigation */}
        <div className="flex space-x-6">
          {user ? (
            <>
              {/* Liens visibles si l'utilisateur est connecté */}
              <Link to="/dashboard" className="text-white hover:text-gray-200 transition duration-200 text-lg">
                Mes Tâches
              </Link>
              <Link to="/profile" className="text-white hover:text-gray-200 transition duration-200 text-lg">
                Profil
              </Link>
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition duration-200 text-lg font-medium"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              {/* Liens visibles si l'utilisateur n'est PAS connecté */}
              <Link to="/register" className="text-white hover:text-gray-200 transition duration-200 text-lg">
                S'inscrire
              </Link>
              <Link to="/login" className="text-white hover:text-gray-200 transition duration-200 text-lg">
                Se connecter
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;