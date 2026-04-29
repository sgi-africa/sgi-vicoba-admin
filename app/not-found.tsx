import Link from "next/link"
import { Home, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-brand-dark text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(1100px circle at 50% 30%, rgba(255,255,255,0.06), transparent 55%)",
            "radial-gradient(1200px circle at 50% 80%, rgba(0,0,0,0.65), transparent 60%)",
            "radial-gradient(900px circle at 50% 60%, color-mix(in srgb, var(--brand-accent) 22%, transparent), transparent 58%)",
            "linear-gradient(to bottom, rgba(255,255,255,0.06), transparent 40%)",
          ].join(", "),
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80 mix-blend-screen"
        style={{
          backgroundImage: [
            "radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.45) 0, transparent 55%)",
            "radial-gradient(1px 1px at 76% 22%, rgba(255,255,255,0.25) 0, transparent 55%)",
            "radial-gradient(1px 1px at 44% 58%, rgba(255,255,255,0.28) 0, transparent 55%)",
            "radial-gradient(1px 1px at 18% 76%, rgba(255,255,255,0.22) 0, transparent 55%)",
            "radial-gradient(1px 1px at 86% 72%, rgba(255,255,255,0.18) 0, transparent 55%)",
          ].join(", "),
          backgroundSize: "100% 100%",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 3px)",
        }}
      />

      <div className="relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="mb-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-white/90 transition hover:text-white"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-md">
              <Shield className="size-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              SGI ADMIN
            </span>
          </Link>
        </div>

        <div className="flex max-w-md flex-col items-center text-center">
          <p className="text-sm font-medium tracking-wide text-brand-accent">
            Error 404
          </p>
          <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Page not found
          </h1>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-white/70">
            The page you are looking for does not exist or may have been moved.
          </p>

          <div
            aria-hidden
            className="mt-6 h-px w-20 rounded-full bg-white/15"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.06), 0 0 40px color-mix(in srgb, var(--brand-accent) 35%, transparent)",
            }}
          />

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild className="min-w-[9rem] rounded-full shadow-lg">
              <Link href="/">
                <Home className="size-4" />
                Back to home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="min-w-[9rem] rounded-full border-white/20 bg-white/5 text-white shadow-sm backdrop-blur-md hover:bg-white/10 hover:text-white"
            >
              <Link href="/auth/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
