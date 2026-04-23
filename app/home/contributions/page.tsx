import { getContributions } from "./_actions"
import { ContributionsTable } from "@/components/contributions/contributions-table"
import { TypeToggle } from "@/components/contributions/type-toggle"
import { Pagination } from "@/components/shared/pagination"
import { DataError } from "@/components/shared/data-error"
import { handleApiError } from "@/lib/apiError"
import { Suspense } from "react"
import type { ContributionType } from "@/interfaces/interface"

interface ContributionsPageProps {
  searchParams: Promise<{
    page?: string
    limit?: string
    type?: string
    groupId?: string
    userId?: string
    from?: string
    to?: string
  }>
}

export default async function ContributionsPage({
  searchParams,
}: ContributionsPageProps) {
  const params = await searchParams
  const page = Number(params.page ?? 1)
  const limit = Number(params.limit ?? 20)
  const type = (params.type as ContributionType) ?? "contribution"

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
    })
  } catch (error) {
    apiError = handleApiError(error)
  }

  if (apiError) {
    return <DataError status={apiError.status} message={apiError.message} />
  }

  const filterParams = {
    type,
    groupId: params.groupId,
    userId: params.userId,
    from: params.from,
    to: params.to,
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Contributions</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Browse member contributions and loan repayments.
        </p>
      </div>

      <Suspense>
        <TypeToggle currentType={type} />
      </Suspense>

      <ContributionsTable contributions={data?.data ?? []} />

      {data && (
        <Pagination
          total={data.total}
          page={page}
          limit={limit}
          baseUrl="/home/contributions"
          searchParams={filterParams}
        />
      )}
    </div>
  )
}
