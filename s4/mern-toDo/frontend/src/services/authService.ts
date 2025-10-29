// frontend/src/services/authService.ts
import axios, { AxiosRequestConfig } from 'axios';

// L'URL de base de notre API backend
const API_URL = 'http://localhost:5000/api/auth/';

const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.token;
};

// Définir getConfig AVANT les fonctions qui l'utilisent
const getConfig = (): AxiosRequestConfig => {
  const token = getToken();
  if (!token) {
    throw new Error('No authentication token found. Please log in.');
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } as AxiosRequestConfig;
};


// Fonction pour l'inscription d'un utilisateur
const register = async (userData: any) => {
  try {
    const response = await axios.post(API_URL + 'register', userData) as any;
    // Si l'inscription réussit, le backend renvoie un token et les infos utilisateur.
    // On les stocke dans le localStorage du navigateur.
    if (response?.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error: any) {
    // Gérer les erreurs (ex: email déjà pris, mot de passe trop court)
    throw error.response.data.message || error.message;
  }
};

// Fonction pour la connexion d'un utilisateur
const login = async (userData: any) => {
  try {
    const response = await axios.post(API_URL + 'login', userData) as any;
    if (response?.data?.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error: any) {
    throw error.response.data.message || error.message;
  }
};

// Obtenir les données du profil utilisateur
const getProfile = async () => {
  try {
    const response = await axios.get(API_URL + 'profile', getConfig());
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

// Mettre à jour les données du profil utilisateur
const updateProfile = async (userData: any) => {
  try {
    const response = await axios.put(API_URL + 'profile', userData, getConfig()) as any;
    // Si la mise à jour réussit, le backend renvoie le nouvel utilisateur et un token potentiellement mis à jour.
    // Mettre à jour le localStorage et le contexte AuthContext
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};


// Fonction pour la déconnexion de l'utilisateur
const logout = () => {
  localStorage.removeItem('user'); // Supprime les informations utilisateur du localStorage
};

// Objet exportant toutes nos fonctions d'authentification
const authService = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
};

export default authService;