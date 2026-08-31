import { z } from "zod";

const name = z.string().trim()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must be at most 60 characters");

// Registration. The email is lower-cased here (new accounts only — existing
// accounts keep whatever casing they were created with, and login compares
// the address exactly as typed).
export const RegisterSchema = z.object({
    name,
    email: z.email("Enter a valid email address").max(254).transform((value) => value.toLowerCase()),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(72, "Password must be at most 72 characters"),
});
export type RegisterInput = z.input<typeof RegisterSchema>;

export const LoginSchema = z.object({
    email: z.email(),
    password: z.string().min(1),
});

// Delivery details a customer can edit. No email (identity is the session) and
// no city (delivery is Bacoor-only; the server sets it).
export const AccountUpdateSchema = z.object({
    name,
    contact: z.string().trim()
        .regex(/^(09\d{9}|\+639\d{9})$/, "Enter a PH mobile number, e.g. 09171234567"),
    barangay: z.string().trim().min(1, "Barangay is required").max(60),
    address: z.string().trim()
        .min(5, "Address must be at least 5 characters")
        .max(120, "Address must be at most 120 characters"),
});
export type AccountUpdateInput = z.infer<typeof AccountUpdateSchema>;
