import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useFakeApi from '../hooks/useFakeApi'
import useProgress from '../hooks/useProgress'
import ProgressBar from '../components/ProgressBar'

export default function Dashboard() {
  const { getRecommendations } = useFakeApi()
  const [recs, setRecs] = useState(null)
  const { progress } = useProgress()

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}')
    getRecommendations(profile).then(setRecs)
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-gray-600">Parcours personnalisé basé sur ton profil.</p>
        </div>
        <Link to="/onboarding" className="btn-ghost">Ajuster mon profil</Link>
      </div>

      {!recs ? (
        <div className="text-gray-500">Chargement des recommandations…</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {recs.map(m => (
            <div key={m.id} className="card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{m.title}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="badge">{m.difficulty}</span>
                    <span className="badge">{m.duration} min</span>
                    {m.tags.map(t => <span key={t} className="badge">{t}</span>)}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3">{m.summary}</p>
              <p className="text-xs text-gray-500 mt-2">Pourquoi: {m.recommendationReason}</p>

              <div className="mt-4">
                <ProgressBar value={progress.byModule[m.id] || 0} />
                <div className="mt-3 flex items-center justify-between">
                  <Link to={`/module/${m.id}`} className="btn-primary">Ouvrir</Link>
                  <span className="text-xs text-gray-500">
                    Progression: {progress.byModule[m.id] || 0}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 card p-4">
        <h4 className="font-semibold mb-2">Dernier score</h4>
        <p className="text-gray-600">
          {typeof (progress.lastScore) === 'number' ? `${progress.lastScore}%` : 'Aucun quiz réalisé pour le moment.'}
        </p>
      </div>
    </div>
  )
}
