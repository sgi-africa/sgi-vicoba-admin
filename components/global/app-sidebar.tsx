"use client"

import { Home, UsersRound, Wallet, Bell, BanknoteArrowUp, Shield, UserRound } from "lucide-react"
import { SidebarContent, Sidebar, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"


const MENU_ITEMS = [
    { key: "Home", url: "/home", icon: Home },
    { key: "Users", url: "/home/users", icon: UserRound },
    { key: "Groups", url: "/home/groups", icon: UsersRound },
    { key: "Billings", url: "/home/billings", icon: Wallet },
    { key: "Contributions", url: "/home/contributions", icon: BanknoteArrowUp },
    { key: "Notifications", url: "/home/notifications", icon: Bell },
] as const


export default function AppSidebar() {

    const pathname = usePathname()
    return (
        <Sidebar>

            <SidebarHeader className="px-4 py-5">
                <Link href="/home" className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <Shield className="size-4" />
                    </div>
                    <span className="text-sm font-semibold text-sidebar-foreground tracking-tight">
                        SGI VICOBA ADMIN
                    </span>
                </Link>
            </SidebarHeader>

            <SidebarContent className="px-2">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-sidebar-foreground/50 text-[11px] font-medium uppercase tracking-wider px-3">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {MENU_ITEMS.map((item) => {
                                const isActive =
                                    item.url === "/home"
                                        ? pathname === "/home"
                                        : pathname.startsWith(item.url)
                                return (
                                    <SidebarMenuItem key={item.key}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            tooltip={item.key}
                                        >
                                            <Link href={item.url}>
                                                <item.icon className="size-4" />
                                                <span>{item.key}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}