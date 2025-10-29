// frontend/src/pages/Profile.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService'; // Utilise le service auth pour les appels API

interface UserProfile {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const Profile: React.FC = () => {
  const { user, login: authContextLogin, logout } = useAuth(); // Récupère l'utilisateur et la fonction login du contexte
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user || !user.token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        // Puisque getProfile est une nouvelle route sur /api/auth/profile,
        // il faut soit l'ajouter à authService, soit faire la requête axios directement ici.
        // Pour simplifier, ajoutons une fonction getProfile à authService.
        const response = await authService.getProfile() as any; // Supposant que getProfile existe dans authService
        setProfile(response);
        setUsername(response.username);
        setEmail(response.email);
        setMessage(null);
      } catch (error: any) {
        setMessage(`Erreur lors du chargement du profil : ${error}`);
        console.error("Failed to fetch profile:", error);
        if (error.includes('authentification') || error.includes('token')) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, logout]); // Dépend de l'objet user et de la fonction logout

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (password && password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const updatedData: { username?: string; email?: string; password?: string } = {};
      if (username !== profile?.username) updatedData.username = username;
      if (email !== profile?.email) updatedData.email = email;
      if (password) updatedData.password = password;

      if (Object.keys(updatedData).length === 0) {
        setMessage('Aucune modification à enregistrer.');
        return;
      }

      const updatedUser = await authService.updateProfile(updatedData); // Supposant que updateProfile existe dans authService
      authContextLogin(updatedUser); // Met à jour le contexte avec les nouvelles infos (et le nouveau token si généré)
      setProfile(updatedUser); // Met à jour l'état local du profil
      setPassword(''); // Réinitialise le champ mot de passe
      setConfirmPassword(''); // Réinitialise le champ de confirmation
      setMessage('Profil mis à jour avec succès !');
    } catch (error: any) {
      setMessage(error || 'Erreur lors de la mise à jour du profil.');
      console.error("Failed to update profile:", error);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Chargement du profil...</div>;
  }

  if (!profile) {
    return <div className="text-center text-red-500 mt-10">Impossible de charger le profil.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-teal-600 p-6">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Mon Profil</h2>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="text-sm text-gray-500">
            Laissez le mot de passe vide si vous ne souhaitez pas le changer.
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Mettre à jour le profil
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center ${message.includes('succès') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;