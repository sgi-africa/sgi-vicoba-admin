import { AdminUser } from "@/interfaces/interface"

export function initials(u: AdminUser) {
    const a = (u.firstName?.[0] ?? "").toUpperCase()
    const b = (u.lastName?.[0] ?? "").toUpperCase()
    return (a + b) || "-"
}