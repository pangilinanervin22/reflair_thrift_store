import type { Metadata } from "next";
import CategoryPage from "../_components/CategoryPage";

// Fully static: cached indefinitely, regenerated ONLY when a mutation calls
// revalidateStorefront() — zero compute while the catalogue is unchanged.
export const revalidate = false;

export const metadata: Metadata = {
    title: "Shoes",
    description: "Pre-loved footwear in the ReFlair archive — from the early ’50s to the ’70s, one pair of each.",
    alternates: { canonical: "/product/shoes" },
};

export default function ProductShoesPage() {
    return <CategoryPage category="shoes" />;
}
