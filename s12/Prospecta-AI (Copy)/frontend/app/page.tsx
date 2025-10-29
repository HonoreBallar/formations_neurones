"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Bot, Target, TrendingUp, Users, Zap, Star, Activity, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

function AgentCard({ agent, delay }: { agent: any; delay: number }) {
  const [progress, setProgress] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true)
      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressTimer)
            return 100
          }
          return prev + Math.random() * 3
        })
      }, 150)

      return () => clearInterval(progressTimer)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <Card className={`border-border transition-all duration-500 ${isActive ? "ring-2 ring-accent shadow-lg" : ""}`}>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 relative">
          <img
            src={agent.avatar || "/placeholder.svg"}
            alt={agent.name}
            className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-lg"
          />
          {isActive && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Activity className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
        <CardTitle className="text-foreground flex items-center justify-center gap-2">
          {agent.icon}
          {agent.name}
        </CardTitle>
        <CardDescription>{agent.role}</CardDescription>
        <Badge className={isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
          {isActive ? "Actif" : "En attente"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground text-center">{agent.description}</p>

        {isActive && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progression</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <div className="space-y-2">
          <h5 className="font-medium text-sm">Tâches actuelles:</h5>
          <ul className="space-y-1">
            {agent.tasks.map((task: string, index: number) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                {isActive && index < Math.floor(progress / 33) ? (
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                ) : isActive && index === Math.floor(progress / 33) ? (
                  <div className="w-4 h-4 border-2 border-accent rounded-full animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex-shrink-0" />
                )}
                <span
                  className={
                    isActive && index <= Math.floor(progress / 33) ? "text-foreground" : "text-muted-foreground"
                  }
                >
                  {task}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {progress >= 100 && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800 font-medium">✓ Tâches terminées par {agent.name}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function AgentsSimulation() {
  const agents = [
    {
      name: "Robert",
      role: "Agent Prospecteur",
      avatar: "/ai-agent-robert.png",
      description: "Recherche et identifie automatiquement les prospects potentiels selon vos critères",
      icon: <Target className="h-5 w-5" />,
      tasks: ["Analyse du marché", "Recherche prospects", "Validation contacts"],
    },
    {
      name: "Line",
      role: "Agent Qualificateur",
      avatar: "/ai-agent-businesswoman.png",
      description: "Évalue et score chaque prospect selon sa probabilité de conversion",
      icon: <Users className="h-5 w-5" />,
      tasks: ["Scoring prospects", "Analyse comportementale", "Segmentation"],
    },
    {
      name: "Sindika",
      role: "Agent Optimiseur",
      avatar: "/ai-business-analyst.png",
      description: "Optimise continuellement vos campagnes pour améliorer les performances",
      icon: <TrendingUp className="h-5 w-5" />,
      tasks: ["Optimisation campagnes", "Analyse performance", "Recommandations"],
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {agents.map((agent, index) => (
        <AgentCard key={agent.name} agent={agent} delay={index * 2000} />
      ))}
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold text-foreground">Prospecta AI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              À propos
            </a>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Fonctionnalités
            </a>
            <a href="#agents" className="text-muted-foreground hover:text-foreground transition-colors">
              Agents
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Témoignages
            </a>
          </nav>
          <Link href="/dashboard">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Tableau de bord
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent border-accent/20">
            Intelligence Artificielle Avancée
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Générez des prospects qualifiés avec <span className="text-accent">Prospecta AI</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Notre plateforme d'IA révolutionnaire automatise votre processus de prospection, identifie les meilleurs
            prospects et optimise vos campagnes pour maximiser vos conversions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8">
                Commencer maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              Voir la démo
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">À propos de Prospecta AI</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Prospecta AI transforme la façon dont les entreprises génèrent et gèrent leurs prospects grâce à
              l'intelligence artificielle de pointe.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Notre Mission</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Nous croyons que chaque entreprise mérite d'avoir accès aux meilleurs outils de prospection. Notre IA
                analyse des millions de points de données pour identifier les prospects les plus prometteurs pour votre
                activité.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-foreground">Prospection automatisée et intelligente</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-foreground">Analyse prédictive des conversions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-foreground">Intégration seamless avec vos outils</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src="/ai-dashboard-modern.png" alt="Prospecta AI Dashboard" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Fonctionnalités Puissantes</h2>
            <p className="text-xl text-muted-foreground">
              Découvrez comment Prospecta AI révolutionne votre processus de génération de prospects
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="h-12 w-12 text-accent mb-4" />
                <CardTitle className="text-foreground">Ciblage Intelligent</CardTitle>
                <CardDescription>
                  Notre IA analyse votre marché cible et identifie les prospects les plus susceptibles de convertir
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-accent mb-4" />
                <CardTitle className="text-foreground">Analytics Avancés</CardTitle>
                <CardDescription>
                  Suivez vos performances en temps réel avec des tableaux de bord détaillés et des insights actionables
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-accent mb-4" />
                <CardTitle className="text-foreground">Automatisation</CardTitle>
                <CardDescription>
                  Automatisez vos campagnes de prospection et concentrez-vous sur la conversion des leads qualifiés
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section id="agents" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Nos Agents IA</h2>
            <p className="text-xl text-muted-foreground">
              Une équipe d'agents IA spécialisés travaille 24/7 pour optimiser votre prospection
            </p>
          </div>
          <AgentsSimulation />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Ce que disent nos clients</h2>
            <p className="text-xl text-muted-foreground">
              Découvrez comment Prospecta AI a transformé leur processus de prospection
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <CardDescription className="text-base">
                  "Prospecta AI a révolutionné notre approche commerciale. Nous avons augmenté nos conversions de 300%
                  en seulement 3 mois."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-accent font-semibold">MR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Marie Rousseau</p>
                    <p className="text-sm text-muted-foreground">Directrice Commerciale, TechCorp</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <CardDescription className="text-base">
                  "L'automatisation intelligente nous fait gagner 20 heures par semaine. Notre équipe peut enfin se
                  concentrer sur la vente."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-accent font-semibold">PD</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Pierre Dubois</p>
                    <p className="text-sm text-muted-foreground">CEO, StartupInnovante</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <CardDescription className="text-base">
                  "Les insights fournis par Prospecta AI nous ont permis d'identifier de nouveaux segments de marché
                  très rentables."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-accent font-semibold">SL</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Sophie Laurent</p>
                    <p className="text-sm text-muted-foreground">VP Marketing, GrowthCo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">Prêt à transformer votre prospection ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers d'entreprises qui font confiance à Prospecta AI pour générer des prospects qualifiés
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="px-8">
              Commencer gratuitement
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bot className="h-6 w-6" />
                <span className="text-xl font-bold">Prospecta AI</span>
              </div>
              <p className="opacity-80">
                La plateforme d'IA qui révolutionne la génération de prospects pour les entreprises modernes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 opacity-80">
                <li>
                  <a href="#features" className="hover:opacity-100 transition-opacity">
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a href="#agents" className="hover:opacity-100 transition-opacity">
                    Agents IA
                  </a>
                </li>
                <li>
                  <a href="/dashboard" className="hover:opacity-100 transition-opacity">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 transition-opacity">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 opacity-80">
                <li>
                  <a href="#about" className="hover:opacity-100 transition-opacity">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 transition-opacity">
                    Carrières
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 transition-opacity">
                    Presse
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 transition-opacity">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 opacity-80">
                <li>
                  <a href="#" className="hover:opacity-100 transition-opacity">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 transition-opacity">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 transition-opacity">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 transition-opacity">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center opacity-80">
            <p>&copy; 2024 Prospecta AI. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
