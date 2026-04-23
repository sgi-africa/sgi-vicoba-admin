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
      line(`Status: ${health?.status ?? "unavailable"}`)
      if (health?.uptime !== undefined) {
        line(`Uptime: ${health.uptime}`)
      }
      if (health?.timestamp) {
        line(`Timestamp: ${formatIso(health.timestamp)}`)
      }
      y += 4

      doc.setFont("helvetica", "bold")
      doc.setFontSize(12)
      line("Metrics", 8)
      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)

      const fmt = (n: number | undefined) =>
        n !== undefined ? n.toLocaleString() : "—"

      line(`Total users: ${fmt(summary?.totalUsers)} (${summary?.activeUsers ?? 0} active)`)
      line(`Total groups: ${fmt(summary?.totalGroups)} (${summary?.activeGroups ?? 0} active)`)
      line(`Total contributions: ${fmt(summary?.totalContributions)}`)
      if (summary?.totalContributionAmount !== undefined) {
        line(`Contribution amount: ${formatCurrencyTZS(summary.totalContributionAmount)}`)
      }
      y += 2
      line("Billings")
      line(`  Pending: ${summary?.pendingBillings ?? 0}`)
      line(`  Paid: ${summary?.paidBillings ?? 0}`)
      line(`  Failed: ${summary?.failedBillings ?? 0}`)

      const extraKeys = summary
        ? Object.keys(summary).filter(
          (k) =>
            ![
              "totalUsers",
              "activeUsers",
              "totalGroups",
              "activeGroups",
              "totalContributions",
              "totalContributionAmount",
              "totalBillings",
              "pendingBillings",
              "paidBillings",
              "failedBillings",
              "totalRevenue",
            ].includes(k)
        )
        : []
      if (extraKeys.length > 0) {
        y += 4
        doc.setFont("helvetica", "bold")
        line("Additional fields", 8)
        doc.setFont("helvetica", "normal")
        for (const key of extraKeys) {
          const v = summary?.[key]
          if (v === undefined) continue
          line(`  ${key}: ${typeof v === "number" ? fmt(v) : String(v)}`)
        }
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
