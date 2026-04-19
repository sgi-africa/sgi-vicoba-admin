"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

async function signOutWithToast() {
    try {
        await signOut({ callbackUrl: "/" });
        toast.success("Logged out successfully");
    } catch (error) {
        console.error("Sign-out failed:", error);
    }
}

export default function LogoutButton() {
    return (
        <Button
            variant="ghost"
            onClick={() => void signOutWithToast()}
            className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
            <LogOut className="size-4" />
            Logout
        </Button>
    );
}

export function LogoutMenuItem() {
    return (
        <DropdownMenuItem
            variant="destructive"
            onSelect={() => {
                void signOutWithToast();
            }}
        >
            <LogOut className="size-4" />
            Logout
        </DropdownMenuItem>
    );
}
