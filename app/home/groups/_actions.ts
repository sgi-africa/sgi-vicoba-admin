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

function applyGroupMemberFilters(
  members: GroupMember[],
  q?: string,
  kycVerified?: string
): GroupMember[] {
  let out = members
  const t = q?.trim().toLowerCase()
  if (t) {
    out = out.filter((m) => {
      const name = m.user
        ? `${m.user.firstName ?? ""} ${m.user.lastName ?? ""}`.trim().toLowerCase()
        : ""
      const email = (m.user?.email ?? "").toLowerCase()
      const role = (m.role ?? "").toLowerCase()
      const uid = (m.userId ?? "").toLowerCase()
      return (
        name.includes(t) ||
        email.includes(t) ||
        role.includes(t) ||
        uid.includes(t)
      )
    })
  }
  if (kycVerified === "true") {
    out = out.filter((m) => m.user?.kycVerified === true)
  } else if (kycVerified === "false") {
    out = out.filter((m) => !m.user || !m.user.kycVerified)
  }
  return out
}

function mapGroupMember(row: {
  id: number | string
  userId: number | string
  groupId: number | string
  title?: string
  role?: string
  isActive?: boolean
  joinedAt: string
  user?: GroupMember["user"] & { id?: number | string }
}): GroupMember {
  return {
    id: String(row.id),
    userId: String(row.userId),
    groupId: String(row.groupId),
    role: row.role ?? row.title ?? "—",
    joinedAt: row.joinedAt,
    user: row.user
      ? {
        id: String(row.user.id),
        firstName: row.user.firstName,
        lastName: row.user.lastName,
        email: row.user.email == null ? "" : String(row.user.email),
        phone: row.user.phone,
        isActive: row.user.isActive,
        kycVerified: row.user.kycVerified,
      }
      : undefined,
  }
}

export async function getGroupMembers(
  groupId: string,
  params: GetGroupMembersParams
): Promise<PaginatedResponse<GroupMember>> {
  const page = params.page ?? 1
  const limit = params.limit ?? 20
  const res = await api.get(`/admin/groups/${groupId}/members`, {
    params: {
      page,
      limit,
      q: params.q,
      kycVerified: params.kycVerified,
    },
  })
  const body = res.data

  if (Array.isArray(body)) {
    const all = body.map((row) => mapGroupMember(row))
    const filtered = applyGroupMemberFilters(
      all,
      params.q,
      params.kycVerified
    )
    const total = filtered.length
    const totalPages = Math.max(1, Math.ceil(total / limit) || 1)
    const start = (page - 1) * limit
    const data = filtered.slice(start, start + limit)
    return {
      data,
      total,
      page,
      limit,
      totalPages,
    }
  }

  const paginated = body as PaginatedResponse<GroupMember> & { data?: unknown[] }
  const rawList = Array.isArray(paginated.data) ? paginated.data : []
  const data = rawList.map((row) => mapGroupMember(row as Parameters<typeof mapGroupMember>[0]))
  return {
    data,
    total: typeof paginated.total === "number" ? paginated.total : data.length,
    page: typeof paginated.page === "number" ? paginated.page : page,
    limit: typeof paginated.limit === "number" ? paginated.limit : limit,
    totalPages:
      typeof paginated.totalPages === "number"
        ? paginated.totalPages
        : Math.max(1, Math.ceil((paginated.total ?? data.length) / (paginated.limit ?? limit)) || 1),
  }
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
