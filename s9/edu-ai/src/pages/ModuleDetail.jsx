import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useFakeApi } from '../hooks/useFakeApi'
import useProgress from '../hooks/useProgress'
import ProgressBar from '../components/ProgressBar'

export default function ModuleDetail() {
  const { id } = useParams()
  const { getModuleById } = useFakeApi()
  const [mod, setMod] = useState(null)
  const { progress, updateModuleProgress } = useProgress()

  useEffect(() => {
    getModuleById(id).then(setMod)
  }, [id])

  useEffect(() => {
    // Simule 30% de progression dès l’ouverture
    if (mod && !progress.byModule[id]) updateModuleProgress(id, 30)
  }, [mod])

  if (!mod) return <div>Chargement du module…</div>

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{mod.title}</h1>
        <Link to={`/module/${id}/quiz`} className="btn-primary">Commencer le quiz</Link>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="badge">{mod.difficulty}</span>
        <span className="badge">{mod.duration} min</span>
        {mod.tags.map(t => <span key={t} className="badge">{t}</span>)}
      </div>

      <div className="mt-6 card p-4">
        <h2 className="font-semibold mb-2">Résumé</h2>
        <p className="text-gray-700">{mod.summary}</p>
      </div>

      <div className="mt-4 card p-4">
        <h3 className="font-semibold mb-2">Objectifs d’apprentissage</h3>
        <ul className="list-disc pl-6 text-gray-700">
          {mod.objectives?.map((o, i) => <li key={i}>{o}</li>)}
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="font-medium mb-2">Progression</h4>
        <ProgressBar value={progress.byModule[id] || 30} />
      </div>
    </div>
  )
}
