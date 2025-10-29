import { Router } from 'express';
import { registerUser, loginUser, updateUserProfile, getUserProfile } from '../contollers/authController'; 
import { protect } from '../middleware/authMiddleware';
const router = Router(); // Crée une nouvelle instance de routeur Express

// Définition des routes
router.post('/register', registerUser); // Route POST pour l'inscription
router.post('/login', loginUser);       // Route POST pour la connexion


// Routes protégées : utilisent le middleware 'protect' avant d'exécuter le contrôleur
router.route('/profile')
  .get(protect, getUserProfile)      // GET pour obtenir le profil
  .put(protect, updateUserProfile);  // PUT pour mettre à jour le profil

// Nouvelle route pour la déconnexion (simple, pas besoin d'un contrôleur dédié côté backend)
// C'est principalement géré côté frontend en supprimant le token.
// Mais on peut avoir une route vide pour la clarté ou pour réinitialiser un cookie si on utilisait des cookies.
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Déconnexion réussie.' });
});

export default router; // Exporte le routeur pour qu'il soit utilisé dans notre application principale