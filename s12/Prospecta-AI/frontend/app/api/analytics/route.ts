import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get("timeRange") || "6months"

    // Mock analytics data
    const analyticsData = {
      conversionData: [
        { month: "Jan", prospects: 120, qualified: 28, converted: 8 },
        { month: "Fév", prospects: 150, qualified: 42, converted: 12 },
        { month: "Mar", prospects: 180, qualified: 54, converted: 18 },
        { month: "Avr", prospects: 200, qualified: 65, converted: 22 },
        { month: "Mai", prospects: 165, qualified: 48, converted: 15 },
        { month: "Juin", prospects: 220, qualified: 78, converted: 28 },
      ],
      industryData: [
        { name: "Technologie", value: 35, color: "#6366f1" },
        { name: "Finance", value: 25, color: "#10b981" },
        { name: "Santé", value: 20, color: "#f59e0b" },
        { name: "Commerce", value: 12, color: "#ef4444" },
        { name: "Éducation", value: 8, color: "#8b5cf6" },
      ],
      campaignPerformance: [
        { campaign: "Tech Startups", prospects: 156, qualified: 45, score: 92 },
        { campaign: "Finance B2B", prospects: 134, qualified: 38, score: 87 },
        { campaign: "Healthcare", prospects: 98, qualified: 32, score: 95 },
        { campaign: "GreenTech", prospects: 87, qualified: 22, score: 78 },
        { campaign: "EdTech", prospects: 76, qualified: 18, score: 65 },
      ],
      weeklyActivity: [
        { day: "Lun", prospects: 45, contacts: 12 },
        { day: "Mar", prospects: 52, contacts: 18 },
        { day: "Mer", prospects: 38, contacts: 15 },
        { day: "Jeu", prospects: 61, contacts: 22 },
        { day: "Ven", prospects: 48, contacts: 16 },
        { day: "Sam", prospects: 23, contacts: 8 },
        { day: "Dim", prospects: 15, contacts: 4 },
      ],
      metrics: {
        conversionRate: 12.8,
        averageScore: 84.2,
        activeProspects: 1247,
        averageROI: 340,
      },
    }

    return NextResponse.json(analyticsData)
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
