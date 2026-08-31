import { describe, expect, it } from "vitest";
import sortPath from "./sortPath";

const rows = [
    { name: "item 10", price: 300, date: new Date("2026-03-01"), barangay: "Molino" },
    { name: "Item 2", price: 100, date: new Date("2026-01-01"), barangay: null },
    { name: "item 1", price: 200, date: new Date("2026-02-01"), barangay: "Alima" },
];

describe("sortPath", () => {
    it("sorts strings case-insensitively with natural number order", () => {
        expect(sortPath(rows, "name", true).map((r) => r.name)).toEqual(["item 1", "Item 2", "item 10"]);
        expect(sortPath(rows, "name", false).map((r) => r.name)).toEqual(["item 10", "Item 2", "item 1"]);
    });

    it("sorts numbers and dates numerically in both directions", () => {
        expect(sortPath(rows, "price", true).map((r) => r.price)).toEqual([100, 200, 300]);
        expect(sortPath(rows, "price", false).map((r) => r.price)).toEqual([300, 200, 100]);
        expect(sortPath(rows, "date", true).map((r) => r.date.getMonth())).toEqual([0, 1, 2]);
        expect(sortPath(rows, "date", false).map((r) => r.date.getMonth())).toEqual([2, 1, 0]);
    });

    it("puts null values last whichever direction is requested", () => {
        expect(sortPath(rows, "barangay", true).map((r) => r.barangay)).toEqual(["Alima", "Molino", null]);
        expect(sortPath(rows, "barangay", false).map((r) => r.barangay)).toEqual(["Molino", "Alima", null]);
    });

    it("returns a copy and leaves the input untouched", () => {
        const input = [...rows];
        const sorted = sortPath(input, "price", true);
        expect(sorted).not.toBe(input);
        expect(input.map((r) => r.price)).toEqual([300, 100, 200]);
    });
});
