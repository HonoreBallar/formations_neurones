import { Schema, model, Document, Types } from 'mongoose';

// 1. Définir l'interface pour le document tâche
export interface ITask extends Document {
  _id: Types.ObjectId | string; // Ajouté pour la cohérence avec IUser
  user: Types.ObjectId; // Référence à l'utilisateur qui a créé la tâche
  title: string;
  description?: string; // Optionnel
  completed: boolean; // Statut de la tâche (terminée ou non)
  createdAt: Date;
  updatedAt: Date;
}

// 2. Définir le schéma Mongoose
const TaskSchema = new Schema<ITask>({
  user: {
    type: Schema.Types.ObjectId, // Le type est un ID d'objet Mongoose
    required: true,
    ref: 'User' // Fait référence au modèle 'User' que nous avons déjà créé
  },
  title: {
    type: String,
    required: [true, 'Le titre de la tâche est requis'],
    trim: true,
    minlength: [3, 'Le titre doit contenir au moins 3 caractères']
  },
  description: {
    type: String,
    trim: true,
    default: '' // Valeur par défaut si non fournie
  },
  completed: {
    type: Boolean,
    required: true,
    default: false // Par défaut, une tâche n'est pas terminée
  }
}, {
  timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

// 3. Créer et exporter le modèle
const Task = model<ITask>('Task', TaskSchema);
export default Task;