'use server'

import { api } from "@/lib/api"
import type { Contribution, GetContributionsParams, PaginatedResponse } from "@/interfaces/interface"

export async function getContributions(
  params: GetContributionsParams
): Promise<PaginatedResponse<Contribution>> {
  const res = await api.get("/admin/contributions", { params })
  return res.data
}
