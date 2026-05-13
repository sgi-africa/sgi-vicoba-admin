import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/shared/status-badge"
import { GroupDetailCardProps } from "@/interfaces/interface"
import { GroupActions } from "@/components/groups/group-actions"
import {
  Ban,
  BookMarked,
  Calendar,
  CircleCheck,
  ClipboardSignature,
  Users,
} from "lucide-react"

export function GroupDetailCard({ group }: GroupDetailCardProps) {
  const formattedCreated = new Date(group.createdAt).toLocaleDateString(
    undefined,
    { year: "numeric", month: "short", day: "numeric" }
  )

  const memberLabel = `${group.memberCount ?? 0} member${
    (group.memberCount ?? 0) === 1 ? "" : "s"
  }`

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-0 lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-4 p-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight text-foreground lg:text-2xl">
              {group.name}
            </h2>
            {group.description ? (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {group.description}
              </p>
            ) : null}
          </div>

          <div
            role="group"
            className="flex flex-wrap gap-2"
            aria-label="Status summary"
          >
            <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Group
              </span>
              <StatusBadge
                status={group.isActive}
                label={group.isActive ? "Active" : "Inactive"}
              />
            </div>
            <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Billing
              </span>
              <StatusBadge status={group.billingStatus} prettyLabel />
            </div>
            {group.approvalStatus ? (
              <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Approval
                </span>
                <StatusBadge status={group.approvalStatus} prettyLabel />
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Users className="size-4 shrink-0 opacity-70" aria-hidden />
              {memberLabel}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="size-4 shrink-0 opacity-70" aria-hidden />
              <span className="whitespace-nowrap">Created {formattedCreated}</span>
            </span>
          </div>
        </div>

        <aside
          aria-label="Group actions"
          className="flex w-full shrink-0 flex-col gap-4 border-t border-border bg-muted/25 p-6 lg:w-[21rem] lg:border-t-0 lg:border-l"
        >
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Documents
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button type="button" variant="outline" size="sm" className="w-full px-2">
                <BookMarked className="size-3.5 shrink-0" aria-hidden />
                <span className="truncate">Constitution</span>
              </Button>
              <Button type="button" variant="outline" size="sm" className="w-full px-2">
                <ClipboardSignature className="size-3.5 shrink-0" aria-hidden />
                <span className="truncate">Registration</span>
              </Button>
            </div>
          </div>

          <Separator className="bg-border" />

          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Review
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full gap-2 border-primary/40 text-primary hover:bg-primary/5"
              >
                <CircleCheck className="size-3.5 shrink-0" aria-hidden />
                <span className="truncate">Approve</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full gap-2 border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Ban className="size-3.5 shrink-0" aria-hidden />
                <span className="truncate">Disapprove</span>
              </Button>
            </div>
          </div>

          <Separator className="bg-border" />

          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Lifecycle
            </p>
            <GroupActions group={group} triggerClassName="w-full" />
          </div>
        </aside>
      </div>
    </Card>
  )
}
