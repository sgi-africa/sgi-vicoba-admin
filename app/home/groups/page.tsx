import { getGroups } from "./_actions"
import { GroupsDataTable } from "@/components/groups/groups-data-table"
import { GroupsListToolbar } from "@/components/groups/groups-list-toolbar"
import { GroupsListPagination } from "@/components/groups/groups-list-pagination"
import { DataError } from "@/components/shared/data-error"
import { handleApiError } from "@/lib/apiError"
import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GroupsPageProps } from "@/interfaces/interface"

export default async function GroupsPage({ searchParams }: GroupsPageProps) {
  const params = await searchParams
  const page = Number(params.page ?? 1)
  const limit = Number(params.limit ?? 20)

  let data
  let apiError

  try {
    data = await getGroups({
      page,
      limit,
      q: params.q,
      billingStatus: params.billingStatus as
        | "INACTIVE"
        | "ACTIVE"
        | "OVERDUE"
        | undefined,
      isActive: params.isActive,
      isDeleted: params.isDeleted,
    })
  } catch (error) {
    apiError = handleApiError(error)
  }

  if (apiError) {
    return <DataError status={apiError.status} message={apiError.message} />
  }

  const groups = data?.data ?? []
  const total = data?.total ?? 0

  return (
    <div className="p-6">
      <Card className="overflow-hidden py-0 gap-0">
        <CardHeader className="space-y-6 border-b px-6 py-6">
          <div>
            <CardTitle className="text-xl font-bold tracking-tight text-foreground">
              Groups
            </CardTitle>
            <CardDescription className="mt-1.5 text-sm text-muted-foreground">
              Your SGI VICOBA groups, billing state, and membership overview.
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
            <GroupsListToolbar groups={groups} />
          </Suspense>
        </CardHeader>
        <CardContent className="border-b px-0">
          <GroupsDataTable groups={groups} />
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
              <GroupsListPagination
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
