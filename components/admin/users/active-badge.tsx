import { Badge } from "@/components/ui/badge"

export function ActiveBadge({ active }: { active: boolean }) {
    if (active) {
        return (
            <Badge
                variant="outline"
                className="border-sky-200 bg-sky-50 font-medium text-sky-700 dark:border-sky-800 dark:bg-sky-950/50 dark:text-sky-300"
            >
                Active
            </Badge>
        )
    }
    return (
        <Badge
            variant="outline"
            className="border-slate-200 bg-slate-50 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400"
        >
            Inactive
        </Badge>
    )
}