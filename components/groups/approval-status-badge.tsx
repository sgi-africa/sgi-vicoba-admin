import { Badge } from "@/components/ui/badge"
import type { GroupApprovalStatus } from "@/interfaces/interface"
import { cn } from "@/lib/utils"

const KNOWN_STYLES: Record<GroupApprovalStatus, string> = {
  PENDING:
    "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200",
  APPROVED:
    "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
  REJECTED:
    "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300",
}

export function ApprovalStatusBadge({
  status,
}: {
  status: GroupApprovalStatus | string | null | undefined
}) {
  const label =
    typeof status === "string" && status.trim() !== ""
      ? status.trim()
      : "—"
  const key = typeof status === "string" ? status.toUpperCase() : ""
  const style =
    key in KNOWN_STYLES
      ? KNOWN_STYLES[key as GroupApprovalStatus]
      : "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300"

  return (
    <Badge variant="outline" className={cn("font-medium capitalize", style)}>
      {label}
    </Badge>
  )
}
