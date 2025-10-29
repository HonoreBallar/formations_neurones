import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User'; // Importe le modèle User et son interface
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || 'supersecretkey'; // Assure-toi que cette clé est la même que celle utilisée pour la signature

// Étendre l'interface Request d'Express pour y ajouter la propriété 'user'
// C'est une astuce TypeScript pour dire que notre middleware ajoutera 'user' à l'objet Request
declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser; // Nous allons ajouter l'utilisateur authentifié ici
  }
}

/**
 * @desc    Middleware pour protéger les routes
 * Vérifie si un token JWT est présent et valide dans l'en-tête 'Authorization'
 * @access  Private
 */
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  // 1. Vérifier si le token est présent dans les headers (format: "Bearer TOKEN")
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extraire le token
      token = req.headers.authorization.split(' ')[1];

      // Décoder le token (vérifier sa validité et sa signature)
      const decoded = jwt.verify(token, jwtSecret) as { id: string }; // Caster le résultat pour TypeScript

      // Trouver l'utilisateur correspondant à l'ID dans le token
      // On ne veut PAS le mot de passe, donc .select('-password') est inutile ici grâce au 'select: false' du modèle
      const user = await User.findById(decoded.id);

      if (!user) {
        res.status(401).json({ message: 'Token invalide, utilisateur non trouvé.' });
        return;
      }

      // Attacher l'utilisateur à l'objet Request pour les routes suivantes
      req.user = user;
      next(); // Passe au prochain middleware ou à la fonction de route
    } catch (error) {
      console.error('Erreur de vérification du token :', error);
      res.status(401).json({ message: 'Non autorisé, token invalide ou expiré.' });
    }
  }

  // Si aucun token n'est trouvé
  if (!token) {
    res.status(401).json({ message: 'Non autorisé, aucun token fourni.' });
  }
};
