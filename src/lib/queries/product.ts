import { cache } from "react";
import prisma from "@/db/prisma";
import { ObjectIdSchema } from "@/lib/schemas/common";

// Shared by the product page and its generateMetadata — React.cache dedupes the
// two calls into one query per request. Sold-ness comes from the relation
// (many products have order_id unset rather than null; see CLAUDE.md).
export const getProductById = cache(async (id: string) => {
    if (!ObjectIdSchema.safeParse(id).success) return null;
    return prisma.product.findUnique({
        where: { id },
        include: { order: { select: { id: true } } },
    });
});
