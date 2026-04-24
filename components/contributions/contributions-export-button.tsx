import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import type { Contribution } from "@/interfaces/interface"
import {
  getGroupDisplayName,
  getGroupIdForLink,
  getMemberName,
  getUserIdForLink,
  isLoanRepaymentRow,
  parseContributionAmount,
} from "@/utils/contributions/contributionRow"

export function ContributionsExportButton({
  contributions,
}: {
  contributions: Contribution[]
}) {
  const run = () => {
    const header = [
      "id",
      "rowKind",
      "amountTzs",
      "userId",
      "groupId",
      "memberName",
      "groupName",
      "date",
    ]
    const escape = (s: string) => `"${String(s).replace(/"/g, '""')}"`
    const rows = contributions.map((c) => {
      const kind = isLoanRepaymentRow(c) ? "loanRepayment" : (c.type ?? "contribution")
      const at = c.paidAt ?? c.createdAt ?? ""
      return [
        c.id,
        kind,
        parseContributionAmount(c),
        getUserIdForLink(c),
        getGroupIdForLink(c),
        getMemberName(c),
        getGroupDisplayName(c),
        at,
      ]
        .map((col) => escape(String(col)))
        .join(",")
    })
    const csv = [header.join(","), ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `contributions-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={run}
      className="bg-primary text-primary-foreground hover:bg-primary/90"
      disabled={contributions.length === 0}
    >
      <Upload className="size-4" />
      <span className="ml-2">Export</span>
    </Button>
  )
}
