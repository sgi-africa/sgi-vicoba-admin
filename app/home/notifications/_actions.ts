'use server'

import { api } from "@/lib/api"
import type { Notification, GetNotificationsParams, PaginatedResponse } from "@/interfaces/interface"

export async function getNotifications(
  params: GetNotificationsParams
): Promise<PaginatedResponse<Notification>> {
  const res = await api.get("/admin/notifications", { params })
  return res.data
}
