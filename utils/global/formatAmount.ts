export function formatCurrencyTZS(n: number) {
    return new Intl.NumberFormat("en-TZ", {
        style: "currency",
        currency: "TZS",
        maximumFractionDigits: 0,
    }).format(n)
}
