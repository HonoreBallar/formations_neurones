import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ProspectionTimeline } from "@/components/dashboard/prospection-timeline"

export default function ProspectionPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Prospection en cours</h1>
          <p className="text-muted-foreground">Nos agents IA travaillent sur votre campagne de prospection</p>
        </div>

        <ProspectionTimeline />
      </div>
    </DashboardLayout>
  )
}
