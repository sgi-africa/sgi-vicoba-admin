"use client"

import * as React from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Shield, UserRound, Mail, Phone } from "lucide-react"
import type { AdminUser } from "@/interfaces/interface"
import { initials } from "@/utils/users/initials"
import { HeaderSort } from "./header-sort"
import { ActiveBadge } from "./active-badge"
import { KycBadge } from "./kyc-badge"


export function UsersDataTable({ users }: { users: AdminUser[] }) {
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const allIds = users.map((u) => u.id)
  const allSelected =
    users.length > 0 && selected.size === users.length
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

  if (users.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        No users found.
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
          <TableHead className="px-4">
            <HeaderSort>User</HeaderSort>
          </TableHead>
          <TableHead className="px-4">
            <HeaderSort>Email</HeaderSort>
          </TableHead>
          <TableHead className="px-4">Phone</TableHead>
          <TableHead className="px-4">Role</TableHead>
          <TableHead className="px-4">Status</TableHead>
          <TableHead className="px-4">KYC</TableHead>
          <TableHead className="px-4">
            <HeaderSort>Join date</HeaderSort>
          </TableHead>
          <TableHead className="w-12 pr-6 text-right" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} className="group">
            <TableCell className="py-3 pl-6">
              <Checkbox
                checked={selected.has(user.id)}
                onCheckedChange={(c) => toggleOne(user.id, !!c)}
                aria-label={`Select ${user.firstName} ${user.lastName}`}
              />
            </TableCell>
            <TableCell className="py-3 px-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-muted text-sm font-medium">
                    {initials(user)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold leading-tight text-foreground">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <UserRound className="size-3 shrink-0" />
                    {user.isDeleted ? "Deleted account" : "Member"}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="py-3 px-4">
              <span className="inline-flex items-center gap-1.5 text-sm">
                <Mail className="size-3.5 shrink-0 text-muted-foreground" />
                {user.email}
              </span>
            </TableCell>
            <TableCell className="py-3 px-4">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Phone className="size-3.5 shrink-0" />
                {user.phone}
              </span>
            </TableCell>
            <TableCell className="py-3 px-4">
              <div className="inline-flex items-center gap-1.5">
                {user.systemRole === "ADMIN" ? (
                  <Shield
                    className="size-4 shrink-0 text-violet-600"
                    aria-hidden
                  />
                ) : (
                  <UserRound
                    className="size-4 shrink-0 text-slate-500"
                    aria-hidden
                  />
                )}
                <span className="text-sm font-medium">
                  {user.systemRole}
                </span>
              </div>
            </TableCell>
            <TableCell className="py-3 px-4">
              <ActiveBadge active={user.isActive} />
            </TableCell>
            <TableCell className="py-3 px-4">
              <KycBadge kycVerified={user.kycVerified} />
            </TableCell>
            <TableCell className="whitespace-nowrap py-3 px-4 text-sm text-muted-foreground">
              {new Date(user.createdAt).toLocaleDateString(undefined, {
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
                    <Link href={`/home/users/${user.id}`}>View details</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      void navigator.clipboard.writeText(user.email)
                    }}
                  >
                    Copy email
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
