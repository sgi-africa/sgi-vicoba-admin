"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { buildUsersPageHref } from "./users-list-url"
import { cn } from "@/lib/utils"
import { pageWindow } from "@/utils/users/pageWindow"


const pageButtonClass = "inline-flex size-8 shrink-0 items-center justify-center rounded-md border text-sm font-medium transition-colors"

export function UsersListPagination({
  total,
  page,
  limit,
}: {
  total: number
  page: number
  limit: number
}) {
  const sp = useSearchParams()
  const totalPages = total === 0 ? 0 : Math.ceil(total / limit)
  const from = total === 0 ? 0 : (page - 1) * limit + 1
  const to = Math.min(page * limit, total)
  const pages = totalPages > 0 ? pageWindow(page, totalPages, 5) : []

  if (totalPages <= 0) {
    return (
      <p className="text-sm text-muted-foreground">Showing 0 to 0 of 0</p>
    )
  }

  const limitStr = String(limit)
  const prevHref = buildUsersPageHref(sp, page - 1, { limit: limitStr })
  const nextHref = buildUsersPageHref(sp, page + 1, { limit: limitStr })

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {from} to {to} of {total}
      </p>
      <div className="flex items-center justify-end gap-1">
        {page <= 1 ? (
          <span
            className={cn(
              pageButtonClass,
              "border-input text-muted-foreground pointer-events-none opacity-50"
            )}
          >
            <ChevronLeft className="size-4" />
          </span>
        ) : (
          <Link
            href={prevHref}
            className={cn(
              pageButtonClass,
              "border-input bg-background hover:bg-muted/80"
            )}
            scroll={false}
          >
            <ChevronLeft className="size-4" />
          </Link>
        )}
        <div className="flex items-center gap-0.5 px-0.5">
          {pages.map((p) =>
            p === page ? (
              <span
                key={p}
                className={cn(
                  pageButtonClass,
                  "border-primary bg-primary text-primary-foreground shadow-sm"
                )}
              >
                {p}
              </span>
            ) : (
              <Link
                key={p}
                href={buildUsersPageHref(sp, p, { limit: limitStr })}
                className={cn(
                  pageButtonClass,
                  "border-input bg-background text-foreground hover:bg-muted/80"
                )}
                scroll={false}
              >
                {p}
              </Link>
            )
          )}
        </div>
        {page >= totalPages ? (
          <span
            className={cn(
              pageButtonClass,
              "border-input text-muted-foreground pointer-events-none opacity-50"
            )}
          >
            <ChevronRight className="size-4" />
          </span>
        ) : (
          <Link
            href={nextHref}
            className={cn(
              pageButtonClass,
              "border-input bg-background hover:bg-muted/80"
            )}
            scroll={false}
          >
            <ChevronRight className="size-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
