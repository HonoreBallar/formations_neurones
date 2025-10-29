// API utility functions for making requests to the backend

export interface Prospect {
  id: number
  company: string
  contact: string
  email: string
  phone: string
  industry: string
  size: string
  location: string
  score: number
  status: string
  campaign: string
  lastContact: string
  notes: string
  createdAt: string
}

export interface ProspectsResponse {
  prospects: Prospect[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface CampaignConfig {
  campaignName: string
  product: string
  targetMarket: string
  geography: string
  companySize: string
  industry: string
  prospectCount: string
  budget: string
  duration: string
  objectives: string
  additionalCriteria?: string
}

export interface Campaign {
  id: number
  name: string
  status: "running" | "completed" | "paused"
  createdAt: string
  completedAt?: string
  prospectsGenerated: number
  qualified: number
  converted: number
  config?: CampaignConfig
  progress?: {
    stage: string
    percentage: number
    message: string
  }
}

export interface AnalyticsData {
  conversionData: Array<{
    month: string
    prospects: number
    qualified: number
    converted: number
  }>
  industryData: Array<{
    name: string
    value: number
    color: string
  }>
  campaignPerformance: Array<{
    campaign: string
    prospects: number
    qualified: number
    score: number
  }>
  weeklyActivity: Array<{
    day: string
    prospects: number
    contacts: number
  }>
  metrics: {
    conversionRate: number
    averageScore: number
    activeProspects: number
    averageROI: number
  }
}

// API client class
class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || ""
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}/api${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error)
      throw error
    }
  }

  // Prospects API
  async getProspects(
    params: {
      search?: string
      status?: string
      industry?: string
      page?: number
      limit?: number
    } = {},
  ): Promise<ProspectsResponse> {
    const searchParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString())
      }
    })

    const endpoint = `/prospects${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
    return this.request<ProspectsResponse>(endpoint)
  }

  async createProspect(prospect: Omit<Prospect, "id" | "createdAt">): Promise<Prospect> {
    return this.request<Prospect>("/prospects", {
      method: "POST",
      body: JSON.stringify(prospect),
    })
  }

  // Campaign API
  async runProspection(config: CampaignConfig): Promise<{
    success: boolean
    campaign: Campaign
    message: string
  }> {
    return this.request("/prospects/run", {
      method: "POST",
      body: JSON.stringify(config),
    })
  }

  async getCampaigns(): Promise<{ campaigns: Campaign[]; total: number }> {
    return this.request("/campaigns")
  }

  // Analytics API
  async getAnalytics(timeRange = "6months"): Promise<AnalyticsData> {
    return this.request(`/analytics?timeRange=${timeRange}`)
  }
}

// Export singleton instance
export const apiClient = new ApiClient()

// Convenience functions
export const prospectsApi = {
  getAll: (params?: Parameters<typeof apiClient.getProspects>[0]) => apiClient.getProspects(params),
  create: (prospect: Parameters<typeof apiClient.createProspect>[0]) => apiClient.createProspect(prospect),
}

export const campaignsApi = {
  run: (config: CampaignConfig) => apiClient.runProspection(config),
  getAll: () => apiClient.getCampaigns(),
}

export const analyticsApi = {
  get: (timeRange?: string) => apiClient.getAnalytics(timeRange),
}
