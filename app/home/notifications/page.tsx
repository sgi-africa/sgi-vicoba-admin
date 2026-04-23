import { getNotifications } from "./_actions"
import { NotificationsTable } from "@/components/notifications/notifications-table"
import { NotificationsListHeader } from "@/components/notifications/notifications-list-header"
import { NotificationsListPagination } from "@/components/notifications/notifications-list-pagination"
import { DataError } from "@/components/shared/data-error"
import { handleApiError } from "@/lib/apiError"
import { Suspense } from "react"
import { NotificationsPageProps } from "@/interfaces/interface"

export default async function NotificationsPage({
  searchParams,
}: NotificationsPageProps) {
  const params = await searchParams
  const page = Number(params.page ?? 1)
  const limit = Number(params.limit ?? 20)

  let data
  let apiError

  try {
    data = await getNotifications({
      page,
      limit,
      status: params.status,
      from: params.from,
      to: params.to,
    })
  } catch (error) {
    apiError = handleApiError(error)
  }

  if (apiError) {
    return <DataError status={apiError.status} message={apiError.message} />
  }

  const total = data?.total ?? 0

  return (
    <div className="p-6 space-y-4">
      <Suspense
        fallback={
          <div className="h-10 w-full max-w-lg rounded-md bg-muted/40 animate-pulse" />
        }
      >
        <NotificationsListHeader />
      </Suspense>

      <NotificationsTable notifications={data?.data ?? []} />

      {data && (
        <Suspense
          fallback={
            <p className="text-sm text-muted-foreground border-t pt-4">
              Loading pagination…
            </p>
          }
        >
          <NotificationsListPagination
            total={total}
            page={page}
            limit={limit}
          />
        </Suspense>
      )}
    </div>
  )
}
