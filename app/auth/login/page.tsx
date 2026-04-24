import { LoginForm } from "@/components/auth/login-form"
import { Shield } from "lucide-react"
import Link from "next/link"

export default function Page() {
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

      <div className="relative flex min-h-svh items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="mb-6 flex justify-center">
            <Link href="/" className="flex items-center gap-2.5 text-white/90 transition hover:text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-md">
                <Shield className="size-4" />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                SGI ADMIN
              </span>
            </Link>
          </div>

          <LoginForm />
        </div>
      </div>
    </main>
  )
}