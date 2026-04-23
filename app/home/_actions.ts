'use server'

import { api } from "@/lib/api"
import { handleApiError } from "@/lib/apiError"
import type { AnalyticsSummary, GetAnalyticsSummaryParams, HealthStatus } from "@/interfaces/interface"

export async function getHealthStatus(): Promise<HealthStatus | null> {
  try {
    const res = await api.get("/admin/health")
    return res.data
  } catch (error) {
    const err = handleApiError(error)
    console.error("Health check failed:", err.message)
    return null
  }
}

export async function getAnalyticsSummary(
  params: GetAnalyticsSummaryParams
): Promise<AnalyticsSummary | null> {
  try {
    const res = await api.get("/admin/analytics/summary", { params })
    return res.data
  } catch (error) {
    const err = handleApiError(error)
    console.error("Analytics summary failed:", err.message)
    return null
  }
}
