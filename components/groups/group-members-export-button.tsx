import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import type { GroupMember } from "@/interfaces/interface"

export function GroupMembersExportButton({
  members,
}: {
  members: GroupMember[]
}) {
  const run = () => {
    const header = [
      "id",
      "userId",
      "name",
      "email",
      "role",
      "kycVerified",
      "joinedAt",
    ]
    const escape = (s: string) => `"${String(s).replace(/"/g, '""')}"`
    const rows = members.map((m) => {
      const name = m.user
        ? `${m.user.firstName} ${m.user.lastName}`.trim()
        : ""
      return [
        m.id,
        m.userId,
        name,
        m.user?.email ?? "",
        m.role,
        m.user ? String(m.user.kycVerified) : "",
        m.joinedAt,
      ]
        .map((c) => escape(String(c)))
        .join(",")
    })
    const csv = [header.join(","), ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `group-members-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={run}
      className="bg-primary text-primary-foreground hover:bg-primary/90"
      disabled={members.length === 0}
    >
      <Upload className="size-4" />
      <span className="ml-2">Export</span>
    </Button>
  )
}
