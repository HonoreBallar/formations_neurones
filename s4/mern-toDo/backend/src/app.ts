import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes'; 
import taskRoutes from './routes/taskRoutes'; 

// Charge les variables d'environnement du fichier .env
dotenv.config();

const app = express();
const port = process.env.PORT || 5000; // Le port de notre serveur, 5000 par défaut

// --- Middlewares globaux ---
// Permet à notre application Express de lire le JSON envoyé dans le corps des requêtes
app.use(express.json());

// Active CORS pour permettre les requêtes du frontend
app.use(cors());

// --- Connexion à MongoDB ---
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("Erreur : La variable d'environnement MONGO_URI n'est pas définie.");
  process.exit(1); // Arrête l'application si la URI n'est pas configurée
}

mongoose.connect(mongoUri)
  .then(() => console.log('Connexion à MongoDB Atlas réussie !'))
  .catch(err => {
    console.error('Erreur de connexion à MongoDB Atlas :', err);
    process.exit(1); // Arrête l'application en cas d'erreur de connexion
  });

// --- Routes de base (pour tester) ---
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API ToDoList MERN !');
});

// --- Routes API ---
// Chaque route d'authentification sera préfixée par /api/auth
app.use('/api/auth', authRoutes);

// Routes des tâches, préfixées par /api/tasks
app.use('/api/tasks', taskRoutes);

// --- Démarrage du serveur ---
app.listen(port, () => {
  console.log(`Le serveur backend est en cours d'exécution sur le port ${port}`);
  console.log(`Accès : http://localhost:${port}`);
});