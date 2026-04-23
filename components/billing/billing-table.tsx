import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import type { Billing } from "@/interfaces/interface"
import Link from "next/link"

interface BillingTableProps {
  billings: Billing[]
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-TZ", {
    style: "currency",
    currency: "TZS",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function BillingTable({ billings }: BillingTableProps) {
  if (billings.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-10 text-center">
        No billing records found.
      </p>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Group</TableHead>
            <TableHead>Billing Month</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Paid At</TableHead>
            <TableHead className="w-20" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {billings.map((billing) => (
            <TableRow key={billing.id}>
              <TableCell className="font-medium">
                {billing.group?.name ?? billing.groupId}
              </TableCell>
              <TableCell>
                {new Date(billing.billingMonth).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </TableCell>
              <TableCell>{formatCurrency(billing.amount)}</TableCell>
              <TableCell>
                <StatusBadge status={billing.status} label={billing.status} />
              </TableCell>
              <TableCell>
                {billing.paidAt
                  ? new Date(billing.paidAt).toLocaleDateString()
                  : "—"}
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/home/billings/${billing.id}`}>View</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
