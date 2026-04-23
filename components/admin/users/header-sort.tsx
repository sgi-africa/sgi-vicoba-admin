import { ArrowUpDown } from "lucide-react"

export function HeaderSort({ children }: { children: React.ReactNode }) {
    return (
        <div className="inline-flex items-center gap-1.5">
            {children}
            <ArrowUpDown className="size-3.5 text-sky-600 opacity-80" />
        </div>
    )
}