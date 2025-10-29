// frontend/src/services/taskService.ts
import axios from 'axios';

// L'URL de base de notre API backend pour les tâches
const API_URL = 'http://localhost:5000/api/tasks/';

// Fonction utilitaire pour obtenir le token de l'utilisateur
const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.token;
};

// Configuration des headers avec le token d'authentification
const getConfig = () => {
  const token = getToken();
  if (!token) {
    // Gérer le cas où il n'y a pas de token (utilisateur non connecté)
    // Cela devrait normalement être géré par PrivateRoute, mais c'est une sécurité.
    throw new Error('No authentication token found.');
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Obtenir toutes les tâches de l'utilisateur connecté
const getTasks = async () => {
  try {
    const response = await axios.get(API_URL, getConfig());
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

// Créer une nouvelle tâche
const createTask = async (taskData: { title: string; description: string }) => {
  try {
    const response = await axios.post(API_URL, taskData, getConfig());
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

// Mettre à jour une tâche (ex: marquer comme complétée)
const updateTask = async (taskId: string, taskData: { title?: string; description?: string; completed?: boolean }) => {
  try {
    const response = await axios.put(API_URL + taskId, taskData, getConfig());
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

// Supprimer une tâche
const deleteTask = async (taskId: string) => {
  try {
    const response = await axios.delete(API_URL + taskId, getConfig());
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

const taskService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

export default taskService;