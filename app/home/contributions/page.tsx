import { getContributions } from "./_actions"
import { ContributionsDataTable } from "@/components/contributions/contributions-data-table"
import { ContributionsListToolbar } from "@/components/contributions/contributions-list-toolbar"
import { ContributionsListPagination } from "@/components/contributions/contributions-list-pagination"
import { DataError } from "@/components/shared/data-error"
import { handleApiError } from "@/lib/apiError"
import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { ContributionType } from "@/interfaces/interface"
import type { ContributionsPageProps } from "@/interfaces/interface"

export default async function ContributionsPage({
  searchParams,
}: ContributionsPageProps) {
  const params = await searchParams
  const page = Number(params.page ?? 1)
  const limit = Number(params.limit ?? 20)
  const type = (params.type as ContributionType) ?? "savings"

  let data
  let apiError

  try {
    data = await getContributions({
      page,
      limit,
      type,
      groupId: params.groupId,
      userId: params.userId,
      from: params.from,
      to: params.to,
      q: params.q,
    })
  } catch (error) {
    apiError = handleApiError(error)
  }

  if (apiError) {
    return <DataError status={apiError.status} message={apiError.message} />
  }

  const contributions = data?.data ?? []
  const total = data?.total ?? 0

  return (
    <div className="p-6">
      <Card className="overflow-hidden gap-0 py-0">
        <CardHeader className="space-y-6 border-b px-6 py-6">
          <div>
            <CardTitle className="text-xl font-bold tracking-tight text-foreground">
              Contributions
            </CardTitle>
            <CardDescription className="mt-1.5 text-sm text-muted-foreground">
              Browse member contributions and loan repayments.
            </CardDescription>
          </div>
          <Suspense
            fallback={
              <div
                className="h-10 w-full max-w-3xl rounded-lg bg-muted/30 animate-pulse"
                aria-hidden
              />
            }
          >
            <ContributionsListToolbar
              currentType={type}
              contributions={contributions}
            />
          </Suspense>
        </CardHeader>
        <CardContent className="border-b px-0">
          <ContributionsDataTable contributions={contributions} />
        </CardContent>
        <CardFooter className="flex flex-col border-t border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Suspense
            fallback={
              <p className="text-sm text-muted-foreground">
                Showing {total > 0 ? "…" : "0"} to {total > 0 ? "…" : "0"} of{" "}
                {total}
              </p>
            }
          >
            {data && (
              <ContributionsListPagination
                total={total}
                page={page}
                limit={limit}
              />
            )}
          </Suspense>
        </CardFooter>
      </Card>
    </div>
  )
}
