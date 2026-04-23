import { Badge } from "@/components/ui/badge"
import type { BillingStatus } from "@/interfaces/interface"
import { cn } from "@/lib/utils"

const STYLES: Record<BillingStatus, string> = {
  ACTIVE:
    "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
  INACTIVE:
    "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300",
  OVERDUE:
    "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300",
}

export function BillingStatusBadge({ status }: { status: BillingStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium", STYLES[status] ?? STYLES.INACTIVE)}
    >
      {status}
    </Badge>
  )
}
