import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/admin/shared/status-badge"
import { Mail, Phone, Shield, Calendar } from "lucide-react"
import { UserDetailCardProps } from "@/interfaces/interface"


export function UserDetailCard({ user }: UserDetailCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          {user.firstName} {user.lastName}
        </CardTitle>
        <div className="flex flex-wrap gap-2 mt-1">
          <StatusBadge
            status={user.isActive}
            label={user.isActive ? "Active" : "Inactive"}
          />
          <StatusBadge
            status={user.kycVerified ? "VERIFIED" : "UNVERIFIED"}
            label={user.kycVerified ? "KYC Verified" : "KYC Unverified"}
          />
          <StatusBadge status={user.systemRole} label={user.systemRole} />
        </div>
      </CardHeader>
      <CardContent className="grid sm:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="size-4 shrink-0" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="size-4 shrink-0" />
          <span>{user.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Shield className="size-4 shrink-0" />
          <span>
            {user.isDeleted ? "Deleted account" : "Account in good standing"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="size-4 shrink-0" />
          <span>
            Joined {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
