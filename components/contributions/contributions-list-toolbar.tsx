"use client"

import { SearchInput } from "@/components/shared/search-input"
import { TypeToggle } from "@/components/contributions/type-toggle"
import { ContributionsExportButton } from "@/components/contributions/contributions-export-button"
import type { Contribution, ContributionType } from "@/interfaces/interface"

export function ContributionsListToolbar({
  currentType,
  contributions,
}: {
  currentType: ContributionType
  contributions: Contribution[]
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <TypeToggle currentType={currentType} />
      <div className="flex w-full min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        <div className="w-full min-w-0 sm:max-w-xs">
          <SearchInput
            placeholder="Search by member..."
            paramKey="q"
          />
        </div>
        <div className="flex shrink-0 items-center justify-end gap-2">
          <ContributionsExportButton contributions={contributions} />
        </div>
      </div>
    </div>
  )
}
