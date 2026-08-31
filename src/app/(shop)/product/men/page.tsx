import type { Metadata } from "next";
import CategoryPage from "../_components/CategoryPage";

// Fully static: cached indefinitely, regenerated ONLY when a mutation calls
// revalidateStorefront() — zero compute while the catalogue is unchanged.
export const revalidate = false;

export const metadata: Metadata = {
    title: "Men's clothing",
    description: "Pre-loved menswear in the ReFlair archive — workwear, knits and vintage outerwear, one of each.",
    alternates: { canonical: "/product/men" },
};

export default function ProductMenPage() {
    return <CategoryPage category="men" />;
}
