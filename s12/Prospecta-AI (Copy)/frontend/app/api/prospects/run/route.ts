import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      campaignName,
      product,
      targetMarket,
      geography,
      companySize,
      industry,
      prospectCount,
      budget,
      duration,
      objectives,
      additionalCriteria,
    } = body

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock campaign creation response
    const campaign = {
      id: Date.now(),
      name: campaignName,
      status: "running",
      createdAt: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
      config: {
        product,
        targetMarket,
        geography,
        companySize,
        industry,
        prospectCount,
        budget,
        duration,
        objectives,
        additionalCriteria,
      },
      progress: {
        stage: "market_analysis",
        percentage: 15,
        message: "Analyse du marché cible en cours...",
      },
    }

    return NextResponse.json({
      success: true,
      campaign,
      message: "Campagne de prospection lancée avec succès",
    })
  } catch (error) {
    console.error("Error running prospection:", error)
    return NextResponse.json({ error: "Failed to run prospection" }, { status: 500 })
  }
}
