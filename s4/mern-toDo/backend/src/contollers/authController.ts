import { Request, Response } from 'express';
import User from '../models/User'; // Importe notre modèle User
import jwt from 'jsonwebtoken'; // Pour générer des JSON Web Tokens
import dotenv from 'dotenv';


dotenv.config(); // Charge les variables d'environnement

// Clé secrète pour signer les JWT (à définir dans .env)
const jwtSecret = process.env.JWT_SECRET || 'supersecretkey'; // Fallback pour le développement, mais À NE PAS FAIRE EN PROD !

// Fonction utilitaire pour générer un JWT
const generateToken = (id: string): string => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: '1h' }); // Token valide 1 heure
};

/**
 * @desc    Inscrire un nouvel utilisateur
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body; // Récupère les données du corps de la requête

  // 1. Validation de base des champs (Clean Code: validation initiale)
  if (!username || !email || !password) {
    res.status(400).json({ message: 'Veuillez entrer tous les champs requis.' });
    return;
  }

  try {
    // 2. Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà.' });
      return;
    }

    // 3. Créer un nouvel utilisateur (le hachage du mot de passe se fait via le middleware 'pre-save' du modèle User)
    const user = await User.create({
      username,
      email,
      password
    });

    // 4. Si l'utilisateur est créé avec succès, générer un token et renvoyer la réponse
    if (user) {
      const token = generateToken(user._id.toString()); // Convertir l'ID Mongoose en string
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token // Envoyer le token au client
      });
    } else {
      res.status(400).json({ message: 'Données utilisateur invalides.' });
    }
  } catch (error: any) {
    // 5. Gestion des erreurs (ex: validation Mongoose, duplication de username/email non attrapée plus haut)
    if (error.code === 11000) { // Erreur de duplication MongoDB
        res.status(400).json({ message: 'Le nom d\'utilisateur ou l\'email est déjà utilisé.' });
    } else if (error.name === 'ValidationError') { // Erreur de validation Mongoose
        const messages = Object.values(error.errors).map((err: any) => err.message);
        res.status(400).json({ message: messages.join(', ') });
    } else {
        console.error('Erreur lors de l\'inscription de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur serveur lors de l\'inscription.' });
    }
  }
};

/**
 * @desc    Authentifier un utilisateur et obtenir un token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // 1. Validation de base des champs
  if (!email || !password) {
    res.status(400).json({ message: 'Veuillez entrer l\'email et le mot de passe.' });
    return;
  }

  try {
    // 2. Trouver l'utilisateur par email (en incluant le mot de passe hashé pour la comparaison)
    // .select('+password') est nécessaire car le mot de passe est 'select: false' par défaut dans le modèle
    const user = await User.findOne({ email }).select('+password');

    // 3. Vérifier si l'utilisateur existe et si le mot de passe est correct
    if (user && (await user.comparePassword(password))) {
      const token = generateToken(user._id.toString());
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token
      });
    } else {
      // 4. Si l'utilisateur n'est pas trouvé ou le mot de passe est incorrect
      res.status(401).json({ message: 'Email ou mot de passe invalide.' });
    }
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la connexion.' });
  }
};


/**
 * @desc    Mettre à jour le profil de l'utilisateur
 * @route   PUT /api/auth/profile
 * @access  Private
 */
export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  // req.user est disponible grâce au middleware 'protect'
  if (!req.user) {
    res.status(401).json({ message: 'Non autorisé, utilisateur non authentifié.' });
    return;
  }

  const user = await User.findById(req.user._id);

  if (user) {
    // Mettre à jour les champs si fournis dans la requête
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    // Si un nouveau mot de passe est fourni, le hacher
    if (req.body.password) {
      // Le middleware 'pre-save' de User.ts se chargera du hachage
      user.password = req.body.password;
    }

    try {
        const updatedUser = await user.save(); // Sauvegarder les modifications

        res.status(200).json({
          _id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          // Pas besoin de renvoyer le token ici, l'utilisateur est déjà connecté
        });
    } catch (error: any) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'L\'email ou le nom d\'utilisateur est déjà pris.' });
        } else if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err: any) => err.message);
            res.status(400).json({ message: messages.join(', ') });
        } else {
            console.error('Erreur lors de la mise à jour du profil :', error);
            res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du profil.' });
        }
    }
  } else {
    res.status(404).json({ message: 'Utilisateur non trouvé.' });
  }
};

/**
 * @desc    Obtenir les détails du profil de l'utilisateur connecté
 * @route   GET /api/auth/profile
 * @access  Private
 */
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  // req.user est disponible grâce au middleware 'protect'
  if (!req.user) {
    res.status(401).json({ message: 'Non autorisé, utilisateur non authentifié.' });
    return;
  }

  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } else {
    res.status(404).json({ message: 'Utilisateur non trouvé.' });
  }
};

/**
 * @desc    Obtenir les données du profil utilisateur
 * @route   GET /api/auth/profile
 * @access  Private
 */
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Non autorisé, utilisateur non authentifié.' });
    return;
  }
  try {
    // Sélectionne les champs à envoyer, exclut le mot de passe
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
  } catch (error: any) {
    console.error('Erreur lors de la récupération du profil :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération du profil.' });
  }
};

/**
 * @desc    Mettre à jour les données du profil utilisateur
 * @route   PUT /api/auth/profile
 * @access  Private
 */
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Non autorisé, utilisateur non authentifié.' });
    return;
  }

  const { username, email, password } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
      return;
    }

    // Mettre à jour les champs si fournis
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      // Si un nouveau mot de passe est fourni, le hasher
      user.password = password; // Le hook pre-save de Mongoose dans User.ts le hash automatiquement
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      token: generateToken(updatedUser._id as string), // Générer un nouveau token au cas où les infos changent
    });
  } catch (error: any) {
    if (error.code === 11000) { // Erreur de duplicata (ex: email déjà pris)
        res.status(400).json({ message: 'Cet email est déjà enregistré.' });
    } else if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((err: any) => err.message);
        res.status(400).json({ message: messages.join(', ') });
    } else {
        console.error('Erreur lors de la mise à jour du profil :', error);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du profil.' });
    }
  }
};
