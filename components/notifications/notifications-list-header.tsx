"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { SearchInput } from "@/components/shared/search-input"
import { buildNotificationsListHref } from "@/utils/notifications/notificationsListUrl"

export function NotificationsListHeader() {
  const sp = useSearchParams()
  const st = (sp.get("status") ?? "").toLowerCase()
  const tabAll = !st
  const tabSent = st === "sent"
  const tabFailed = st === "failed"

  const tabClass = (active: boolean) =>
    cn(
      "inline-flex h-8 items-center rounded-md px-3 text-sm font-medium transition-colors",
      active
        ? "bg-primary text-primary-foreground hover:bg-primary/90"
        : "text-muted-foreground hover:text-foreground"
    )

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="inline-flex w-fit max-w-full flex-wrap gap-1 rounded-lg border bg-muted/40 p-1">
        <Link
          href={buildNotificationsListHref(sp, { status: null })}
          className={tabClass(tabAll)}
        >
          All
        </Link>
        <Link
          href={buildNotificationsListHref(sp, { status: "sent" })}
          className={tabClass(tabSent)}
        >
          Sent
        </Link>
        <Link
          href={buildNotificationsListHref(sp, { status: "failed" })}
          className={tabClass(tabFailed)}
        >
          Failed
        </Link>
      </div>
      <div className="w-full min-w-0 sm:max-w-sm">
        <SearchInput
          placeholder="Search by status. (Sent, Failed)"
          paramKey="status"
        />
      </div>
    </div>
  )
}
