import { describe, expect, it } from "vitest";
import { ORDER_STATUSES, ORDER_TRANSITIONS, canTransition, isTerminalStatus } from "./orderStatus";

describe("canTransition", () => {
    it("lets a customer cancel only a pending order", () => {
        expect(canTransition("pending", "cancelled", "customer")).toBe(true);
        for (const from of ORDER_STATUSES) {
            for (const to of ORDER_STATUSES) {
                if (from === "pending" && to === "cancelled") continue;
                expect(canTransition(from, to, "customer")).toBe(false);
            }
        }
    });

    it("follows the transition table for admins", () => {
        for (const from of ORDER_STATUSES) {
            for (const to of ORDER_STATUSES) {
                expect(canTransition(from, to, "admin")).toBe(ORDER_TRANSITIONS[from].includes(to));
            }
        }
    });

    it("never allows a self-transition or leaving a terminal state", () => {
        for (const status of ORDER_STATUSES) expect(canTransition(status, status, "admin")).toBe(false);
        expect(isTerminalStatus("received")).toBe(true);
        expect(isTerminalStatus("cancelled")).toBe(true);
        expect(isTerminalStatus("pending")).toBe(false);
        expect(canTransition("received", "pending", "admin")).toBe(false);
        expect(canTransition("cancelled", "processing", "admin")).toBe(false);
    });
});
