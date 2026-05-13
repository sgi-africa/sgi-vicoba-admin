import { useSearchParams } from "next/navigation"

export function billingFilterLabel(sp: ReturnType<typeof useSearchParams>) {
    const b = sp.get("billingStatus")
    if (b === "ACTIVE") return "Billing: Active"
    if (b === "INACTIVE") return "Billing: Inactive"
    if (b === "OVERDUE") return "Billing: Overdue"
    return "Billing: All"
}

export function approvalFilterLabel(sp: ReturnType<typeof useSearchParams>) {
    const a = sp.get("approvalStatus")
    if (a === "PENDING") return "Approval: Pending"
    if (a === "APPROVED") return "Approval: Approved"
    if (a === "REJECTED") return "Approval: Rejected"
    return "Approval: All"
}