"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { SearchInput } from "@/components/admin/shared/search-input"
import { buildUsersListHref } from "./users-list-url"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SlidersHorizontal } from "lucide-react"
import type { AdminUser } from "@/interfaces/interface"
import { KycLabel } from "@/utils/users/kycLabel"
import { RoleLabel } from "@/utils/users/roleLabel"
import { UsersExportButton } from "./usersExportButton"

export function UsersListToolbar({ users }: { users: AdminUser[] }) {
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
          href={buildUsersListHref(sp, { isActive: null })}
          className={tabClass(tabAll)}
        >
          All users
        </Link>
        <Link
          href={buildUsersListHref(sp, { isActive: "true" })}
          className={tabClass(tabActive)}
        >
          Active
        </Link>
        <Link
          href={buildUsersListHref(sp, { isActive: "false" })}
          className={tabClass(tabInactive)}
        >
          Inactive
        </Link>
      </div>

      <div className="flex w-full min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        <div className="min-w-0 flex-1 sm:max-w-md">
          <SearchInput placeholder="Search by name or email....." />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="outline" size="sm">
                <SlidersHorizontal className="size-4" />
                <span className="ml-2">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel className="text-center">{KycLabel(sp)}</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={buildUsersListHref(sp, { kycVerified: null })}>
                  KYC - All
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={buildUsersListHref(sp, { kycVerified: "true" })}>
                  KYC - Verified
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={buildUsersListHref(sp, { kycVerified: "false" })}>
                  KYC - Unverified
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-center">{RoleLabel(sp)}</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={buildUsersListHref(sp, { systemRole: null })}>
                  Role - All
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={buildUsersListHref(sp, { systemRole: "ADMIN" })}>
                  Admins only
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={buildUsersListHref(sp, { systemRole: "USER" })}>
                  Users only
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <UsersExportButton users={users} />
        </div>
      </div>
    </div>
  )
}

