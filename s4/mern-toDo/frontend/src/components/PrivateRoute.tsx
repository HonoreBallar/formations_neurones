// frontend/src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importe notre hook d'authentification

interface PrivateRouteProps {
  children: React.ReactNode; // Le composant enfant (la page protégée)
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth(); // Récupère l'utilisateur et l'état de chargement du contexte

  if (loading) {
    // Pendant le chargement, on peut afficher un spinner ou null
    return <div className="flex items-center justify-center min-h-screen">Vérification de l'authentification...</div>;
  }

  // Si l'utilisateur est connecté, affiche les enfants (la page demandée)
  // Sinon, redirige vers la page de connexion
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;