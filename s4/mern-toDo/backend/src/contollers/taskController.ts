import { Request, Response } from 'express';
import Task, { ITask } from '../models/Task'; // Importe notre modèle Task et son interface
import { IUser } from '../models/User'; // Importe l'interface IUser pour la typologie de req.user

// Étendre l'interface Request d'Express pour y inclure notre utilisateur authentifié
declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser; // Assure-toi que cette ligne est cohérente avec authMiddleware.ts
  }
}

/**
 * @desc    Obtenir toutes les tâches de l'utilisateur connecté
 * @route   GET /api/tasks
 * @access  Private
 */
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  // Le middleware 'protect' assure que req.user est défini
  if (!req.user) {
    res.status(401).json({ message: 'Non autorisé, utilisateur non authentifié.' });
    return;
  }

  try {
    // Cherche les tâches appartenant à l'ID de l'utilisateur connecté
    const tasks: ITask[] = await Task.find({ user: req.user._id }).sort({ createdAt: -1 }); // Trie par date de création descendante
    res.status(200).json(tasks);
  } catch (error: any) {
    console.error('Erreur lors de la récupération des tâches :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des tâches.' });
  }
};

/**
 * @desc    Obtenir une tâche spécifique par ID
 * @route   GET /api/tasks/:id
 * @access  Private
 */
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Non autorisé, utilisateur non authentifié.' });
    return;
  }

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ message: 'Tâche non trouvée.' });
      return;
    }

    // S'assurer que la tâche appartient à l'utilisateur connecté
    // Convertir l'ObjectId en string pour la comparaison car req.user._id est un ObjectId
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: 'Non autorisé, cette tâche ne vous appartient pas.' });
      return;
    }

    res.status(200).json(task);
  } catch (error: any) {
    console.error('Erreur lors de la récupération de la tâche par ID :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de la tâche.' });
  }
};


/**
 * @desc    Créer une nouvelle tâche
 * @route   POST /api/tasks
 * @access  Private
 */
export const createTask = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Non autorisé, utilisateur non authentifié.' });
    return;
  }

  const { title, description } = req.body;

  if (!title) {
    res.status(400).json({ message: 'Le titre de la tâche est requis.' });
    return;
  }

  try {
    const newTask: ITask = await Task.create({
      user: req.user._id, // Associe la tâche à l'ID de l'utilisateur connecté
      title,
      description,
    });
    res.status(201).json(newTask); // 201 Created
  } catch (error: any) {
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((err: any) => err.message);
        res.status(400).json({ message: messages.join(', ') });
    } else {
        console.error('Erreur lors de la création de la tâche :', error);
        res.status(500).json({ message: 'Erreur serveur lors de la création de la tâche.' });
    }
  }
};

/**
 * @desc    Mettre à jour une tâche existante
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Non autorisé, utilisateur non authentifié.' });
    return;
  }

  const { title, description, completed } = req.body;

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ message: 'Tâche non trouvée.' });
      return;
    }

    // S'assurer que la tâche appartient à l'utilisateur connecté
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: 'Non autorisé, cette tâche ne vous appartient pas.' });
      return;
    }

    // Mettre à jour les champs
    task.title = title !== undefined ? title : task.title;
    task.description = description !== undefined ? description : task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((err: any) => err.message);
        res.status(400).json({ message: messages.join(', ') });
    } else {
        console.error('Erreur lors de la mise à jour de la tâche :', error);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la tâche.' });
    }
  }
};

/**
 * @desc    Supprimer une tâche
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Non autorisé, utilisateur non authentifié.' });
    return;
  }

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ message: 'Tâche non trouvée.' });
      return;
    }

    // S'assurer que la tâche appartient à l'utilisateur connecté
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: 'Non autorisé, cette tâche ne vous appartient pas.' });
      return;
    }

    await task.deleteOne(); // Mongoose 6+ utilise deleteOne() ou deleteMany()
    res.status(200).json({ message: 'Tâche supprimée avec succès.' });
  } catch (error: any) {
    console.error('Erreur lors de la suppression de la tâche :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de la tâche.' });
  }
};