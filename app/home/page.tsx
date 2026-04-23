import { getAnalyticsSummary, getHealthStatus } from "./_actions"
import { SummaryCards } from "@/components/analytics/summary-cards"
import { DashboardPdfDownload } from "@/components/analytics/dashboard-pdf-download"

export default async function DashboardPage() {
  const now = new Date()
  const from = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const to = now.toISOString()

  const [summary, health] = await Promise.all([
    getAnalyticsSummary({ from, to }),
    getHealthStatus(),
  ])

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Platform overview for the current month.
          </p>
        </div>
        <DashboardPdfDownload
          from={from}
          to={to}
          summary={summary}
          health={health}
        />
      </div>
      <SummaryCards summary={summary} health={health} />
    </div>
  )
}
