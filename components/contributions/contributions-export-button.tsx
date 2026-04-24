import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import type { Contribution } from "@/interfaces/interface"

export function ContributionsExportButton({
  contributions,
}: {
  contributions: Contribution[]
}) {
  const run = () => {
    const header = [
      "id",
      "type",
      "amount",
      "userId",
      "groupId",
      "memberName",
      "groupName",
      "createdAt",
    ]
    const escape = (s: string) => `"${String(s).replace(/"/g, '""')}"`
    const rows = contributions.map((c) => {
      const memberName = c.user
        ? `${c.user.firstName} ${c.user.lastName}`.trim()
        : ""
      return [
        c.id,
        c.type,
        c.amount,
        c.userId,
        c.groupId,
        memberName,
        c.group?.name ?? "",
        c.createdAt,
      ]
        .map((col) => escape(String(col)))
        .join(",")
    })
    const csv = [header.join(","), ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `contributions-${new Date().toISOString().slice(0, 10)}.csv`
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
      disabled={contributions.length === 0}
    >
      <Upload className="size-4" />
      <span className="ml-2">Export</span>
    </Button>
  )
}
