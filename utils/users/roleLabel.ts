import { useSearchParams } from "next/navigation"

export function RoleLabel(sp: ReturnType<typeof useSearchParams>) {
    const r = sp.get("systemRole")
    if (r === "ADMIN") return "Role: Admin"
    if (r === "USER") return "Role: User"
    return "Role: All"
}