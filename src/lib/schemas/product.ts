import { z } from "zod";
import { PRODUCT_CATEGORIES } from "../constants";
import { isAllowedImageUrl } from "../uploadthingUrl";

// Shared by the admin product forms (instant feedback) and the product server
// actions (the check that actually counts). No server imports here.
export const ProductInputSchema = z.object({
    name: z.string().trim()
        .min(3, "Name must be at least 3 characters")
        .max(64, "Name must be at most 64 characters"),
    price: z.coerce.number({ error: "Price must be a number" })
        .positive("Price must be greater than 0")
        .max(100_000, "Price must be ₱100,000 or less"),
    image: z.string().refine(isAllowedImageUrl, "Image must be an UploadThing URL"),
    size: z.string().trim().min(1, "Size is required").max(20, "Size must be at most 20 characters"),
    category: z.enum(PRODUCT_CATEGORIES, { error: "Category must be men, women or shoes" }),
    color: z.string().trim().min(1, "Colour is required").max(30, "Colour must be at most 30 characters"),
    material: z.string().trim().min(1, "Material is required").max(30, "Material must be at most 30 characters"),
});

export type ProductInput = z.infer<typeof ProductInputSchema>;
