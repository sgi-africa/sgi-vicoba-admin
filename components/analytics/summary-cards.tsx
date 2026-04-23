import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { SummaryCardsProps, StatCardProps } from "@/interfaces/interface"
import { Users, UsersRound, TrendingUp, Activity } from "lucide-react"


function StatCard({ title, value, sub, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">
          {value !== undefined ? value.toLocaleString() : "—"}
        </p>
        {sub && (
          <p className="text-xs text-muted-foreground mt-1">{sub}</p>
        )}
      </CardContent>
    </Card>
  )
}

export function SummaryCards({ summary, health }: SummaryCardsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold">System Overview</h2>
        {health ? (
          <Badge
            variant="outline"
            className={
              health.status?.toLowerCase() === "ok" ||
                health.status?.toLowerCase() === "healthy"
                ? "border-emerald-200 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                : "border-red-200 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            }
          >
            <Activity className="size-3 mr-1" />
            API {health.status}
          </Badge>
        ) : (
          <Badge variant="outline" className="text-muted-foreground">
            <Activity className="size-3 mr-1" />
            API unavailable
          </Badge>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Users"
          value={summary?.totalUsers}
          sub={`${summary?.activeUsers ?? 0} active`}
          icon={<Users className="size-4" />}
        />
        <StatCard
          title="Total Groups"
          value={summary?.totalGroups}
          sub={`${summary?.activeGroups ?? 0} active`}
          icon={<UsersRound className="size-4" />}
        />
        <StatCard
          title="Total Contributions"
          value={summary?.totalContributions}
          icon={<TrendingUp className="size-4" />}
        />
      </div>

      {summary && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Billings Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pending</span>
                <span className="font-medium">{summary.pendingBillings ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Paid</span>
                <span className="font-medium">{summary.paidBillings ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Failed</span>
                <span className="font-medium">{summary.failedBillings ?? 0}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
