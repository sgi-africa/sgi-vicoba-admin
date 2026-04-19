"use client"

import { useSession } from "next-auth/react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ModeToggle } from "../ui/modeToggle"
import { LogoutMenuItem } from "../auth/logout"
import { getNameInitials } from "@/utils/global/getNameInitials"

export function HomeHeader() {
    const { data: session, status } = useSession()
    const displayName = session?.user?.name?.trim() || "Account"
    const initials = getNameInitials(session?.user?.name)
    const label = session?.user?.name ?? "User menu"

    return (
        <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-3 border-b border-border/60 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 px-4 md:px-6 lg:px-8">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-5" />
            <h1 className="text-sm font-medium text-foreground truncate hidden sm:block">
                SGI VICOBA ADMIN
            </h1>
            <div className="ml-auto flex items-center gap-3">
                {status === "loading" ? (
                    <Skeleton className="size-8 shrink-0 rounded-full" aria-hidden />
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className="rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                aria-label={label}
                            >
                                <Avatar
                                    size="default"
                                    className="ring-1 ring-border/60"
                                >
                                    <AvatarFallback className="bg-primary/15 text-xs font-medium text-primary">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-medium leading-none text-foreground">
                                        {displayName}
                                    </p>
                                    {session?.user?.email ? (
                                        <p className="truncate text-xs leading-none text-muted-foreground">
                                            {session.user.email}
                                        </p>
                                    ) : null}
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <LogoutMenuItem />
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
                <ModeToggle />
            </div>
        </header>
    )
}
