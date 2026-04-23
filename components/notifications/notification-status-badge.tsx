import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const STYLES: { match: (s: string) => boolean; className: string }[] = [
  {
    match: (s) =>
      /^(SENT|DELIVERED|SUCCESS|READ|COMPLETED)$/i.test(s) ||
      s.includes("sent") ||
      s.includes("deliver"),
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
  },
  {
    match: (s) =>
      /^(FAILED|ERROR|BOUNCED|REJECTED)$/i.test(s) || s.includes("fail"),
    className:
      "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300",
  },
  {
    match: (s) =>
      /^(PENDING|QUEUED|PROCESSING|SCHEDULED|DRAFT)$/i.test(s) || s.includes("pend"),
    className:
      "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200",
  },
]

function classForStatus(raw: string) {
  const s = String(raw).trim()
  for (const { match, className } of STYLES) {
    if (match(s)) return className
  }
  return "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300"
}

function formatLabel(raw: string) {
  const s = String(raw).trim()
  if (!s) return "—"
  if (s.length <= 1) return s.toUpperCase()
  return s.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
}

export function NotificationStatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium text-xs", classForStatus(status))}
    >
      {formatLabel(status)}
    </Badge>
  )
}
