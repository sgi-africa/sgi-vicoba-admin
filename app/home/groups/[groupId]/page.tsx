import { Suspense } from "react"
import { getGroupById, getGroupMembers } from "../_actions"
import { GroupDetailCard } from "@/components/groups/group-detail-card"
import { GroupMembersTable } from "@/components/groups/group-members-table"
import { GroupMembersToolbar } from "@/components/groups/group-members-toolbar"
import { DataError } from "@/components/shared/data-error"
import { Pagination } from "@/components/shared/pagination"
import { handleApiError } from "@/lib/apiError"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { GroupDetailPageProps } from "@/interfaces/interface"


export default async function GroupDetailPage({
  params,
  searchParams,
}: GroupDetailPageProps) {
  const { groupId } = await params
  const sp = await searchParams
  const page = Number(sp.page ?? 1)
  const limit = Number(sp.limit ?? 20)
  const q = sp.q
  const kycVerified = sp.kycVerified

  let group
  let membersData
  let apiError

  try {
    ;[group, membersData] = await Promise.all([
      getGroupById(groupId),
      getGroupMembers(groupId, { page, limit, q, kycVerified }),
    ])
  } catch (error) {
    apiError = handleApiError(error)
  }

  if (apiError) {
    return (
      <DataError
        status={apiError.status}
        message={apiError.message}
        backHref="/home/groups"
      />
    )
  }

  if (!group) return null

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/home/groups">
            <ArrowLeft className="size-4 mr-1" />
            Back
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Group Detail</h1>
      </div>

      <GroupDetailCard group={group} />

      <div className="space-y-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold">Members</h2>
          <Suspense
            fallback={
              <div
                className="h-10 w-full max-w-3xl rounded-lg bg-muted/30 animate-pulse sm:max-w-md"
                aria-hidden
              />
            }
          >
            <GroupMembersToolbar
              groupId={groupId}
              members={membersData?.data ?? []}
            />
          </Suspense>
        </div>
        <GroupMembersTable members={membersData?.data ?? []} />
        {membersData && (
          <Pagination
            total={membersData.total}
            page={page}
            limit={limit}
            baseUrl={`/home/groups/${groupId}`}
            searchParams={{
              ...(q && { q }),
              ...(kycVerified && { kycVerified }),
            }}
          />
        )}
      </div>
    </div>
  )
}
