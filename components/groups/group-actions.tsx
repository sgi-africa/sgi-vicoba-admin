"use client"

import { useTransition } from "react"
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { updateGroupStatus } from "@/app/home/groups/_actions"
import { GroupActionsProps } from "@/interfaces/interface"


export function GroupActions({ group }: GroupActionsProps) {
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    startTransition(async () => {
      const result = await updateGroupStatus(group.id, !group.isActive)
      if (result.ok) {
        toast.success(
          group.isActive ? "Group deactivated." : "Group activated."
        )
      } else {
        toast.error(result.error ?? "Failed to update group status.")
      }
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={group.isActive ? "destructive" : "default"}
          size="sm"
          disabled={isPending}
        >
          {group.isActive ? "Deactivate Group" : "Activate Group"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {group.isActive ? "Deactivate" : "Activate"} group?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will {group.isActive ? "disable" : "enable"} the group &quot;
            {group.name}&quot;.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleToggle}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
