import type { ProductCategory } from "@/lib/constants";

export const CATEGORY_COPY: Record<ProductCategory, { title: string; unit: [string, string]; emptyNote: string }> = {
    men: { title: "Men's clothing", unit: ["piece", "pieces"], emptyNote: "New one-of-a-kind pieces are added weekly." },
    women: { title: "Women's clothing", unit: ["piece", "pieces"], emptyNote: "New one-of-a-kind pieces are added weekly." },
    shoes: { title: "Shoes collection", unit: ["pair", "pairs"], emptyNote: "New one-of-a-kind pairs are added weekly." },
};
