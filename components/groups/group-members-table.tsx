import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
          <TableRow className="border-b bg-muted/30 hover:bg-transparent">
            <TableHead className="h-12 px-4">Name</TableHead>
            <TableHead className="px-4">Email</TableHead>
            <TableHead className="px-4">Role</TableHead>
            <TableHead className="px-4">KYC</TableHead>
            <TableHead className="px-4">Joined</TableHead>
            <TableHead className="w-20 px-4 pr-6" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id} className="group">
              <TableCell className="px-4 py-3 font-medium">
                {member.user
                  ? `${member.user.firstName} ${member.user.lastName}`
                  : member.userId}
              </TableCell>
              <TableCell className="px-4 py-3">
                {member.user?.email ?? "—"}
              </TableCell>
              <TableCell className="px-4 py-3">{member.role}</TableCell>
              <TableCell className="px-4 py-3">
                {member.user ? (
                  <StatusBadge
                    status={member.user.kycVerified ? "VERIFIED" : "UNVERIFIED"}
                    label={member.user.kycVerified ? "Verified" : "Unverified"}
                  />
                ) : (
                  "—"
                )}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-3 text-sm text-muted-foreground">
                {new Date(member.joinedAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="px-4 py-3 pr-6">
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
