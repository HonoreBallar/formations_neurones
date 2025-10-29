// frontend/src/pages/Dashboard.tsx
import React, { useState, useEffect, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import taskService from '../services/taskService'; // Importe notre service de tâches
import { FaPlus, FaCheckCircle, FaRegCircle, FaTrashAlt } from 'react-icons/fa'; // Icônes pour le design

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  user: string; // ID de l'utilisateur propriétaire
  createdAt: string;
  updatedAt: string;
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Pour l'état de chargement des tâches

  // Fonction pour charger les tâches
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const fetchedTasks = await taskService.getTasks();
      setTasks(fetchedTasks);
      setMessage(null); // Clear any previous messages
    } catch (error: any) {
      setMessage(`Erreur lors du chargement des tâches : ${error}`);
      console.error("Failed to fetch tasks:", error);
      // Si l'erreur est liée à l'authentification (ex: token expiré), déconnecter l'utilisateur
      if (error.includes('authentication') || error.includes('token')) {
        logout(); // Déconnecte l'utilisateur si le token est invalide
      }
    } finally {
      setLoading(false);
    }
  };

  // Charger les tâches au montage du composant
  useEffect(() => {
    if (user) { // S'assurer que l'utilisateur est connecté avant de charger les tâches
      fetchTasks();
    }
  }, [user]); // Dépend de l'objet user du contexte

  // Gérer la création d'une nouvelle tâche
  const handleCreateTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) {
      setMessage('Le titre de la tâche ne peut pas être vide.');
      return;
    }
    try {
      const createdTask = await taskService.createTask({ title: newTaskTitle, description: newTaskDescription });
      setTasks([...tasks, createdTask]); // Ajoute la nouvelle tâche à la liste existante
      setNewTaskTitle(''); // Réinitialise le champ du titre
      setNewTaskDescription(''); // Réinitialise le champ de la description
      setMessage('Tâche ajoutée avec succès !');
    } catch (error: any) {
      setMessage(`Erreur lors de l'ajout de la tâche : ${error}`);
      console.error("Failed to create task:", error);
    }
  };

  // Gérer le basculement de l'état "complété" d'une tâche
  const handleToggleComplete = async (taskId: string, currentCompleted: boolean) => {
    try {
      const updatedTask = await taskService.updateTask(taskId, { completed: !currentCompleted });
      setTasks(tasks.map(task =>
        task._id === taskId ? { ...task, completed: updatedTask.completed } : task
      ));
      setMessage('Tâche mise à jour !');
    } catch (error: any) {
      setMessage(`Erreur lors de la mise à jour de la tâche : ${error}`);
      console.error("Failed to update task:", error);
    }
  };

  // Gérer la suppression d'une tâche
  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      try {
        await taskService.deleteTask(taskId);
        setTasks(tasks.filter(task => task._id !== taskId)); // Supprime la tâche de la liste locale
        setMessage('Tâche supprimée avec succès !');
      } catch (error: any) {
        setMessage(`Erreur lors de la suppression de la tâche : ${error}`);
        console.error("Failed to delete task:", error);
      }
    }
  };

  if (!user) {
    // Ceci ne devrait normalement pas être atteint grâce à PrivateRoute,
    // mais c'est une sécurité.
    return <div className="text-center text-red-500 mt-10">Vous devez être connecté pour voir cette page.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Mes Tâches <span className="text-indigo-600">{user.username}</span>
        </h1>

        {message && (
          <p className={`mb-4 p-3 rounded-md text-center ${message.includes('Erreur') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </p>
        )}

        {/* Formulaire d'ajout de tâche */}
        <form onSubmit={handleCreateTask} className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ajouter une nouvelle tâche</h2>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
            <input
              type="text"
              id="title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Ex: Acheter des légumes"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (optionnel)</label>
            <textarea
              id="description"
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Détails de la tâche..."
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaPlus className="mr-2 mt-1" /> Ajouter la tâche
          </button>
        </form>

        {/* Liste des tâches */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Mes tâches actuelles</h2>
        {loading ? (
          <p className="text-center text-gray-600">Chargement des tâches...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-600">Vous n'avez aucune tâche pour le moment. Ajoutez-en une !</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className={`flex items-center justify-between p-4 rounded-lg shadow-sm transition-all duration-200
                  ${task.completed ? 'bg-green-50 border-l-4 border-green-500' : 'bg-white border-l-4 border-indigo-500'}`}
              >
                <div className="flex-1 mr-4">
                  <h3 className={`text-lg font-semibold ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className={`text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
                      {task.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleToggleComplete(task._id, task.completed)}
                    className={`p-2 rounded-full transition-colors duration-200
                      ${task.completed ? 'bg-green-200 text-green-700 hover:bg-green-300' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    title={task.completed ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
                  >
                    {task.completed ? <FaCheckCircle size={20} /> : <FaRegCircle size={20} />}
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200"
                    title="Supprimer la tâche"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;