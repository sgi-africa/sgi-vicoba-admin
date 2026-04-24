import { Contribution } from "@/interfaces/interface"

export function memberInitials(c: Contribution) {
    if (c.user?.firstName || c.user?.lastName) {
        const a = (c.user?.firstName?.[0] ?? "").toUpperCase()
        const b = (c.user?.lastName?.[0] ?? "").toUpperCase()
        return (a + b) || "—"
    }
    return "—"
}