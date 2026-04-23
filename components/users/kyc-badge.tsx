import { Badge } from "@/components/ui/badge"

export function KycBadge({ kycVerified }: { kycVerified: boolean }) {
    if (kycVerified) {
        return (
            <Badge
                variant="outline"
                className="border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
            >
                Verified
            </Badge>
        )
    }
    return (
        <Badge
            variant="outline"
            className="border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
        >
            Unverified
        </Badge>
    )
}