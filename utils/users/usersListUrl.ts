import type { ReadonlyURLSearchParams } from "next/navigation"

/** Apply query patch; `null`/`""` removes a key. Resets to page 1 when any non-page key changes. */
export function buildUsersListHref(
  sp: ReadonlyURLSearchParams | string,
  patch: Record<string, string | null | undefined>
): string {
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
  return qs ? `/home/users?${qs}` : "/home/users"
}

export function buildUsersPageHref(
  sp: ReadonlyURLSearchParams | string,
  page: number,
  rest?: { limit?: string }
): string {
  const params = new URLSearchParams(
    typeof sp === "string" ? sp : sp.toString()
  )
  params.set("page", String(page))
  if (rest?.limit) params.set("limit", rest.limit)
  return `/home/users?${params.toString()}`
}
