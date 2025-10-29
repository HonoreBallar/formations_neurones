import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ProspectsTable } from "@/components/dashboard/prospects-table"

export default function ProspectsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Liste des Prospects</h1>
          <p className="text-muted-foreground">Gérez et consultez tous vos prospects générés par l'IA</p>
        </div>

        <ProspectsTable />
      </div>
    </DashboardLayout>
  )
}
