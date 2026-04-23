'use server'

import { api } from "@/lib/api"
import { handleApiError } from "@/lib/apiError"
import { revalidatePath } from "next/cache"
import type {
  Billing,
  GetBillingsParams,
  UpdateBillingStatusBody,
  PaginatedResponse,
  ApiActionResult,
} from "@/interfaces/interface"

export async function getBillings(
  params: GetBillingsParams
): Promise<PaginatedResponse<Billing>> {
  const res = await api.get("/admin/billing", { params })
  return res.data
}

export async function getBillingById(billingId: string): Promise<Billing> {
  const res = await api.get(`/admin/billing/${billingId}`)
  return res.data
}

export async function updateBillingStatus(
  billingId: string,
  body: UpdateBillingStatusBody
): Promise<ApiActionResult> {
  try {
    await api.patch(`/admin/billing/${billingId}/status`, body)
    revalidatePath("/home/billings")
    revalidatePath(`/home/billings/${billingId}`)
    return { ok: true }
  } catch (error) {
    const err = handleApiError(error)
    return { ok: false, error: err.message, status: err.status }
  }
}
