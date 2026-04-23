import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  total: number
  page: number
  limit: number
  baseUrl: string
  searchParams?: Record<string, string | undefined>
}

export function Pagination({ total, page, limit, baseUrl, searchParams = {} }: PaginationProps) {
  const totalPages = Math.ceil(total / limit)
  if (totalPages <= 1) return null

  const buildUrl = (p: number) => {
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v !== undefined) params.set(k, v)
    })
    params.set("page", String(p))
    params.set("limit", String(limit))
    return `${baseUrl}?${params.toString()}`
  }

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages} &mdash; {total} total
      </p>
      <div className="flex items-center gap-2">
        {page > 1 ? (
          <Button variant="outline" size="sm" asChild>
            <Link href={buildUrl(page - 1)}>
              <ChevronLeft className="size-4 mr-1" />
              Previous
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="size-4 mr-1" />
            Previous
          </Button>
        )}
        {page < totalPages ? (
          <Button variant="outline" size="sm" asChild>
            <Link href={buildUrl(page + 1)}>
              Next
              <ChevronRight className="size-4 ml-1" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            Next
            <ChevronRight className="size-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  )
}
