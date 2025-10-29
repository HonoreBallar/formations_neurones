import { useState } from 'react'

// Stockage local simple pour la démo
export default function useProgress() {
  const [progress, setProgress] = useState(() => {
    const raw = localStorage.getItem('progress')
    return raw ? JSON.parse(raw) : { byModule: {}, lastScore: null }
  })

  const save = (next) => {
    setProgress(next)
    localStorage.setItem('progress', JSON.stringify(next))
  }

  const updateModuleProgress = (moduleId, pct) => {
    const byModule = { ...progress.byModule, [moduleId]: pct }
    save({ ...progress, byModule })
  }

  const setLastScore = (score) => {
    save({ ...progress, lastScore: score })
  }

  return { progress, updateModuleProgress, setLastScore }
}
