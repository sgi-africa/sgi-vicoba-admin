import { HealthStatus } from "@/interfaces/interface"

export function toPrettyStatus(raw: string) {
    const s = String(raw).trim()
    if (!s) return "—"
    if (s.length === 1) return s.toUpperCase()
    return s
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase())
}

/** `HealthStatus` is `{ ok?: boolean; sub?: number }` — only `ok === true` counts as healthy. */
export function healthIsOk(h: HealthStatus): boolean {
    return h.ok === true
}

export function healthBadgeLabel(h: HealthStatus): string {
    const base = healthIsOk(h) ? "API Available" : "API down"
    return h.sub != null ? `${base} · ${h.sub}` : base
}