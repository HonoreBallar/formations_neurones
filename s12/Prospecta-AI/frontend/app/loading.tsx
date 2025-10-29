import { Bot } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <Bot className="h-16 w-16 text-accent mx-auto mb-4 animate-pulse" />
        <h2 className="text-xl font-semibold text-foreground mb-2">Chargement...</h2>
        <p className="text-muted-foreground">Prospecta AI se prépare</p>
      </div>
    </div>
  )
}
