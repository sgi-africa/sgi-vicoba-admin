'use server'

import { api } from "@/lib/api"
import { handleApiError } from "@/lib/apiError"
import { revalidatePath } from "next/cache"
import { AdminGroup, GetGroupsParams, GetGroupMembersParams, GroupMember, PaginatedResponse, ApiActionResult } from "@/interfaces/interface"

export async function getGroups(
  params: GetGroupsParams
): Promise<PaginatedResponse<AdminGroup>> {
  const res = await api.get("/admin/groups", { params })
  return res.data
}

export async function getGroupById(groupId: string): Promise<AdminGroup> {
  const res = await api.get(`/admin/groups/${groupId}`)
  return res.data
}

export async function getGroupMembers(
  groupId: string,
  params: GetGroupMembersParams
): Promise<PaginatedResponse<GroupMember>> {
  const res = await api.get(`/admin/groups/${groupId}/members`, { params })
  return res.data
}

export async function updateGroupStatus(
  groupId: string,
  isActive: boolean
): Promise<ApiActionResult> {
  try {
    await api.patch(`/admin/groups/${groupId}/status`, { isActive })
    revalidatePath("/home/groups")
    revalidatePath(`/home/groups/${groupId}`)
    return { ok: true }
  } catch (error) {
    const err = handleApiError(error)
    return { ok: false, error: err.message, status: err.status }
  }
}
