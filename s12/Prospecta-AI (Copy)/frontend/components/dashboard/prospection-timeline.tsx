"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Play, ArrowRight, Users, Target, BarChart3 } from "lucide-react"

interface TimelineStep {
  id: number
  title: string
  description: string
  agent: {
    name: string
    avatar: string
    role: string
  }
  status: "completed" | "active" | "pending"
  progress: number
  tasks: string[]
  icon: React.ReactNode
}

export function ProspectionTimeline() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const steps: TimelineStep[] = [
    {
      id: 1,
      title: "Recherche et Identification",
      description: "Analyse du marché cible et identification des prospects potentiels",
      agent: {
        name: "Robert",
        avatar: "/ai-agent-robert.png",
        role: "Agent Prospecteur",
      },
      status: currentStep > 0 ? "completed" : "active",
      progress: currentStep > 0 ? 100 : progress,
      tasks: [
        "Analyse des critères de ciblage",
        "Recherche dans les bases de données",
        "Validation des informations de contact",
        "Filtrage des prospects qualifiés",
      ],
      icon: <Target className="h-5 w-5" />,
    },
    {
      id: 2,
      title: "Qualification et Scoring",
      description: "Évaluation et qualification des prospects identifiés",
      agent: {
        name: "Line",
        avatar: "/ai-agent-businesswoman.png",
        role: "Agent Qualificateur",
      },
      status: currentStep > 1 ? "completed" : currentStep === 1 ? "active" : "pending",
      progress: currentStep > 1 ? 100 : currentStep === 1 ? progress : 0,
      tasks: [
        "Analyse comportementale des prospects",
        "Attribution de scores de pertinence",
        "Segmentation par priorité",
        "Enrichissement des profils",
      ],
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: 3,
      title: "Optimisation et Rapport",
      description: "Optimisation des résultats et génération du rapport final",
      agent: {
        name: "Sindika",
        avatar: "/ai-business-analyst.png",
        role: "Agent Optimiseur",
      },
      status: currentStep > 2 ? "completed" : currentStep === 2 ? "active" : "pending",
      progress: currentStep > 2 ? 100 : currentStep === 2 ? progress : 0,
      tasks: [
        "Analyse des performances",
        "Optimisation des critères",
        "Génération du rapport détaillé",
        "Recommandations d'amélioration",
      ],
      icon: <BarChart3 className="h-5 w-5" />,
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentStep((current) => {
            if (current < 3) {
              return current + 1
            }
            clearInterval(timer)
            return current
          })
          return 0
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(timer)
  }, [currentStep])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "active":
        return "bg-blue-500"
      case "pending":
        return "bg-gray-300"
      default:
        return "bg-gray-300"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Terminé</Badge>
      case "active":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En cours</Badge>
      case "pending":
        return <Badge variant="secondary">En attente</Badge>
      default:
        return <Badge variant="secondary">En attente</Badge>
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Timeline Header */}
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-500 ${getStatusColor(step.status)}`}
                >
                  {step.status === "completed" ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : step.status === "active" ? (
                    <Play className="h-6 w-6" />
                  ) : (
                    <Clock className="h-6 w-6" />
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p className="font-medium text-sm">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.agent.name}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        step.status === "completed"
                          ? "bg-green-500 w-full"
                          : step.status === "active"
                            ? "bg-blue-500"
                            : "bg-gray-200 w-0"
                      }`}
                      style={{
                        width:
                          step.status === "active" ? `${step.progress}%` : step.status === "completed" ? "100%" : "0%",
                      }}
                    />
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 mx-auto mt-1" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Agent Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <Card
            key={step.id}
            className={`transition-all duration-500 ${
              step.status === "active"
                ? "ring-2 ring-blue-500 shadow-lg scale-105"
                : step.status === "completed"
                  ? "ring-2 ring-green-500"
                  : ""
            }`}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4">
                <img
                  src={step.agent.avatar || "/placeholder.svg"}
                  alt={step.agent.name}
                  className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-lg"
                />
              </div>
              <CardTitle className="flex items-center justify-center gap-2">
                {step.icon}
                {step.agent.name}
              </CardTitle>
              <CardDescription>{step.agent.role}</CardDescription>
              {getStatusBadge(step.status)}
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>

              {step.status === "active" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression</span>
                    <span>{Math.round(step.progress)}%</span>
                  </div>
                  <Progress value={step.progress} className="h-2" />
                </div>
              )}

              <div className="space-y-2">
                <h5 className="font-medium text-sm">Tâches:</h5>
                <ul className="space-y-1">
                  {step.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-center gap-2 text-sm">
                      {step.status === "completed" ? (
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      ) : step.status === "active" && taskIndex < Math.floor(step.progress / 25) ? (
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      ) : step.status === "active" && taskIndex === Math.floor(step.progress / 25) ? (
                        <div className="w-4 h-4 border-2 border-blue-500 rounded-full animate-spin flex-shrink-0" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex-shrink-0" />
                      )}
                      <span
                        className={
                          step.status === "completed" ||
                          (step.status === "active" && taskIndex <= Math.floor(step.progress / 25))
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }
                      >
                        {task}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {step.status === "active" && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">
                    {step.agent.name} travaille actuellement sur cette étape...
                  </p>
                </div>
              )}

              {step.status === "completed" && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    ✓ Étape terminée avec succès par {step.agent.name}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-6">
        <Button variant="outline">Voir les détails</Button>
        <Button>Aller au dashboard</Button>
      </div>
    </div>
  )
}
