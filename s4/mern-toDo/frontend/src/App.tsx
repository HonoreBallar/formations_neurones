// frontend/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'; // Importe le fichier CSS principal de Tailwind

// Importe les composants de pages que nous allons créer
// Pour l'instant, ils sont en commentaire car ils n'existent pas encore.
// Nous les décommenterons au fur et à mesure que nous les créerons.
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // Page principale des tâches
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute'; // Composant pour protéger les routes
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        {/* Ici nous pourrions avoir une barre de navigation ou un header */}
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            {/* Routes publiques */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<h1 className="text-3xl font-bold text-center mt-10">Bienvenue sur la ToDoList !</h1>} />

            {/* Routes privées (nécessitent d'être connecté) */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            {/* Fallback pour les routes non trouvées, ou rediriger vers /login */}
            <Route path="*" element={<h1 className="text-2xl font-bold text-center mt-10 text-red-500">404 - Page non trouvée</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;