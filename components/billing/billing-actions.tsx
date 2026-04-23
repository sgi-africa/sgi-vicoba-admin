"use client"

import { useTransition, useState } from "react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateBillingStatus } from "@/app/home/billings/_actions"
import type { Billing, PaymentStatus } from "@/interfaces/interface"

const STATUS_OPTIONS: PaymentStatus[] = ["PENDING", "PAID", "FAILED"]

interface BillingActionsProps {
  billing: Billing
}

export function BillingActions({ billing }: BillingActionsProps) {
  const [isPending, startTransition] = useTransition()
  const [selectedStatus, setSelectedStatus] = useState<PaymentStatus>(
    billing.status
  )
  const [open, setOpen] = useState(false)

  const handleUpdate = () => {
    startTransition(async () => {
      const paidAt =
        selectedStatus === "PAID" ? new Date().toISOString() : undefined
      const result = await updateBillingStatus(billing.id, {
        status: selectedStatus,
        paidAt,
      })
      if (result.ok) {
        toast.success("Billing status updated.")
        setOpen(false)
      } else {
        toast.error(result.error ?? "Failed to update billing status.")
      }
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={selectedStatus}
        onValueChange={(v) => setSelectedStatus(v as PaymentStatus)}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            disabled={isPending || selectedStatus === billing.status}
          >
            Update Status
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update billing status?</AlertDialogTitle>
            <AlertDialogDescription>
              Change status from <strong>{billing.status}</strong> to{" "}
              <strong>{selectedStatus}</strong>.{" "}
              {selectedStatus === "PAID" && "Paid-at timestamp will be set to now."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUpdate} disabled={isPending}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
