"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Calendar, BarChart3 } from "lucide-react"

const mockReports = [
  {
    id: 1,
    name: "Rapport mensuel - Janvier 2024",
    type: "monthly",
    generatedAt: "2024-02-01",
    campaigns: ["Tech Startups Q1", "Finance B2B"],
    prospects: 245,
    status: "ready",
  },
  {
    id: 2,
    name: "Analyse de performance - Q1 2024",
    type: "performance",
    generatedAt: "2024-01-31",
    campaigns: ["Tech Startups Q1", "Healthcare Digital"],
    prospects: 189,
    status: "ready",
  },
  {
    id: 3,
    name: "Rapport hebdomadaire - Semaine 4",
    type: "weekly",
    generatedAt: "2024-01-28",
    campaigns: ["GreenTech Focus"],
    prospects: 67,
    status: "ready",
  },
  {
    id: 4,
    name: "Rapport mensuel - Février 2024",
    type: "monthly",
    generatedAt: "En cours",
    campaigns: ["EdTech Revolution", "Retail Digital"],
    prospects: 0,
    status: "generating",
  },
]

export function ReportsPage() {
  const handleDownload = (reportId: number) => {
    // In a real app, this would trigger a download
    console.log(`Downloading report ${reportId}`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge variant="default">Prêt</Badge>
      case "generating":
        return <Badge variant="secondary">En cours</Badge>
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "monthly":
        return <Calendar className="h-4 w-4" />
      case "weekly":
        return <Calendar className="h-4 w-4" />
      case "performance":
        return <BarChart3 className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Generate New Report */}
      <Card>
        <CardHeader>
          <CardTitle>Générer un nouveau rapport</CardTitle>
          <CardDescription>Créez un rapport personnalisé pour vos campagnes de prospection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Rapport mensuel
            </Button>
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analyse de performance
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Rapport personnalisé
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>Rapports disponibles</CardTitle>
          <CardDescription>Téléchargez vos rapports de prospection générés</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
                    {getTypeIcon(report.type)}
                  </div>
                  <div>
                    <h4 className="font-medium">{report.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Généré le: {report.generatedAt}</span>
                      <span>•</span>
                      <span>{report.prospects} prospects</span>
                      <span>•</span>
                      <span>{report.campaigns.join(", ")}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(report.status)}
                  {report.status === "ready" && (
                    <Button size="sm" onClick={() => handleDownload(report.id)}>
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Modèles de rapports</CardTitle>
          <CardDescription>Configurez des rapports automatiques pour vos besoins récurrents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Rapport hebdomadaire</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Résumé automatique de l'activité de prospection chaque semaine
              </p>
              <Button size="sm" variant="outline">
                Configurer
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Rapport mensuel</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Analyse complète des performances mensuelles avec insights IA
              </p>
              <Button size="sm" variant="outline">
                Configurer
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Rapport de campagne</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Rapport détaillé généré automatiquement à la fin de chaque campagne
              </p>
              <Button size="sm" variant="outline">
                Configurer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
