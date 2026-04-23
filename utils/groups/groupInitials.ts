import type { AdminGroup } from "@/interfaces/interface"

export function groupInitials(g: AdminGroup) {
  const n = g.name?.trim() ?? ""
  if (!n) return "G"
  const parts = n.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0]![0]! + parts[1]![0]!).toUpperCase()
  }
  return n.slice(0, 2).toUpperCase()
}
