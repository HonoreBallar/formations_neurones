import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs'; // Pour le hachage des mots de passe

// 1. Définir l'interface pour le document utilisateur
// C'est la partie TypeScript qui nous assure la sécurité des types
export interface IUser extends Document {
  _id: Types.ObjectId | string,  
  username: string;
  email: string;
  password?: string; // Le mot de passe sera haché, et parfois non présent (ex: après connexion)
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>; // Méthode pour comparer les mots de passe
}

// 2. Définir le schéma Mongoose
// C'est la partie Mongoose qui définit la structure de notre collection MongoDB
const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Le nom d\'utilisateur est requis'], // Champ obligatoire
    unique: true, // Doit être unique dans la base de données
    trim: true, // Supprime les espaces blancs au début et à la fin
    minlength: [3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères']
  },
  email: {
    type: String,
    required: [true, 'L\'adresse email est requise'],
    unique: true,
    trim: true,
    lowercase: true, // Convertit l'email en minuscules avant de le sauvegarder
    match: [/.+@.+\..+/, 'Veuillez entrer une adresse email valide'] // Validation de format simple
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères'],
    select: false // Important : ne renvoie pas le mot de passe lors des requêtes find par défaut
  }
}, {
  timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

// 3. Middleware Mongoose pour hacher le mot de passe avant de sauvegarder
// C'est une "pré-action" qui s'exécute avant que le document ne soit sauvegardé
UserSchema.pre<IUser>('save', async function(next) {
  // Ne hache le mot de passe que s'il a été modifié (ou est nouveau)
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10); // Génère un "sel" (nombre aléatoire)
    this.password = await bcrypt.hash(this.password!, salt); // Hache le mot de passe avec le sel
    next(); // Passe à l'étape suivante (sauvegarde)
  } catch (error: any) {
    next(error); // Passe l'erreur au prochain middleware
  }
});

// 4. Méthode pour comparer les mots de passe (utilisée lors de la connexion)
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  // Compare le mot de passe fourni avec le mot de passe haché stocké
  return await bcrypt.compare(candidatePassword, this.password!);
};

// 5. Créer et exporter le modèle
const User = model<IUser>('User', UserSchema);
export default User;