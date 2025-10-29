import modules from '../data/modules.json'
import quizzes from '../data/quizzes.json'

const delay = (ms) => new Promise(r => setTimeout(r, ms))

export default function useFakeApi() {
  return {
    getModules: async () => {
      await delay(500) // simule le chargement
      return modules
    },
    getModuleById: async (id) => {
      await delay(400)
      return modules.find(m => m.id === Number(id))
    },
    getQuizByModule: async (id) => {
      await delay(600)
      return quizzes.find(q => q.moduleId === Number(id)) || { moduleId: Number(id), questions: [] }
    },
    getRecommendations: async (profile = {}) => {
      await delay(400)
      // Simple ranking: priorité aux difficultés "Facile", puis "Moyen"
      const sorted = [...modules].sort((a, b) => {
        const rank = (d) => d === 'Facile' ? 0 : d === 'Moyen' ? 1 : 2
        return rank(a.difficulty) - rank(b.difficulty)
      })
      return sorted.slice(0, 3)
    }
  }
}
