import type { OrderStatus } from "@prisma/client";

// Type-only Prisma import: this module is shared with client components and
// must not pull the Prisma runtime into the browser bundle.

export const ORDER_STATUSES = [
    "pending",
    "processing",
    "shipped",
    "cancelled",
    "received",
] as const satisfies readonly OrderStatus[];

/** Allowed next statuses for an admin. `received` and `cancelled` are terminal. */
export const ORDER_TRANSITIONS: Record<OrderStatus, readonly OrderStatus[]> = {
    pending: ["processing", "cancelled"],
    processing: ["shipped", "cancelled"],
    shipped: ["received", "cancelled"],
    received: [],
    cancelled: [],
};

export const isTerminalStatus = (status: OrderStatus): boolean =>
    ORDER_TRANSITIONS[status].length === 0;

/**
 * Customers may only cancel an order that is still pending; admins follow the
 * transition table. Cancelling (by anyone) releases the order's pieces back to
 * the archive — see OrderAction.ts.
 */
export function canTransition(from: OrderStatus, to: OrderStatus, actor: "customer" | "admin"): boolean {
    if (actor === "customer") return from === "pending" && to === "cancelled";
    return ORDER_TRANSITIONS[from].includes(to);
}
