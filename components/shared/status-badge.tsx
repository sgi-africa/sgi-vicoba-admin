import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { StatusBadgeProps } from "@/interfaces/interface"
import { toPrettyStatus } from "@/utils/status/status"

const EMERALD =
  "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400"
const RED =
  "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400"
const AMBER =
  "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400"
const SLATE =
  "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400"

const STATUS_STYLES: Record<string, string> = {
  // Payment / billing
  PAID: EMERALD,
  PENDING: AMBER,
  FAILED: RED,
  // Group billing
  ACTIVE: EMERALD,
  INACTIVE: SLATE,
  OVERDUE: RED,
  // User / KYC
  VERIFIED: EMERALD,
  UNVERIFIED: SLATE,
  // Notifications (and shared success / error)
  SENT: EMERALD,
  DELIVERED: EMERALD,
  SUCCESS: EMERALD,
  READ: EMERALD,
  COMPLETED: EMERALD,
  ERROR: RED,
  BOUNCED: RED,
  REJECTED: RED,
  QUEUED: AMBER,
  PROCESSING: AMBER,
  SCHEDULED: AMBER,
  DRAFT: AMBER,
  // Contributions
  SAVINGS: EMERALD,
  JAMII: AMBER,
  LOAN_REPAYMENT: RED,
  // Generic
  true: EMERALD,
  false: SLATE,
}

const DEFAULT_UNKNOWN = SLATE


export function StatusBadge({
  status,
  label,
  prettyLabel = false,
}: StatusBadgeProps) {
  const str = String(status)
  const lookupKey =
    typeof status === "boolean"
      ? str
      : str.toUpperCase().replace(/\s+/g, "_")
  const className =
    STATUS_STYLES[lookupKey] ?? STATUS_STYLES[str] ?? DEFAULT_UNKNOWN
  const display = label ?? (prettyLabel ? toPrettyStatus(str) : str)

  return (
    <Badge
      variant="outline"
      className={cn("font-medium text-xs", className)}
    >
      {display}
    </Badge>
  )
}
