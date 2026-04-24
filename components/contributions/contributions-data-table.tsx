"use client"

import * as React from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Building2, MoreHorizontal, UserRound } from "lucide-react"
import { StatusBadge } from "@/components/shared/status-badge"
import type { Contribution } from "@/interfaces/interface"
import { formatCurrencyTZS } from "@/utils/global/formatAmount"
import { memberInitials } from "@/utils/contributions/memberInitials"


export function ContributionsDataTable({
  contributions,
}: {
  contributions: Contribution[]
}) {
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const allIds = contributions.map((c) => c.id)
  const allSelected =
    contributions.length > 0 && selected.size === contributions.length
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

  if (contributions.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        No records found.
      </p>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b bg-muted/30 hover:bg-transparent">
          <TableHead className="h-12 w-10 pl-6">
            <Checkbox
              checked={
                allSelected ? true : someSelected ? "indeterminate" : false
              }
              onCheckedChange={(c) => toggleAll(!!c)}
              aria-label="Select all on this page"
            />
          </TableHead>
          <TableHead className="px-4">Member</TableHead>
          <TableHead className="px-4">Group</TableHead>
          <TableHead className="px-4">Type</TableHead>
          <TableHead className="px-4 text-right">Amount</TableHead>
          <TableHead className="px-4">Date</TableHead>
          <TableHead className="w-12 pr-6 text-right" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {contributions.map((c) => (
          <TableRow key={c.id} className="group">
            <TableCell className="py-3 pl-6">
              <Checkbox
                checked={selected.has(c.id)}
                onCheckedChange={(v) => toggleOne(c.id, !!v)}
                aria-label={`Select row ${c.id}`}
              />
            </TableCell>
            <TableCell className="min-w-0 py-3 px-4">
              <div className="flex max-w-xs items-center gap-3 sm:max-w-md">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-muted text-sm font-medium">
                    {memberInitials(c)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-semibold leading-tight text-foreground truncate">
                    {c.user
                      ? `${c.user.firstName} ${c.user.lastName}`.trim()
                      : c.userId}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <UserRound className="size-3 shrink-0" />
                    {c.userId}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="min-w-0 py-3 px-4">
              <div className="min-w-0 max-w-xs sm:max-w-md">
                <p className="font-medium leading-tight text-foreground truncate">
                  {c.group?.name ?? c.groupId}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Building2 className="size-3 shrink-0" />
                  {c.groupId}
                </p>
              </div>
            </TableCell>
            <TableCell className="py-3 px-4">
              <StatusBadge
                status={c.type === "savings" ? "SAVINGS" : c.type === "jamii" ? "JAMII" : "LOAN_REPAYMENT"}
                label={
                  c.type === "savings" ? "Savings" : c.type === "jamii" ? "Jamii" : "Loan repayment"
                }
              />
            </TableCell>
            <TableCell className="py-3 px-4 text-right font-medium tabular-nums">
              {formatCurrencyTZS(c.amount)}
            </TableCell>
            <TableCell className="whitespace-nowrap py-3 px-4 text-sm text-muted-foreground">
              {new Date(c.createdAt).toLocaleDateString(undefined, {
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
                    <Link href={`/home/users/${c.userId}`}>
                      View member
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/home/groups/${c.groupId}`}>
                      View group
                    </Link>
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
