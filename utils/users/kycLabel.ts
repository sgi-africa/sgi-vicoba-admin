import { useSearchParams } from "next/navigation"

export function KycLabel(sp: ReturnType<typeof useSearchParams>) {
    const v = sp.get("kycVerified")
    if (v === "true") return "KYC: Verified"
    if (v === "false") return "KYC: Unverified"
    return "KYC: All"
}