import { revalidatePath } from "next/cache";

// Refresh every cached storefront surface that lists products (home, the
// archive, category pages, detail pages). The customer pages are fully
// static (`revalidate = false`), so these on-demand calls are the ONLY
// thing that regenerates them — no compute is spent while data is unchanged.
//
// Call this from any server action that changes which products exist or
// are available: product create/update/delete, checkout (products leave
// the listings), order deletion (products are released back).
export function revalidateStorefront() {
    revalidatePath('/');
    revalidatePath('/product');
    revalidatePath('/product/men');
    revalidatePath('/product/women');
    revalidatePath('/product/shoes');
    revalidatePath('/product/[slug]', 'page');
}
