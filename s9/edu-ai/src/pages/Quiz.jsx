import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFakeApi } from '../hooks/useFakeApi'
import useProgress from '../hooks/useProgress'

export default function Quiz() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getQuizByModule } = useFakeApi()
  const { setLastScore, updateModuleProgress } = useProgress()

  const [quiz, setQuiz] = useState(null)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    getQuizByModule(id).then(setQuiz)
  }, [id])

  const current = useMemo(() => quiz?.questions?.[index], [quiz, index])

  const selectAnswer = (i) => {
    setAnswers(a => {
      const copy = [...a]
      copy[index] = i
      return copy
    })
  }

  const next = () => {
    if (index < (quiz?.questions?.length || 0) - 1) {
      setIndex(index + 1)
    } else {
      // Calcul score
      const total = quiz.questions.length
      const correct = quiz.questions.reduce((acc, q, i) => acc + (answers[i] === q.answerIndex ? 1 : 0), 0)
      const pct = Math.round((correct / total) * 100)
      setLastScore(pct)
      updateModuleProgress(id, 100)
      navigate('/')
    }
  }

  if (!quiz) return <div>Chargement du quiz…</div>
  if (!quiz.questions.length) return <div>Pas de questions pour ce module.</div>

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-2">Quiz du module {id}</h1>
      <p className="text-gray-600 mb-4">Question {index + 1} / {quiz.questions.length}</p>

      <div className="card p-4">
        <p className="font-medium mb-4">{current.prompt}</p>
        <div className="space-y-2">
          {current.options.map((opt, i) => {
            const isSelected = answers[index] === i
            return (
              <button
                key={i}
                onClick={() => selectAnswer(i)}
                className={`w-full text-left rounded-lg border px-3 py-2 ${isSelected ? 'border-brand-600 bg-brand-50' : 'border-gray-200 hover:bg-gray-50'}`}
              >
                {opt}
              </button>
            )
          })}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {typeof answers[index] === 'number'
              ? (answers[index] === current.answerIndex ? 'Bonne réponse' : 'Mauvaise réponse') + ' — ' + current.explanation
              : 'Sélectionne une réponse'}
          </span>
          <button className="btn-primary" onClick={next}>
            {index < quiz.questions.length - 1 ? 'Suivant' : 'Terminer'}
          </button>
        </div>
      </div>
    </div>
  )
}
