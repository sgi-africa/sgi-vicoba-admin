import Link from "next/link"

export default function Page() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-brand-dark text-white">
      {/* Cinematic background using brand tokens from `app/globals.css` */}
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

      {/* Starfield / texture */}
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

      <div className="relative flex min-h-svh items-center justify-center p-6">
        <div className="flex w-full max-w-3xl flex-col items-center text-center">
          <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-7xl md:text-8xl">
            SGI VICOBA ADMIN
          </h1>

          <div
            aria-hidden
            className="mt-4 h-px w-24 rounded-full bg-white/15 sm:w-28"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.06), 0 0 40px color-mix(in srgb, var(--brand-accent) 35%, transparent)",
            }}
          />

          <Link
            href="/auth/login"
            className="mt-10 inline-flex h-10 items-center justify-center rounded-full bg-white/10 px-6 text-sm font-medium text-white/90 shadow-sm ring-1 ring-white/15 backdrop-blur-md transition hover:bg-white/14 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            style={{
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.06) inset, 0 18px 50px rgba(0,0,0,0.45)",
            }}
          >
            Continue to login
          </Link>
        </div>
      </div>
    </main>
  )
}