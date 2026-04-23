import { getBillings } from "./_actions"
import { BillingTable } from "@/components/billing/billing-table"
import { Pagination } from "@/components/shared/pagination"
import { SearchInput } from "@/components/shared/search-input"
import { DataError } from "@/components/shared/data-error"
import { handleApiError } from "@/lib/apiError"
import { Suspense } from "react"

interface BillingsPageProps {
  searchParams: Promise<{
    page?: string
    limit?: string
    q?: string
    status?: string
    groupId?: string
    billingMonthFrom?: string
    billingMonthTo?: string
  }>
}

export default async function BillingsPage({ searchParams }: BillingsPageProps) {
  const params = await searchParams
  const page = Number(params.page ?? 1)
  const limit = Number(params.limit ?? 20)

  let data
  let apiError

  try {
    data = await getBillings({
      page,
      limit,
      status: params.status as "PENDING" | "PAID" | "FAILED" | undefined,
      groupId: params.groupId,
      billingMonthFrom: params.billingMonthFrom,
      billingMonthTo: params.billingMonthTo,
    })
  } catch (error) {
    apiError = handleApiError(error)
  }

  if (apiError) {
    return <DataError status={apiError.status} message={apiError.message} />
  }

  const filterParams = {
    status: params.status,
    groupId: params.groupId,
    billingMonthFrom: params.billingMonthFrom,
    billingMonthTo: params.billingMonthTo,
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Billings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Track and manage group billing records.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <Suspense>
          <SearchInput placeholder="Search by group…" paramKey="groupId" />
        </Suspense>
      </div>

      <BillingTable billings={data?.data ?? []} />

      {data && (
        <Pagination
          total={data.total}
          page={page}
          limit={limit}
          baseUrl="/home/billings"
          searchParams={filterParams}
        />
      )}
    </div>
  )
}
