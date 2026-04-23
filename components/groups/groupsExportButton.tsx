import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import type { AdminGroup } from "@/interfaces/interface"

export function GroupsExportButton({ groups }: { groups: AdminGroup[] }) {
  const run = () => {
    const header = [
      "id",
      "name",
      "description",
      "isActive",
      "isDeleted",
      "billingStatus",
      "memberCount",
      "createdAt",
      "updatedAt",
    ]
    const escape = (s: string) => `"${String(s).replace(/"/g, '""')}"`
    const rows = groups.map((g) =>
      [
        g.id,
        g.name,
        g.description ?? "",
        g.isActive,
        g.isDeleted,
        g.billingStatus,
        g.memberCount ?? "",
        g.createdAt,
        g.updatedAt,
      ]
        .map((c) => escape(String(c)))
        .join(",")
    )
    const csv = [header.join(","), ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `groups-${new Date().toISOString().slice(0, 10)}.csv`
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
      disabled={groups.length === 0}
    >
      <Upload className="size-4" />
      <span className="ml-2">Export</span>
    </Button>
  )
}
