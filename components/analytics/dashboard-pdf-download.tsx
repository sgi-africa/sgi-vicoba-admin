"use client"

import { useCallback, useState } from "react"
import { jsPDF } from "jspdf"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import type { DashboardPdfDownloadProps } from "@/interfaces/interface"
import { formatIso } from "@/utils/global/formatDate"
import { formatCurrencyTZS } from "@/utils/global/formatAmount"


export function DashboardPdfDownload({
  from,
  to,
  summary,
  health,
}: DashboardPdfDownloadProps) {
  const [pending, setPending] = useState(false)

  const toNumber = (value: number | string | undefined) => {
    if (typeof value === "number" && !Number.isNaN(value)) return value
    if (typeof value === "string" && value.trim() !== "") {
      const n = Number(value)
      return Number.isNaN(n) ? undefined : n
    }
    return undefined
  }

  const handleDownload = useCallback(() => {
    setPending(true)
    try {
      const doc = new jsPDF()
      const margin = 14
      let y = 20
      const line = (text: string, gap = 6) => {
        doc.text(text, margin, y)
        y += gap
      }

      doc.setFont("helvetica", "bold")
      doc.setFontSize(16)
      line("SGI VICOBA Admin - Dashboard report", 10)

      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      line(`Period: ${formatIso(from)} to ${formatIso(to)}`)
      line(`Generated: ${new Date().toLocaleString()}`)
      y += 4

      doc.setFont("helvetica", "bold")
      doc.setFontSize(12)
      line("API status", 8)
      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      if (health) {
        line(`OK: ${health.ok === true ? "yes" : "no"}`)
        if (health.sub != null) line(`sub: ${health.sub}`)
      } else {
        line("Status: unavailable")
      }
      y += 4

      doc.setFont("helvetica", "bold")
      doc.setFontSize(12)
      line("Metrics", 8)
      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)

      const fmt = (n: number | undefined) =>
        n !== undefined ? n.toLocaleString() : "—"

      line(`Users created: ${fmt(summary?.usersCreated)}`)
      line(`Groups created: ${fmt(summary?.groupsCreated)}`)
      line(`Contributions (count): ${fmt(summary?.contributions?.count)}`)
      const contributionAmount = toNumber(summary?.contributions?.totalAmount)
      if (contributionAmount !== undefined) {
        line(`Contributions (amount): ${formatCurrencyTZS(contributionAmount)}`)
      }
      line(`Loan repayments (count): ${fmt(summary?.loanRepayments?.count)}`)
      const repaymentAmount = toNumber(summary?.loanRepayments?.totalAmount)
      if (repaymentAmount !== undefined) {
        line(`Loan repayments (amount): ${formatCurrencyTZS(repaymentAmount)}`)
      }
      line(`Billing paid (count): ${fmt(summary?.billingPaid?.count)}`)
      const paidTzs = toNumber(summary?.billingPaid?.totalTzs)
      if (paidTzs !== undefined) {
        line(`Billing paid (amount): ${formatCurrencyTZS(paidTzs)}`)
      }
      if (summary?.period) {
        y += 2
        line(`API period from: ${formatIso(summary.period.from)}`)
        line(`API period to: ${formatIso(summary.period.to)}`)
      }

      const safeDate = new Date().toISOString().slice(0, 10)
      doc.save(`sgi-vicoba-dashboard-${safeDate}.pdf`)
    } finally {
      setPending(false)
    }
  }, [from, to, summary, health])

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="shrink-0"
      onClick={handleDownload}
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Download className="size-5" />
      )}
    </Button>
  )
}
