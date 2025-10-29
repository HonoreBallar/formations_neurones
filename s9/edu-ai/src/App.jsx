import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import ModuleDetail from './pages/ModuleDetail'
import Quiz from './pages/Quiz'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="container-p py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/module/:id" element={<ModuleDetail />} />
          <Route path="/module/:id/quiz" element={<Quiz />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="py-8 text-center text-sm text-gray-500">
        Hackathon · IA pour l’éducation personnalisée
      </footer>
    </div>
  )
}

function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold mb-2">Page introuvable</h1>
      <p className="mb-4">La route demandée n’existe pas.</p>
      <button className="btn-primary" onClick={() => navigate('/')}>Retour au dashboard</button>
    </div>
  )
}
