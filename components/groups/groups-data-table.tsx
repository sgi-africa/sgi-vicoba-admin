"use client"

import * as React from "react"
import Link from "next/link"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Building2, UsersRound } from "lucide-react"
import type { AdminGroup } from "@/interfaces/interface"
import { groupInitials } from "@/utils/groups/groupInitials"
import { ActiveBadge } from "@/components/users/active-badge"
import { BillingStatusBadge } from "./billing-status-badge"

export function GroupsDataTable({ groups }: { groups: AdminGroup[] }) {
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const allIds = groups.map((g) => g.id)
  const allSelected = groups.length > 0 && selected.size === groups.length
  const someSelected = selected.size > 0 && !allSelected

  const toggleAll = (checked: boolean) => {
    if (checked) {
      setSelected(new Set(allIds))
    } else {
      setSelected(new Set())
    }
  }

  const toggleOne = (id: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }

  if (groups.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        No groups found.
      </p>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-b bg-muted/30">
          <TableHead className="h-12 w-10 pl-6">
            <Checkbox
              checked={
                allSelected ? true : someSelected ? "indeterminate" : false
              }
              onCheckedChange={(c) => toggleAll(!!c)}
              aria-label="Select all on this page"
            />
          </TableHead>
          <TableHead className="px-4">Group</TableHead>
          <TableHead className="px-4">Billing</TableHead>
          <TableHead className="px-4">Status</TableHead>
          <TableHead className="px-4">Members</TableHead>
          <TableHead className="px-4">Created</TableHead>
          <TableHead className="w-12 pr-6 text-right" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {groups.map((group) => (
          <TableRow key={group.id} className="group">
            <TableCell className="py-3 pl-6">
              <Checkbox
                checked={selected.has(group.id)}
                onCheckedChange={(c) => toggleOne(group.id, !!c)}
                aria-label={`Select ${group.name}`}
              />
            </TableCell>
            <TableCell className="py-3 px-4">
              <div className="flex min-w-0 max-w-xs items-center gap-3 sm:max-w-md">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-muted text-sm font-medium">
                    {groupInitials(group)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-semibold leading-tight text-foreground truncate">
                    {group.name}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Building2 className="size-3 shrink-0" />
                    {group.isDeleted
                      ? "Deleted group"
                      : group.description
                        ? (group.description.length > 48
                            ? `${group.description.slice(0, 48)}…`
                            : group.description)
                        : "VICOBA group"}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="py-3 px-4">
              <BillingStatusBadge status={group.billingStatus} />
            </TableCell>
            <TableCell className="py-3 px-4">
              <ActiveBadge active={group.isActive} />
            </TableCell>
            <TableCell className="py-3 px-4">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <UsersRound className="size-3.5 shrink-0" />
                {group.memberCount ?? "—"}
              </span>
            </TableCell>
            <TableCell className="whitespace-nowrap py-3 px-4 text-sm text-muted-foreground">
              {new Date(group.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </TableCell>
            <TableCell className="py-3 pr-6 text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-muted-foreground"
                    aria-label="Row actions"
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/home/groups/${group.id}`}>
                      View details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      void navigator.clipboard.writeText(group.name)
                    }}
                  >
                    Copy name
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
