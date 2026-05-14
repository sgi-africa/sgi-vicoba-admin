import type { AdminGroup } from "@/interfaces/interface"

/** Uses highest `version`; falls back when versions tie. */
export function latestConstitutionFileUrl(group: AdminGroup): string | null {
  const rows = group.constitutionVersions ?? []
  if (rows.length === 0) return null
  const sorted = [...rows].sort(
    (a, b) => Number(b.version) - Number(a.version)
  )
  const url = sorted[0]?.fileUrl
  return typeof url === "string" && url.trim() ? url.trim() : null
}
