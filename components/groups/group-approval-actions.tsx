"use client"

import * as React from "react"
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
import { Label } from "@/components/ui/label"
import { updateGroupApproval } from "@/app/home/groups/_actions"
import type { AdminGroup } from "@/interfaces/interface"
import { cn } from "@/lib/utils"
import { Ban, CircleCheck } from "lucide-react"

function normalizedApproval(raw: AdminGroup["approvalStatus"]): string {
  if (typeof raw !== "string" || !raw.trim()) return ""
  return raw.trim().toUpperCase()
}

export function GroupApprovalActions({ group }: { group: AdminGroup }) {
  const [isPending, startTransition] = React.useTransition()
  const [rejectOpen, setRejectOpen] = React.useState(false)
  const [rejectionReason, setRejectionReason] = React.useState("")

  const ap = normalizedApproval(group.approvalStatus)
  const isApproved = ap === "APPROVED"
  const isRejected = ap === "REJECTED"

  const resetRejectState = React.useCallback((open: boolean) => {
    setRejectOpen(open)
    if (!open) setRejectionReason("")
  }, [])

  const runApprove = () => {
    startTransition(async () => {
      const result = await updateGroupApproval(group.id, {
        approvalStatus: "APPROVED",
      })
      if (result.ok) {
        toast.success("Group approved.")
      } else {
        toast.error(result.error ?? "Failed to approve group.")
      }
    })
  }

  const runReject = () => {
    const reason = rejectionReason.trim()
    if (reason.length < 1) {
      toast.error("A rejection reason is required.")
      return
    }
    startTransition(async () => {
      const result = await updateGroupApproval(group.id, {
        approvalStatus: "REJECTED",
        rejectionReason: reason,
      })
      if (result.ok) {
        toast.success("Group disapproved.")
        resetRejectState(false)
      } else {
        toast.error(result.error ?? "Failed to disapprove group.")
      }
    })
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isPending || isApproved}
            className="w-full gap-2 border-primary/40 text-primary hover:bg-primary/5 disabled:opacity-50"
          >
            <CircleCheck className="size-3.5 shrink-0" aria-hidden />
            <span className="truncate">Approve</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve this group?</AlertDialogTitle>
            <AlertDialogDescription>
              This sets approval to approved for &quot;{group.name}&quot;. You can
              still change lifecycle separately (activate / deactivate).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={runApprove}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={rejectOpen} onOpenChange={resetRejectState}>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isPending || isRejected}
            className="w-full gap-2 border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
          >
            <Ban className="size-3.5 shrink-0" aria-hidden />
            <span className="truncate">Disapprove</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disapprove this group?</AlertDialogTitle>
            <AlertDialogDescription>
              The System requires a short reason when rejection is recorded.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-2">
            <Label htmlFor="reject-reason">Rejection reason</Label>
            <textarea
              id="reject-reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
              placeholder="Explain why this group is being rejected…"
              disabled={isPending}
              className={cn(
                "w-full resize-y rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground",
                "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
                "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                "dark:bg-input/30"
              )}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <Button
              type="button"
              variant="destructive"
              disabled={isPending}
              onClick={runReject}
            >
              Confirm disapproval
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
