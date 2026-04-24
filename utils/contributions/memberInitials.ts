import { Contribution } from "@/interfaces/interface"
import { getContributionPayer } from "@/utils/contributions/contributionRow"

export function memberInitials(c: Contribution) {
  const p = getContributionPayer(c)
  if (p?.firstName || p?.lastName) {
    const a = (p.firstName?.[0] ?? "").toUpperCase()
    const b = (p.lastName?.[0] ?? "").toUpperCase()
    return (a + b) || "—"
  }
  return "—"
}