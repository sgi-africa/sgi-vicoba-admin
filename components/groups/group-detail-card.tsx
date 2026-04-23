import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/shared/status-badge"
import { GroupDetailCardProps } from "@/interfaces/interface"
import { Calendar, Users } from "lucide-react"


export function GroupDetailCard({ group }: GroupDetailCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{group.name}</CardTitle>
        {group.description && (
          <p className="text-sm text-muted-foreground">{group.description}</p>
        )}
        <div className="flex flex-wrap gap-2 mt-1">
          <StatusBadge
            status={group.isActive}
            label={group.isActive ? "Active" : "Inactive"}
          />
          <StatusBadge status={group.billingStatus} label={group.billingStatus} />
        </div>
      </CardHeader>
      <CardContent className="grid sm:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="size-4 shrink-0" />
          <span>{group.memberCount ?? 0} members</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="size-4 shrink-0" />
          <span>Created {new Date(group.createdAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}
