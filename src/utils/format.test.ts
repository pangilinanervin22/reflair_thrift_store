import { describe, expect, it } from "vitest";
import { formatPeso } from "./formatPrice";
import formatDate, { formatDateString, formatDateTime } from "./formatDate";

describe("formatPeso", () => {
    it("formats whole pesos without decimals and fractions with two", () => {
        expect(formatPeso(1250)).toBe("₱1,250");
        expect(formatPeso(1250.5)).toBe("₱1,250.50");
        expect(formatPeso(0)).toBe("₱0");
    });
});

describe("date helpers", () => {
    // 20:00 UTC on 31 Aug is already 1 Sep in Manila (UTC+8)
    const lateAugustUtc = new Date("2026-08-31T20:00:00Z");

    it("renders in Philippine time regardless of the host zone", () => {
        expect(formatDate(lateAugustUtc)).toBe("9/1/2026");
        expect(formatDateString(lateAugustUtc)).toBe("Sep 01, 2026");
        expect(formatDateTime(lateAugustUtc)).toBe("Sep 01, 2026, 4:00 AM");
    });

    it("accepts ISO strings as well as Date objects", () => {
        expect(formatDate("2026-08-31T20:00:00Z")).toBe("9/1/2026");
    });
});
