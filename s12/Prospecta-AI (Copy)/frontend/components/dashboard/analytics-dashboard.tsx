"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, Users, Target, Calendar, Building } from "lucide-react"
import { useState } from "react"

// Mock data for charts
const conversionData = [
  { month: "Jan", prospects: 120, qualified: 28, converted: 8 },
  { month: "Fév", prospects: 150, qualified: 42, converted: 12 },
  { month: "Mar", prospects: 180, qualified: 54, converted: 18 },
  { month: "Avr", prospects: 200, qualified: 65, converted: 22 },
  { month: "Mai", prospects: 165, qualified: 48, converted: 15 },
  { month: "Juin", prospects: 220, qualified: 78, converted: 28 },
]

const industryData = [
  { name: "Technologie", value: 35, color: "#6366f1" },
  { name: "Finance", value: 25, color: "#10b981" },
  { name: "Santé", value: 20, color: "#f59e0b" },
  { name: "Commerce", value: 12, color: "#ef4444" },
  { name: "Éducation", value: 8, color: "#8b5cf6" },
]

const campaignPerformance = [
  { campaign: "Tech Startups", prospects: 156, qualified: 45, score: 92 },
  { campaign: "Finance B2B", prospects: 134, qualified: 38, score: 87 },
  { campaign: "Healthcare", prospects: 98, qualified: 32, score: 95 },
  { campaign: "GreenTech", prospects: 87, qualified: 22, score: 78 },
  { campaign: "EdTech", prospects: 76, qualified: 18, score: 65 },
]

const weeklyActivity = [
  { day: "Lun", prospects: 45, contacts: 12 },
  { day: "Mar", prospects: 52, contacts: 18 },
  { day: "Mer", prospects: 38, contacts: 15 },
  { day: "Jeu", prospects: 61, contacts: 22 },
  { day: "Ven", prospects: 48, contacts: 16 },
  { day: "Sam", prospects: 23, contacts: 8 },
  { day: "Dim", prospects: 15, contacts: 4 },
]

const chartConfig = {
  prospects: {
    label: "Prospects",
    color: "#6366f1",
  },
  qualified: {
    label: "Qualifiés",
    color: "#10b981",
  },
  converted: {
    label: "Convertis",
    color: "#f59e0b",
  },
  contacts: {
    label: "Contacts",
    color: "#ef4444",
  },
}

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("6months")

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 mois</SelectItem>
              <SelectItem value="3months">3 mois</SelectItem>
              <SelectItem value="6months">6 mois</SelectItem>
              <SelectItem value="1year">1 an</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Badge variant="outline" className="text-green-600 border-green-200">
          <TrendingUp className="h-3 w-3 mr-1" />
          +15% ce mois
        </Badge>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.8%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> vs mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score moyen</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84.2</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.3</span> vs mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prospects actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">+156</span> cette semaine
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI moyen</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">340%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+45%</span> vs mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Entonnoir de conversion</CardTitle>
            <CardDescription>Évolution des prospects par étape du processus</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="prospects" fill="var(--color-prospects)" name="Prospects" />
                <Bar dataKey="qualified" fill="var(--color-qualified)" name="Qualifiés" />
                <Bar dataKey="converted" fill="var(--color-converted)" name="Convertis" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Industry Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par secteur</CardTitle>
            <CardDescription>Distribution des prospects par industrie</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <PieChart>
                <Pie
                  data={industryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {industryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Activité hebdomadaire</CardTitle>
            <CardDescription>Prospects générés et contacts établis par jour</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <AreaChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Area
                  type="monotone"
                  dataKey="prospects"
                  stackId="1"
                  stroke="var(--color-prospects)"
                  fill="var(--color-prospects)"
                  fillOpacity={0.6}
                  name="Prospects"
                />
                <Area
                  type="monotone"
                  dataKey="contacts"
                  stackId="2"
                  stroke="var(--color-contacts)"
                  fill="var(--color-contacts)"
                  fillOpacity={0.6}
                  name="Contacts"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Campaign Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Performance des campagnes</CardTitle>
            <CardDescription>Comparaison des résultats par campagne</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaignPerformance.map((campaign, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-accent"></div>
                    <div>
                      <p className="font-medium">{campaign.campaign}</p>
                      <p className="text-sm text-muted-foreground">
                        {campaign.prospects} prospects • {campaign.qualified} qualifiés
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{campaign.score}</div>
                    <div className="text-xs text-muted-foreground">Score</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Analyse des tendances</CardTitle>
          <CardDescription>Évolution des métriques clés sur les 6 derniers mois</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-96">
            <LineChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                type="monotone"
                dataKey="prospects"
                stroke="var(--color-prospects)"
                strokeWidth={3}
                dot={{ fill: "var(--color-prospects)", strokeWidth: 2, r: 4 }}
                name="Prospects"
              />
              <Line
                type="monotone"
                dataKey="qualified"
                stroke="var(--color-qualified)"
                strokeWidth={3}
                dot={{ fill: "var(--color-qualified)", strokeWidth: 2, r: 4 }}
                name="Qualifiés"
              />
              <Line
                type="monotone"
                dataKey="converted"
                stroke="var(--color-converted)"
                strokeWidth={3}
                dot={{ fill: "var(--color-converted)", strokeWidth: 2, r: 4 }}
                name="Convertis"
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-accent" />
            Insights IA
          </CardTitle>
          <CardDescription>Recommandations basées sur l'analyse de vos données</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">Opportunité détectée</span>
              </div>
              <p className="text-sm text-green-700">
                Le secteur technologique montre un taux de conversion 23% supérieur à la moyenne. Considérez augmenter
                le budget pour ces campagnes.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">Optimisation suggérée</span>
              </div>
              <p className="text-sm text-blue-700">
                Les prospects contactés le jeudi ont un taux de réponse 35% plus élevé. Programmez plus d'activités ce
                jour-là.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-orange-800">Attention requise</span>
              </div>
              <p className="text-sm text-orange-700">
                Le score moyen des prospects éducation est en baisse (-12%). Révisez les critères de ciblage pour ce
                secteur.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-800">Tendance positive</span>
              </div>
              <p className="text-sm text-purple-700">
                Votre ROI global a augmenté de 45% ce mois. Les optimisations IA portent leurs fruits !
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
