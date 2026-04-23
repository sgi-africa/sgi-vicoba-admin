import { getUserById } from "../_actions"
import { UserDetailCard } from "@/components/users/user-detail-card"
import { UserActions } from "@/components/users/user-actions"
import { DataError } from "@/components/admin/shared/data-error"
import { handleApiError } from "@/lib/apiError"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { UserDetailPageProps } from "@/interfaces/interface"


export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { userId } = await params

  let user
  let apiError

  try {
    user = await getUserById(userId)
  } catch (error) {
    apiError = handleApiError(error)
  }

  if (apiError) {
    return (
      <DataError
        status={apiError.status}
        message={apiError.message}
        backHref="/home/users"
      />
    )
  }

  if (!user) return null

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/home/users">
            <ArrowLeft className="size-4 mr-1" />
            Back
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">User Detail</h1>
      </div>

      <UserDetailCard user={user} />
      <UserActions user={user} />
    </div>
  )
}
