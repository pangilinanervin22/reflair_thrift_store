// Every date is shown in Philippine time regardless of where the code runs
// (Vercel functions are UTC, browsers are wherever the visitor is), so the
// server and the client always render the same string.
const TIME_ZONE = "Asia/Manila";

const numeric = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE });
const long = new Intl.DateTimeFormat("en-PH", { day: "2-digit", month: "short", year: "numeric", timeZone: TIME_ZONE });
const longWithTime = new Intl.DateTimeFormat("en-PH", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "numeric", minute: "2-digit", hour12: true,
    timeZone: TIME_ZONE,
});

const toDate = (value: Date | string): Date => (value instanceof Date ? value : new Date(value));

/** 8/31/2026 — compact, for admin tables. */
export default function formatDate(value: Date | string): string {
    return numeric.format(toDate(value));
}

/** 31 Aug 2026 — customer-facing order dates. */
export function formatDateString(value: Date | string): string {
    return long.format(toDate(value));
}

/** 31 Aug 2026, 3:05 pm — admin order detail. */
export function formatDateTime(value: Date | string): string {
    return longWithTime.format(toDate(value));
}
