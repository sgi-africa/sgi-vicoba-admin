"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import type { ContributionType } from "@/interfaces/interface"

interface TypeToggleProps {
  currentType: ContributionType
}

export function TypeToggle({ currentType }: TypeToggleProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setType = (type: ContributionType) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("type", type)
    params.set("page", "1")
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex rounded-lg border p-1 gap-1 w-fit">
      <Button
        size="sm"
        variant={currentType === "savings" ? "default" : "ghost"}
        onClick={() => setType("savings")}
      >
        Contributions
      </Button>
      <Button
        size="sm"
        variant={currentType === "loanRepayment" ? "default" : "ghost"}
        onClick={() => setType("loanRepayment")}
      >
        Loan Repayments
      </Button>
    </div>
  )
}
