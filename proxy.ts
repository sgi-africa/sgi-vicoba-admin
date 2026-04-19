import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const { pathname } = req.nextUrl;

    // Redirect logged-in users away from auth pages
    if (pathname.startsWith("/auth") && isLoggedIn) {
        // Redirect to /home
        return NextResponse.redirect(new URL("/home", req.url));
    }

    // Protect /home routes
    if (pathname.startsWith("/home")) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/home/:path*", "/auth/:path*"],
};