import { getGroupById, getGroupMembers } from "../_actions"
import { GroupDetailCard } from "@/components/groups/group-detail-card"
import { GroupMembersTable } from "@/components/groups/group-members-table"
import { GroupActions } from "@/components/groups/group-actions"
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

  let group
  let membersData
  let apiError

  try {
    ;[group, membersData] = await Promise.all([
      getGroupById(groupId),
      getGroupMembers(groupId, { page, limit }),
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
      <GroupActions group={group} />

      <div>
        <h2 className="text-lg font-semibold mb-3">Members</h2>
        <GroupMembersTable members={membersData?.data ?? []} />
        {membersData && (
          <Pagination
            total={membersData.total}
            page={page}
            limit={limit}
            baseUrl={`/home/groups/${groupId}`}
          />
        )}
      </div>
    </div>
  )
}
