import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ConfigurationForm } from "@/components/dashboard/configuration-form"

export default function ConfigurationPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configuration</h1>
          <p className="text-muted-foreground">Configurez les paramètres de votre prochaine campagne de prospection</p>
        </div>

        <ConfigurationForm />
      </div>
    </DashboardLayout>
  )
}
