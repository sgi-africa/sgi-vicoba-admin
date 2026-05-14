"use client"

import { useTransition } from "react"
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { updateUserStatus, updateUserKyc } from "@/app/home/users/_actions"
import { UserActionsProps } from "@/interfaces/interface"
import { cn } from "@/lib/utils"


export function UserActions({ user, triggerClassName }: UserActionsProps) {
  const [isPending, startTransition] = useTransition()

  const handleStatusToggle = () => {
    startTransition(async () => {
      const result = await updateUserStatus(user.id, !user.isActive)
      if (result.ok) {
        toast.success(
          user.isActive ? "User deactivated." : "User activated."
        )
      } else {
        toast.error(result.error ?? "Failed to update status.")
      }
    })
  }

  const handleKycToggle = () => {
    startTransition(async () => {
      const result = await updateUserKyc(user.id, !user.kycVerified)
      if (result.ok) {
        toast.success(
          user.kycVerified ? "KYC revoked." : "KYC verified."
        )
      } else {
        toast.error(result.error ?? "Failed to update KYC.")
      }
    })
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={user.isActive ? "destructive" : "default"}
            size="sm"
            disabled={isPending}
            className={cn(triggerClassName)}
          >
            {user.isActive ? "Deactivate" : "Activate"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {user.isActive ? "Deactivate" : "Activate"} user?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will {user.isActive ? "disable" : "enable"} access for{" "}
              {user.firstName} {user.lastName}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleStatusToggle}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm" disabled={isPending} className={cn(triggerClassName)}>
            {user.kycVerified ? "Revoke KYC" : "Verify KYC"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {user.kycVerified ? "Revoke" : "Approve"} KYC?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will {user.kycVerified ? "revoke" : "approve"} KYC verification
              for {user.firstName} {user.lastName}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleKycToggle}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
