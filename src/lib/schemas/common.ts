import { z } from "zod";

/** A MongoDB ObjectId as Prisma exposes it (24 hex characters). */
export const ObjectIdSchema = z.string().regex(/^[0-9a-f]{24}$/i, "Invalid id");

/** The first validation message, for a toast. */
export const firstIssue = (error: z.ZodError): string =>
    error.issues[0]?.message ?? "Invalid input";
