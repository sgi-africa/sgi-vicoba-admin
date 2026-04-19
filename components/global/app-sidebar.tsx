"use client"

import { Home, UsersRound, Wallet, HandCoins, ClipboardPenLine, BanknoteArrowUp, UserRoundMinus, Settings, Shield } from "lucide-react"
import { SidebarContent, Sidebar, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"


const MENU_ITEMS = [
    { key: "Home", url: "/home", icon: Home },
    { key: "Members", url: "/home/members", icon: UsersRound },
    { key: "Contributions", url: "/home/contributions", icon: Wallet },
    { key: "Loans", url: "/home/loans", icon: HandCoins },
    { key: "Meetings", url: "/home/meetings", icon: ClipboardPenLine },
    { key: "Shares", url: "/home/shares", icon: BanknoteArrowUp },
    { key: "Penalties", url: "/home/penalties", icon: UserRoundMinus },
    { key: "Disbursements", url: "/home/disbursements", icon: BanknoteArrowUp },
    { key: "Settings", url: "/home/settings", icon: Settings },
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
                                const isActive = pathname === item.url
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