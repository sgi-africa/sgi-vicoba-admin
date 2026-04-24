import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/shared/status-badge"
import { NotificationsTableProps } from "@/interfaces/interface"
import { formatIsoSafe } from "@/utils/global/formatDate"


export function NotificationsTable({ notifications }: NotificationsTableProps) {
  if (notifications.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-10 text-center">
        No notifications found.
      </p>
    )
  }

  return (
    <div className="rounded-md border">
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[48%] min-w-0">Message</TableHead>
            <TableHead className="w-[22%]">Recipient</TableHead>
            <TableHead className="w-[15%]">Status</TableHead>
            <TableHead className="w-[15%]">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifications.map((n) => (
            <TableRow key={n.id}>
              <TableCell className="min-w-0 align-top py-3 whitespace-normal">
                <p
                  className="line-clamp-2 text-sm font-medium leading-snug text-foreground wrap-break-word"
                  title={n.message}
                >
                  {n.message}
                </p>
              </TableCell>
              <TableCell className="align-top py-3 text-sm">
                {n.user
                  ? `${n.user.firstName} ${n.user.lastName}`
                  : n.userId ?? "Broadcast"}
              </TableCell>
              <TableCell className="align-top py-3">
                <StatusBadge status={n.status} prettyLabel />
              </TableCell>
              <TableCell className="align-top py-3 text-sm text-muted-foreground">
                {formatIsoSafe(n.sentAt ?? n.createdAt ?? n.updatedAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
