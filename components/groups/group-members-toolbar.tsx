"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { SearchInput } from "@/components/shared/search-input"
import { buildGroupDetailMembersHref } from "@/utils/groups/groupDetailMembersUrl"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SlidersHorizontal } from "lucide-react"
import type { GroupMember } from "@/interfaces/interface"
import { KycLabel } from "@/utils/users/kycLabel"
import { GroupMembersExportButton } from "./group-members-export-button"

export function GroupMembersToolbar({
  groupId,
  members,
}: {
  groupId: string
  members: GroupMember[]
}) {
  const sp = useSearchParams()

  return (
    <div className="flex w-full min-w-0 flex-1 flex-col gap-2 sm:max-w-xl sm:flex-initial sm:flex-row sm:items-center sm:justify-end sm:gap-2 lg:max-w-none">
      <div className="w-full min-w-0 sm:max-w-xs">
        <SearchInput
          placeholder="Search by name, email, or role…"
          paramKey="q"
        />
      </div>
      <div className="flex shrink-0 items-center justify-end gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="outline" size="sm">
              <SlidersHorizontal className="size-4" />
              <span className="ml-2">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="text-center">
              {KycLabel(sp)}
            </DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link
                href={buildGroupDetailMembersHref(sp, groupId, { kycVerified: null })}
              >
                KYC - All
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={buildGroupDetailMembersHref(sp, groupId, { kycVerified: "true" })}
              >
                KYC - Verified
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={buildGroupDetailMembersHref(sp, groupId, { kycVerified: "false" })}
              >
                KYC - Unverified
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <GroupMembersExportButton members={members} />
      </div>
    </div>
  )
}
