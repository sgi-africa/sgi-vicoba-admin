import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatusBadge } from "@/components/shared/status-badge"
import type { Contribution } from "@/interfaces/interface"

interface ContributionsTableProps {
  contributions: Contribution[]
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-TZ", {
    style: "currency",
    currency: "TZS",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function ContributionsTable({ contributions }: ContributionsTableProps) {
  if (contributions.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-10 text-center">
        No records found.
      </p>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contributions.map((c) => (
            <TableRow key={c.id}>
              <TableCell className="font-medium">
                {c.user
                  ? `${c.user.firstName} ${c.user.lastName}`
                  : c.userId}
              </TableCell>
              <TableCell>{c.group?.name ?? c.groupId}</TableCell>
              <TableCell>
                <StatusBadge
                  status={c.type === "contribution" ? "ACTIVE" : "PENDING"}
                  label={
                    c.type === "contribution" ? "Contribution" : "Loan Repayment"
                  }
                />
              </TableCell>
              <TableCell>{formatCurrency(c.amount)}</TableCell>
              <TableCell>
                {new Date(c.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
