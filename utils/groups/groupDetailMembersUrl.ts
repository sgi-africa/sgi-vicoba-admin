import type { ReadonlyURLSearchParams } from "next/navigation"

function basePath(groupId: string) {
  return `/home/groups/${groupId}`
}

export function buildGroupDetailMembersHref(
  sp: ReadonlyURLSearchParams | string,
  groupId: string,
  patch: Record<string, string | null | undefined>
) {
  const params = new URLSearchParams(
    typeof sp === "string" ? sp : sp.toString()
  )
  for (const [key, value] of Object.entries(patch)) {
    if (value === null || value === undefined || value === "") {
      params.delete(key)
    } else {
      params.set(key, String(value))
    }
  }
  const nonPage = Object.keys(patch).filter((k) => k !== "page")
  if (nonPage.length > 0) {
    params.set("page", "1")
  }
  const qs = params.toString()
  return qs ? `${basePath(groupId)}?${qs}` : basePath(groupId)
}
