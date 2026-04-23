import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/shared/status-badge"
import type { Billing } from "@/interfaces/interface"
import { Calendar, Building2, Banknote, CheckCircle2 } from "lucide-react"

interface BillingDetailCardProps {
  billing: Billing
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-TZ", {
    style: "currency",
    currency: "TZS",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function BillingDetailCard({ billing }: BillingDetailCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Billing Record</CardTitle>
        <div className="mt-1">
          <StatusBadge status={billing.status} label={billing.status} />
        </div>
      </CardHeader>
      <CardContent className="grid sm:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Building2 className="size-4 shrink-0" />
          <span>Group: {billing.group?.name ?? billing.groupId}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="size-4 shrink-0" />
          <span>
            Billing month:{" "}
            {new Date(billing.billingMonth).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Banknote className="size-4 shrink-0" />
          <span>Amount: {formatCurrency(billing.amount)}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>
            {billing.paidAt
              ? `Paid on ${new Date(billing.paidAt).toLocaleDateString()}`
              : "Not yet paid"}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
