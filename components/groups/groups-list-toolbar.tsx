"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { SearchInput } from "@/components/shared/search-input"
import { buildGroupsListHref } from "@/utils/groups/groupsListUrl"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SlidersHorizontal } from "lucide-react"
import type { AdminGroup } from "@/interfaces/interface"
import { GroupsExportButton } from "./groupsExportButton"
import { approvalFilterLabel, billingFilterLabel } from "@/utils/groups/billingFilterLabel"


export function GroupsListToolbar({ groups }: { groups: AdminGroup[] }) {
  const sp = useSearchParams()
  const isActive = sp.get("isActive")
  const tabAll = !isActive
  const tabActive = isActive === "true"
  const tabInactive = isActive === "false"

  const tabClass = (active: boolean) =>
    cn(
      "inline-flex h-8 items-center rounded-md px-3 text-sm font-medium transition-colors",
      active
        ? "bg-primary text-primary-foreground hover:bg-primary/90"
        : "text-muted-foreground hover:text-foreground"
    )

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="inline-flex w-fit max-w-full flex-wrap gap-1 rounded-lg border bg-muted/40 p-1">
        <Link
          href={buildGroupsListHref(sp, { isActive: null })}
          className={tabClass(tabAll)}
        >
          All groups
        </Link>
        <Link
          href={buildGroupsListHref(sp, { isActive: "true" })}
          className={tabClass(tabActive)}
        >
          Active
        </Link>
        <Link
          href={buildGroupsListHref(sp, { isActive: "false" })}
          className={tabClass(tabInactive)}
        >
          Inactive
        </Link>
      </div>

      <div className="flex w-full min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        <div className="min-w-0 flex-1 sm:max-w-md">
          <SearchInput placeholder="Search by group name....." />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="outline" size="sm">
                <SlidersHorizontal className="size-4" />
                <span className="ml-2">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="text-center text-xs">
                {billingFilterLabel(sp)}
              </DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={buildGroupsListHref(sp, { billingStatus: null })}>
                  Billing - All
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={buildGroupsListHref(sp, { billingStatus: "ACTIVE" })}
                >
                  Active billing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={buildGroupsListHref(sp, { billingStatus: "INACTIVE" })}
                >
                  Inactive billing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={buildGroupsListHref(sp, { billingStatus: "OVERDUE" })}
                >
                  Overdue
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-center text-xs">
                {approvalFilterLabel(sp)}
              </DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={buildGroupsListHref(sp, { approvalStatus: null })}>
                  Approval - All
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={buildGroupsListHref(sp, {
                    approvalStatus: "PENDING",
                  })}
                >
                  Pending
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={buildGroupsListHref(sp, {
                    approvalStatus: "APPROVED",
                  })}
                >
                  Approved
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={buildGroupsListHref(sp, {
                    approvalStatus: "REJECTED",
                  })}
                >
                  Rejected
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <GroupsExportButton groups={groups} />
        </div>
      </div>
    </div>
  )
}
