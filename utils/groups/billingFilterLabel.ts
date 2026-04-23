import { useSearchParams } from "next/navigation"

export function billingFilterLabel(sp: ReturnType<typeof useSearchParams>) {
    const b = sp.get("billingStatus")
    if (b === "ACTIVE") return "Billing: Active"
    if (b === "INACTIVE") return "Billing: Inactive"
    if (b === "OVERDUE") return "Billing: Overdue"
    return "Billing: All"
}