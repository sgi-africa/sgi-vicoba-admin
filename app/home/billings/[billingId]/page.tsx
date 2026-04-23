import { getBillingById } from "../_actions"
import { BillingDetailCard } from "@/components/billing/billing-detail-card"
import { BillingActions } from "@/components/billing/billing-actions"
import { DataError } from "@/components/shared/data-error"
import { handleApiError } from "@/lib/apiError"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface BillingDetailPageProps {
  params: Promise<{ billingId: string }>
}

export default async function BillingDetailPage({
  params,
}: BillingDetailPageProps) {
  const { billingId } = await params

  let billing
  let apiError

  try {
    billing = await getBillingById(billingId)
  } catch (error) {
    apiError = handleApiError(error)
  }

  if (apiError) {
    return (
      <DataError
        status={apiError.status}
        message={apiError.message}
        backHref="/home/billings"
      />
    )
  }

  if (!billing) return null

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/home/billings">
            <ArrowLeft className="size-4 mr-1" />
            Back
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Billing Detail</h1>
      </div>

      <BillingDetailCard billing={billing} />
      <BillingActions billing={billing} />
    </div>
  )
}
