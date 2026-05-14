import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/shared/status-badge"
import { UserActions } from "@/components/users/user-actions"
import { UserDetailCardProps } from "@/interfaces/interface"
import { Calendar, IdCard, Mail, Phone, Shield } from "lucide-react"

export function UserDetailCard({ user }: UserDetailCardProps) {
  const joined = new Date(user.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  const docUrl = user.idDocumentUrl?.trim() ?? ""
  const hasIdDocument = docUrl.length > 0
  const docTypeLabel = user.idDocumentType?.trim()

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-0 lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-4 p-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight text-foreground lg:text-2xl">
              {user.firstName} {user.lastName}
            </h2>
          </div>

          <div
            role="group"
            className="flex flex-wrap gap-2"
            aria-label="User status summary"
          >
            <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Account
              </span>
              <StatusBadge
                status={user.isActive}
                label={user.isActive ? "Active" : "Inactive"}
              />
            </div>
            <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                KYC
              </span>
              <StatusBadge
                status={user.kycVerified ? "VERIFIED" : "UNVERIFIED"}
                label={user.kycVerified ? "Verified" : "Unverified"}
              />
            </div>
            <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Role
              </span>
              <StatusBadge status={user.systemRole} label={user.systemRole} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-4 text-sm text-muted-foreground">
            <span className="inline-flex min-w-0 items-center gap-2">
              <Mail className="size-4 shrink-0 opacity-70" aria-hidden />
              <span className="truncate">{user.email}</span>
            </span>
            <span className="inline-flex min-w-0 items-center gap-2">
              <Phone className="size-4 shrink-0 opacity-70" aria-hidden />
              <span className="truncate">{user.phone}</span>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Shield className="size-4 shrink-0 opacity-70" aria-hidden />
              {user.isDeleted ? "Deleted account" : "Account in good standing"}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="size-4 shrink-0 opacity-70" aria-hidden />
              <span className="whitespace-nowrap">Joined {joined}</span>
            </span>
          </div>
        </div>

        <aside
          aria-label="User actions and documents"
          className="flex w-full shrink-0 flex-col gap-4 border-t border-border bg-muted/25 p-6 lg:w-[21rem] lg:border-t-0 lg:border-l"
        >
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Identity
            </p>
            {hasIdDocument ? (
              <>
                <Button asChild variant="outline" size="sm" className="w-full px-2">
                  <a href={docUrl} target="_blank" rel="noopener noreferrer">
                    <IdCard className="size-3.5 shrink-0" aria-hidden />
                    <span className="truncate">View ID document</span>
                  </a>
                </Button>
                {docTypeLabel ? (
                  <p className="text-xs text-muted-foreground">
                    Type: <span className="font-medium">{docTypeLabel}</span>
                  </p>
                ) : null}
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full px-2"
                  disabled
                  title="No ID document on file"
                >
                  <IdCard className="size-3.5 shrink-0" aria-hidden />
                  <span className="truncate">View ID document</span>
                </Button>
                <p className="text-xs text-muted-foreground">
                  No ID document URL on file.
                  {docTypeLabel
                    ? (
                        <>
                          {" "}
                          Declared type:{" "}
                          <span className="font-medium">{docTypeLabel}</span>
                        </>
                      )
                    : null}
                </p>
              </>
            )}
          </div>

          <Separator className="bg-border" />

          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Admin
            </p>
            <UserActions user={user} triggerClassName="w-full" />
          </div>
        </aside>
      </div>
    </Card>
  )
}
