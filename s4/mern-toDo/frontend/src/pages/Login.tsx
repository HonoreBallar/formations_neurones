// frontend/src/pages/Login.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService'; // Importe notre service d'authentification
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login: authContextLogin } = useAuth();

  // Redirige si déjà connecté
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      // Appel à la fonction de connexion de notre service
      const userData = await authService.login({ email, password });
      authContextLogin(userData);
      setMessage('Connexion réussie ! Redirection...');
      setTimeout(() =>
        navigate('/dashboard')
      , 250);
    } catch (error: any) {
      setMessage(error || 'Erreur lors de la connexion.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-700">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Connexion</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Se connecter
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center ${message.includes('succès') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
        <p className="mt-6 text-center text-sm text-gray-600">
          Pas encore de compte ?{' '}
          <button
            onClick={() => navigate('/register')}
            className="font-medium text-purple-600 hover:text-purple-500 focus:outline-none"
          >
            Inscris-toi ici
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;