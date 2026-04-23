import { getUsers } from "./_actions"
import { UsersDataTable } from "@/components/admin/users/users-data-table"
import { UsersListToolbar } from "@/components/admin/users/users-list-toolbar"
import { UsersListPagination } from "@/components/admin/users/users-list-pagination"
import { DataError } from "@/components/admin/shared/data-error"
import { handleApiError } from "@/lib/apiError"
import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UsersPageProps } from "@/interfaces/interface"


export default async function UsersPage({ searchParams }: UsersPageProps) {
  const params = await searchParams
  const page = Number(params.page ?? 1)
  const limit = Number(params.limit ?? 20)

  let data
  let apiError

  try {
    data = await getUsers({
      page,
      limit,
      q: params.q,
      systemRole: params.systemRole as "ADMIN" | "USER" | undefined,
      isActive: params.isActive,
      kycVerified: params.kycVerified,
    })
  } catch (error) {
    apiError = handleApiError(error)
  }

  if (apiError) {
    return <DataError status={apiError.status} message={apiError.message} />
  }

  const users = data?.data ?? []
  const total = data?.total ?? 0

  return (
    <div className="p-6">
      <Card className="overflow-hidden py-0 gap-0">
        <CardHeader className="space-y-6 border-b px-6 py-6">
          <div>
            <CardTitle className="text-xl font-bold tracking-tight text-foreground">
              Users
            </CardTitle>
            <CardDescription className="mt-1.5 text-sm text-muted-foreground">
              Your platform user directory, roles, and access overview.
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
            <UsersListToolbar users={users} />
          </Suspense>
        </CardHeader>
        <CardContent className="border-b px-0">
          <UsersDataTable users={users} />
        </CardContent>
        <CardFooter className="flex flex-col border-t border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Suspense
            fallback={
              <p className="text-sm text-muted-foreground">
                Showing {total > 0 ? "…" : "0"} to {total > 0 ? "…" : "0"} of {total}
              </p>
            }
          >
            {data && (
              <UsersListPagination
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
