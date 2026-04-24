export function formatIso(iso: string) {
    return new Date(iso).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    })
}

/** Like `formatIso`, but returns "—" when the value is missing or not a valid date. */
export function formatIsoSafe(iso: string | undefined | null) {
    if (iso == null || String(iso).trim() === "") return "—"
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return "—"
    return d.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    })
}