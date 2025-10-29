import { type NextRequest, NextResponse } from "next/server"

// Mock database - in a real app, this would be a database connection
const mockProspects = [
  {
    id: 1,
    company: "TechStart Solutions",
    contact: "Marie Dubois",
    email: "marie.dubois@techstart.fr",
    phone: "+33 1 42 34 56 78",
    industry: "Technologie",
    size: "50-100 employés",
    location: "Paris, France",
    score: 92,
    status: "Qualifié",
    campaign: "Tech Startups Q1",
    lastContact: "2024-01-15",
    notes: "Très intéressée par notre solution SaaS",
    createdAt: new Date("2024-01-15").toISOString(),
  },
  {
    id: 2,
    company: "InnovateCorp",
    contact: "Pierre Martin",
    email: "p.martin@innovatecorp.com",
    phone: "+33 1 45 67 89 01",
    industry: "Finance",
    size: "100-250 employés",
    location: "Lyon, France",
    score: 87,
    status: "En cours",
    campaign: "Finance B2B",
    lastContact: "2024-01-14",
    notes: "Demande une démo personnalisée",
    createdAt: new Date("2024-01-14").toISOString(),
  },
  {
    id: 3,
    company: "GreenTech Innovations",
    contact: "Sophie Laurent",
    email: "sophie@greentech-innov.fr",
    phone: "+33 1 56 78 90 12",
    industry: "Environnement",
    size: "25-50 employés",
    location: "Bordeaux, France",
    score: 78,
    status: "Nouveau",
    campaign: "GreenTech Focus",
    lastContact: "2024-01-13",
    notes: "Startup prometteuse dans l'énergie verte",
    createdAt: new Date("2024-01-13").toISOString(),
  },
  {
    id: 4,
    company: "HealthCare Plus",
    contact: "Dr. Jean Moreau",
    email: "j.moreau@healthcare-plus.fr",
    phone: "+33 1 67 89 01 23",
    industry: "Santé",
    size: "250+ employés",
    location: "Marseille, France",
    score: 95,
    status: "Qualifié",
    campaign: "Healthcare Digital",
    lastContact: "2024-01-12",
    notes: "Décideur principal identifié",
    createdAt: new Date("2024-01-12").toISOString(),
  },
  {
    id: 5,
    company: "EduTech Academy",
    contact: "Anne Rousseau",
    email: "anne.rousseau@edutech.fr",
    phone: "+33 1 78 90 12 34",
    industry: "Éducation",
    size: "10-25 employés",
    location: "Toulouse, France",
    score: 65,
    status: "À recontacter",
    campaign: "EdTech Revolution",
    lastContact: "2024-01-11",
    notes: "Budget limité mais potentiel à long terme",
    createdAt: new Date("2024-01-11").toISOString(),
  },
  {
    id: 6,
    company: "RetailMax Solutions",
    contact: "Thomas Leroy",
    email: "t.leroy@retailmax.fr",
    phone: "+33 1 89 01 23 45",
    industry: "Commerce",
    size: "100-250 employés",
    location: "Lille, France",
    score: 82,
    status: "En cours",
    campaign: "Retail Digital",
    lastContact: "2024-01-10",
    notes: "Intéressé par l'automatisation",
    createdAt: new Date("2024-01-10").toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const status = searchParams.get("status")
    const industry = searchParams.get("industry")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let filteredProspects = [...mockProspects]

    // Apply filters
    if (search) {
      filteredProspects = filteredProspects.filter(
        (prospect) =>
          prospect.company.toLowerCase().includes(search.toLowerCase()) ||
          prospect.contact.toLowerCase().includes(search.toLowerCase()) ||
          prospect.email.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (status && status !== "all") {
      filteredProspects = filteredProspects.filter((prospect) => prospect.status === status)
    }

    if (industry && industry !== "all") {
      filteredProspects = filteredProspects.filter((prospect) => prospect.industry === industry)
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProspects = filteredProspects.slice(startIndex, endIndex)

    return NextResponse.json({
      prospects: paginatedProspects,
      total: filteredProspects.length,
      page,
      limit,
      totalPages: Math.ceil(filteredProspects.length / limit),
    })
  } catch (error) {
    console.error("Error fetching prospects:", error)
    return NextResponse.json({ error: "Failed to fetch prospects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newProspect = {
      id: mockProspects.length + 1,
      ...body,
      createdAt: new Date().toISOString(),
    }

    mockProspects.push(newProspect)

    return NextResponse.json(newProspect, { status: 201 })
  } catch (error) {
    console.error("Error creating prospect:", error)
    return NextResponse.json({ error: "Failed to create prospect" }, { status: 500 })
  }
}
