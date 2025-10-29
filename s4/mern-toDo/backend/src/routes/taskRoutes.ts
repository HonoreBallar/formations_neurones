import { Router } from 'express';
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from '../contollers/taskController'; // Importe les fonctions du contrôleur
import { protect } from '../middleware/authMiddleware'; // Importe notre middleware de protection

const router = Router();

// Toutes ces routes utiliseront le middleware 'protect'
// pour s'assurer que seul un utilisateur authentifié peut y accéder et manipuler SES tâches.

router.route('/')
  .get(protect, getTasks)  // GET /api/tasks pour toutes les tâches de l'utilisateur
  .post(protect, createTask); // POST /api/tasks pour créer une nouvelle tâche

router.route('/:id') // Les routes avec un ID de tâche spécifique
  .get(protect, getTaskById)    // GET /api/tasks/:id pour une tâche spécifique
  .put(protect, updateTask)     // PUT /api/tasks/:id pour mettre à jour une tâche
  .delete(protect, deleteTask); // DELETE /api/tasks/:id pour supprimer une tâche

export default router;