import { z } from "zod";

// Snapshot of an order's pieces, stored in Order.items (Json). Kept because
// cancelling an order releases its products (the relation empties) and a
// product can be deleted later — the order history must still read.
const OrderItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    image: z.string().optional(),
    size: z.string().optional(),
});
const OrderItemsSchema = z.array(OrderItemSchema);

export type OrderItemSnapshot = z.infer<typeof OrderItemSchema>;

/** Builds the snapshot written at checkout. */
export function snapshotItems(products: { id: string; name: string; price: number; image: string; size: string }[]): OrderItemSnapshot[] {
    return products.map(({ id, name, price, image, size }) => ({ id, name, price, image, size }));
}

/** Reads Order.items defensively — older orders have none. */
export function parseOrderItems(value: unknown): OrderItemSnapshot[] {
    const parsed = OrderItemsSchema.safeParse(value);
    return parsed.success ? parsed.data : [];
}
