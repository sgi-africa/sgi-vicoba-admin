'use server'

import { api } from "@/lib/api"
import { handleApiError } from "@/lib/apiError"
import { revalidatePath } from "next/cache"
import type { AdminUser, GetUsersParams, PaginatedResponse, ApiActionResult } from "@/interfaces/interface"

export async function getUsers(params: GetUsersParams): Promise<PaginatedResponse<AdminUser>> {
  const res = await api.get("/admin/users", { params })
  return res.data
}

export async function getUserById(userId: string): Promise<AdminUser> {
  const res = await api.get(`/admin/users/${userId}`)
  return res.data
}

export async function updateUserStatus(
  userId: string,
  isActive: boolean
): Promise<ApiActionResult> {
  try {
    await api.patch(`/admin/users/${userId}/status`, { isActive })
    revalidatePath("/home/users")
    revalidatePath(`/home/users/${userId}`)
    return { ok: true }
  } catch (error) {
    const err = handleApiError(error)
    return { ok: false, error: err.message, status: err.status }
  }
}

export async function updateUserKyc(userId: string, kycVerified: boolean): Promise<ApiActionResult> {
  try {
    await api.patch(`/admin/users/${userId}/kyc`, { kycVerified })
    revalidatePath("/home/users")
    revalidatePath(`/home/users/${userId}`)
    return { ok: true }
  } catch (error) {
    const err = handleApiError(error)
    return { ok: false, error: err.message, status: err.status }
  }
}
