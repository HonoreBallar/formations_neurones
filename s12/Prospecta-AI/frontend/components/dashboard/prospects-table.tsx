"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Search, Filter, Download, Mail, Phone, Building, MapPin, Star, ArrowUpDown } from "lucide-react"

// Mock data for prospects
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
  },
]

type SortField = "company" | "contact" | "score" | "status" | "lastContact"
type SortDirection = "asc" | "desc"

export function ProspectsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>("score")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const itemsPerPage = 5

  // Filter and sort prospects
  const filteredAndSortedProspects = useMemo(() => {
    const filtered = mockProspects.filter((prospect) => {
      const matchesSearch =
        prospect.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prospect.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prospect.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || prospect.status === statusFilter
      const matchesIndustry = industryFilter === "all" || prospect.industry === industryFilter

      return matchesSearch && matchesStatus && matchesIndustry
    })

    // Sort prospects
    filtered.sort((a, b) => {
      let aValue: any = a[sortField]
      let bValue: any = b[sortField]

      if (sortField === "score") {
        aValue = Number(aValue)
        bValue = Number(bValue)
      } else if (sortField === "lastContact") {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      } else {
        aValue = String(aValue).toLowerCase()
        bValue = String(bValue).toLowerCase()
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  }, [searchTerm, statusFilter, industryFilter, sortField, sortDirection])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProspects.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProspects = filteredAndSortedProspects.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Qualifié":
        return "default"
      case "En cours":
        return "secondary"
      case "Nouveau":
        return "outline"
      case "À recontacter":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-blue-600"
    if (score >= 60) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Prospects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProspects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Qualifiés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockProspects.filter((p) => p.status === "Qualifié").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">En cours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {mockProspects.filter((p) => p.status === "En cours").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Score moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(mockProspects.reduce((sum, p) => sum + p.score, 0) / mockProspects.length)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Prospects</CardTitle>
          <CardDescription>
            Gérez vos prospects générés par l'IA avec des outils de recherche et de filtrage avancés
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par entreprise, contact ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-80"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Qualifié">Qualifié</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="Nouveau">Nouveau</SelectItem>
                  <SelectItem value="À recontacter">À recontacter</SelectItem>
                </SelectContent>
              </Select>
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <Building className="h-4 w-4" />
                  <SelectValue placeholder="Secteur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les secteurs</SelectItem>
                  <SelectItem value="Technologie">Technologie</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Santé">Santé</SelectItem>
                  <SelectItem value="Éducation">Éducation</SelectItem>
                  <SelectItem value="Commerce">Commerce</SelectItem>
                  <SelectItem value="Environnement">Environnement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4" />
              Exporter CSV
            </Button>
          </div>

          {/* Results count */}
          <div className="text-sm text-muted-foreground">{filteredAndSortedProspects.length} prospect(s) trouvé(s)</div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("company")}>
                    <div className="flex items-center gap-2">
                      Entreprise
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("contact")}>
                    <div className="flex items-center gap-2">
                      Contact
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Secteur</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("score")}>
                    <div className="flex items-center gap-2">
                      Score
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("status")}>
                    <div className="flex items-center gap-2">
                      Statut
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProspects.map((prospect) => (
                  <TableRow key={prospect.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{prospect.company}</div>
                        <div className="text-sm text-muted-foreground">{prospect.size}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{prospect.contact}</div>
                        <div className="text-sm text-muted-foreground">{prospect.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{prospect.industry}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{prospect.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Star className={`h-4 w-4 ${getScoreColor(prospect.score)}`} />
                        <span className={`font-medium ${getScoreColor(prospect.score)}`}>{prospect.score}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(prospect.status)}>{prospect.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} sur {totalPages}
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
