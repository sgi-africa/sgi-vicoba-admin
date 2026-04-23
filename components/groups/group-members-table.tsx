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
import { GroupMembersTableProps } from "@/interfaces/interface"
import Link from "next/link"


export function GroupMembersTable({ members }: GroupMembersTableProps) {
  if (members.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-6 text-center">
        No members found.
      </p>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>KYC</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="w-20" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">
                {member.user
                  ? `${member.user.firstName} ${member.user.lastName}`
                  : member.userId}
              </TableCell>
              <TableCell>{member.user?.email ?? "—"}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>
                {member.user ? (
                  <StatusBadge
                    status={member.user.kycVerified ? "VERIFIED" : "UNVERIFIED"}
                    label={member.user.kycVerified ? "Verified" : "Unverified"}
                  />
                ) : (
                  "—"
                )}
              </TableCell>
              <TableCell>
                {new Date(member.joinedAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {member.userId && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/home/users/${member.userId}`}>View</Link>
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
