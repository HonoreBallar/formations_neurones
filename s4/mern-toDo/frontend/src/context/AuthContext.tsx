// frontend/src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import authService from '../services/authService'; // Notre service pour la déconnexion

// Interface pour les données de l'utilisateur stockées
interface UserData {
  _id: string;
  username: string;
  email: string;
  token: string;
}

// Interface pour le contexte d'authentification
interface AuthContextType {
  user: UserData | null; // L'utilisateur connecté ou null
  login: (userData: UserData) => void; // Fonction pour définir l'utilisateur après login/register
  logout: () => void; // Fonction pour déconnecter l'utilisateur
  loading: boolean; // État de chargement initial du contexte
}

// Création du contexte avec des valeurs par défaut
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props pour le AuthProvider
interface AuthProviderProps {
  children: ReactNode; // Représente les enfants que ce fournisseur enveloppera
}

// Composant Fournisseur de Contexte
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Pour gérer le chargement initial

  // Au chargement initial de l'application, vérifier si un utilisateur est déjà connecté (via localStorage)
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser: UserData = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur depuis localStorage:", error);
      localStorage.removeItem('user'); // Nettoyer en cas d'erreur de parsing
    } finally {
      setLoading(false); // Le chargement initial est terminé
    }
  }, []);

  // Fonction appelée après une connexion ou inscription réussie
  const handleLogin = (userData: UserData) => {
    setUser(userData);
    // Le stockage dans localStorage est déjà géré par authService, mais on peut le faire ici aussi si on veut.
    // localStorage.setItem('user', JSON.stringify(userData));
  };

  // Fonction appelée pour la déconnexion
  const handleLogout = () => {
    setUser(null);
    authService.logout(); // Appelle la fonction de déconnexion de notre service
  };

  // Les valeurs que le contexte fournira à ses consommateurs
  const contextValue = {
    user,
    login: handleLogin,
    logout: handleLogout,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? ( // Optionnel: afficher un loader pendant le chargement initial
        <div className="flex items-center justify-center min-h-screen">Chargement de l'application...</div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour consommer le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};