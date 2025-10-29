import { NextResponse } from "next/server"

// Mock campaigns data
const mockCampaigns = [
  {
    id: 1,
    name: "Tech Startups Q1",
    status: "completed",
    createdAt: "2024-01-01T00:00:00Z",
    completedAt: "2024-01-15T00:00:00Z",
    prospectsGenerated: 156,
    qualified: 45,
    converted: 12,
  },
  {
    id: 2,
    name: "Finance B2B",
    status: "running",
    createdAt: "2024-01-10T00:00:00Z",
    prospectsGenerated: 89,
    qualified: 23,
    converted: 5,
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      campaigns: mockCampaigns,
      total: mockCampaigns.length,
    })
  } catch (error) {
    console.error("Error fetching campaigns:", error)
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 })
  }
}
