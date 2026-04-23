import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import type { AdminUser } from "@/interfaces/interface"

export function UsersExportButton({ users }: { users: AdminUser[] }) {
    const run = () => {
        const header = [
            "id",
            "firstName",
            "lastName",
            "email",
            "phone",
            "systemRole",
            "isActive",
            "kycVerified",
            "createdAt",
        ]
        const escape = (s: string) => `"${String(s).replace(/"/g, '""')}"`
        const rows = users.map((u) =>
            [
                u.id,
                u.firstName,
                u.lastName,
                u.email,
                u.phone,
                u.systemRole,
                u.isActive,
                u.kycVerified,
                u.createdAt,
            ]
                .map((c) => escape(String(c)))
                .join(",")
        )
        const csv = [header.join(","), ...rows].join("\n")
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `users-${new Date().toISOString().slice(0, 10)}.csv`
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
            disabled={users.length === 0}
        >
            <Upload className="size-4" />
            <span className="ml-2" > Export </span>
        </Button>
    )
}
