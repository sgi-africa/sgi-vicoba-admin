import type { ContributionType } from "@/interfaces/interface"

/** Normalizes `?type=` from the URL to values the admin API accepts. */
export function parseContributionTypeParam(raw: string | undefined): ContributionType {
  if (raw === "loanRepayment") return "loanRepayment"
  if (raw === "contribution") return "contribution"
  // Legacy client values (no longer sent to the API)
  if (raw === "savings" || raw === "jamii") return "contribution"
  return "contribution"
}
