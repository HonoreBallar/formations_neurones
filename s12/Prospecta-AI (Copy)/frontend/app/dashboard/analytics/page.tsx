import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AnalyticsDashboard } from "@/components/dashboard/analytics-dashboard"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Graphiques</h1>
          <p className="text-muted-foreground">Visualisations et analyses de vos données de prospection</p>
        </div>

        <AnalyticsDashboard />
      </div>
    </DashboardLayout>
  )
}
