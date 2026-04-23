export function pageWindow(current: number, total: number, max = 5): number[] {
    if (total <= max) return Array.from({ length: total }, (_, i) => i + 1)
    const half = Math.floor(max / 2)
    let start = Math.max(1, current - half)
    let end = start + max - 1
    if (end > total) {
        end = total
        start = Math.max(1, end - max + 1)
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}