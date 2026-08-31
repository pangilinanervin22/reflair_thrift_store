// One formatter for every price on the site: ₱1,250 for whole pesos, ₱1,250.50 otherwise.
const whole = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});
const cents = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export function formatPeso(amount: number): string {
    return Number.isInteger(amount) ? whole.format(amount) : cents.format(amount);
}
