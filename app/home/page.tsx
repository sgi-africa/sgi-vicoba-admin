import { getAnalyticsSummary, getHealthStatus } from "./_actions"
import { getUsers } from "./users/_actions"
import { getGroups } from "./groups/_actions"
import { SummaryCards } from "@/components/analytics/summary-cards"
import { DashboardPdfDownload } from "@/components/analytics/dashboard-pdf-download"

export default async function DashboardPage() {
  const now = new Date()
  const from = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const to = now.toISOString()

  const [
    summary,
    health,
    usersList,
    usersActiveList,
    groupsList,
    groupsActiveList,
  ] = await Promise.all([
    getAnalyticsSummary({ from, to }),
    getHealthStatus(),
    getUsers({ page: 1, limit: 1 }),
    getUsers({ page: 1, limit: 1, isActive: "true" }),
    getGroups({ page: 1, limit: 1 }),
    getGroups({ page: 1, limit: 1, isActive: "true" }),
  ])

  const usersDirectory = {
    total: usersList?.total ?? 0,
    activeTotal: usersActiveList?.total ?? 0,
  }
  const groupsDirectory = {
    total: groupsList?.total ?? 0,
    activeTotal: groupsActiveList?.total ?? 0,
  }

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
      <SummaryCards
        summary={summary}
        health={health}
        usersDirectory={usersDirectory}
        groupsDirectory={groupsDirectory}
      />
    </div>
  )
}
