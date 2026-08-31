import { z } from "zod";
import { ORDER_STATUSES } from "../orderStatus";

export const OrderStatusSchema = z.enum(ORDER_STATUSES);

export const CANCEL_REASONS = [
    "Address not verified",
    "Product not available",
    "Customer request",
    "Other",
] as const;

// Admin order update. `ship_date` arrives as YYYY-MM-DD from an <input type="date">.
export const OrderAdminUpdateSchema = z
    .object({
        status: OrderStatusSchema,
        ship_date: z.iso.date("Enter a valid date").optional(),
        cancel_reason: z.string().trim().max(120, "Keep the reason under 120 characters").optional(),
    })
    .refine((value) => value.status !== "shipped" || Boolean(value.ship_date), {
        message: "A ship date is required when marking an order as shipped",
        path: ["ship_date"],
    });

export type OrderAdminUpdateInput = z.input<typeof OrderAdminUpdateSchema>;
