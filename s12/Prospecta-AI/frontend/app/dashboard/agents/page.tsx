"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Target, Users, BarChart3, Activity, Clock, CheckCircle } from "lucide-react"

const agents = [
  {
    id: 1,
    name: "Robert",
    role: "Agent Prospecteur",
    avatar: "/ai-agent-robert.png",
    description: "Spécialisé dans la recherche et l'identification de prospects qualifiés",
    status: "active",
    currentTask: "Analyse du marché technologique français",
    completedTasks: 247,
    successRate: 94,
    specialties: ["Recherche de prospects", "Analyse de marché", "Validation de contacts"],
    icon: <Target className="h-6 w-6" />,
    color: "blue",
  },
  {
    id: 2,
    name: "Line",
    role: "Agent Qualificateur",
    avatar: "/ai-agent-businesswoman.png",
    description: "Experte en qualification et scoring de prospects",
    status: "active",
    currentTask: "Qualification des prospects SaaS",
    completedTasks: 189,
    successRate: 97,
    specialties: ["Scoring de prospects", "Analyse comportementale", "Segmentation"],
    icon: <Users className="h-6 w-6" />,
    color: "green",
  },
  {
    id: 3,
    name: "Sindika",
    role: "Agent Optimiseur",
    avatar: "/ai-business-analyst.png",
    description: "Spécialisé dans l'optimisation et l'analyse des performances",
    status: "idle",
    currentTask: "En attente de nouvelles données",
    completedTasks: 156,
    successRate: 99,
    specialties: ["Optimisation", "Analyse de performance", "Rapports détaillés"],
    icon: <BarChart3 className="h-6 w-6" />,
    color: "purple",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>
    case "idle":
      return <Badge variant="secondary">En attente</Badge>
    case "maintenance":
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Maintenance</Badge>
    default:
      return <Badge variant="secondary">Inconnu</Badge>
  }
}

const getColorClasses = (color: string) => {
  switch (color) {
    case "blue":
      return "border-blue-200 bg-blue-50"
    case "green":
      return "border-green-200 bg-green-50"
    case "purple":
      return "border-purple-200 bg-purple-50"
    default:
      return "border-gray-200 bg-gray-50"
  }
}

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Agents IA</h1>
        <p className="text-muted-foreground">Gérez et surveillez vos agents IA spécialisés dans la prospection</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Agents Actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">592</p>
                <p className="text-sm text-muted-foreground">Tâches Terminées</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">96.7%</p>
                <p className="text-sm text-muted-foreground">Taux de Réussite</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-sm text-muted-foreground">Disponibilité</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card
            key={agent.id}
            className={`transition-all duration-300 hover:shadow-lg ${getColorClasses(agent.color)}`}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4">
                <img
                  src={agent.avatar || "/placeholder.svg"}
                  alt={agent.name}
                  className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg"
                />
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                {agent.icon}
                <CardTitle>{agent.name}</CardTitle>
              </div>
              <CardDescription className="font-medium">{agent.role}</CardDescription>
              {getStatusBadge(agent.status)}
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">{agent.description}</p>

              {/* Current Task */}
              <div className="p-3 bg-white rounded-lg border">
                <h4 className="font-medium text-sm mb-1">Tâche Actuelle:</h4>
                <p className="text-sm text-muted-foreground">{agent.currentTask}</p>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{agent.completedTasks}</p>
                  <p className="text-xs text-muted-foreground">Tâches Terminées</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{agent.successRate}%</p>
                  <p className="text-xs text-muted-foreground">Taux de Réussite</p>
                </div>
              </div>

              {/* Success Rate Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Performance</span>
                  <span>{agent.successRate}%</span>
                </div>
                <Progress value={agent.successRate} className="h-2" />
              </div>

              {/* Specialties */}
              <div>
                <h5 className="font-medium text-sm mb-2">Spécialités:</h5>
                <div className="flex flex-wrap gap-1">
                  {agent.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  Voir Détails
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  Configurer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
