import type { Contribution } from "@/interfaces/interface"

function toStr(v: string | number | undefined | null) {
  if (v === undefined || v === null) return ""
  return String(v)
}

/** True when the row is a loan repayment (by `type` or by loan shape from API). */
export function isLoanRepaymentRow(c: Contribution): boolean {
  if (c.type === "loanRepayment") return true
  if (c.loanId != null) return true
  return false
}

export function getContributionPayer(c: Contribution) {
  return c.user ?? c.payer
}

export function getMemberName(c: Contribution): string {
  const p = getContributionPayer(c)
  if (p) {
    return `${p.firstName} ${p.lastName}`.trim() || "—"
  }
  const id = c.userId ?? c.paidBy
  return id != null && id !== "" ? toStr(id) : "—"
}

export function getMemberIdLine(c: Contribution): string {
  return (
    toStr(c.userId) ||
    toStr(c.paidBy) ||
    toStr(c.payer?.id) ||
    toStr(c.user?.id) ||
    "—"
  )
}

export function getGroupIdForLink(c: Contribution): string {
  return toStr(c.groupId) || toStr(c.loan?.groupId) || ""
}

export function getGroupDisplayName(c: Contribution): string {
  if (c.group?.name) return c.group.name
  if (c.loan?.name) return c.loan.name
  const gid = getGroupIdForLink(c)
  return gid ? `Group ${gid}` : "—"
}

export function getGroupSubLine(c: Contribution): string {
  return getGroupIdForLink(c) || "—"
}

export function parseContributionAmount(c: Contribution): number {
  const a = c.amount
  if (typeof a === "number" && !Number.isNaN(a)) return a
  if (typeof a === "string" && a.trim() !== "") {
    const n = Number(a)
    return Number.isNaN(n) ? 0 : n
  }
  return 0
}

export function getContributionDisplayDateString(c: Contribution): string {
  const raw = c.paidAt ?? c.createdAt
  if (!raw) return "—"
  const d = new Date(raw)
  if (Number.isNaN(d.getTime())) return "—"
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function getUserIdForLink(c: Contribution): string {
  return (
    toStr(c.userId) ||
    toStr(c.paidBy) ||
    toStr(c.payer?.id) ||
    toStr(c.user?.id) ||
    ""
  )
}

export function rowId(c: Contribution): string {
  return toStr(c.id) || "row"
}
