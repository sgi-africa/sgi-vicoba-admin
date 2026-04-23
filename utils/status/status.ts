export function toPrettyStatus(raw: string) {
    const s = String(raw).trim()
    if (!s) return "—"
    if (s.length === 1) return s.toUpperCase()
    return s
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase())
}