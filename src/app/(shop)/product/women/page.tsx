import type { Metadata } from "next";
import CategoryPage from "../_components/CategoryPage";

// Fully static: cached indefinitely, regenerated ONLY when a mutation calls
// revalidateStorefront() — zero compute while the catalogue is unchanged.
export const revalidate = false;

export const metadata: Metadata = {
    title: "Women's clothing",
    description: "Pre-loved womenswear in the ReFlair archive — slip dresses, tailoring and archive denim, one of each.",
    alternates: { canonical: "/product/women" },
};

export default function ProductWomenPage() {
    return <CategoryPage category="women" />;
}
