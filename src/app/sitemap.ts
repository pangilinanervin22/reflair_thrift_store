import type { MetadataRoute } from "next";
import prisma from "@/db/prisma";
import { SITE_URL } from "@/lib/constants";

// Static routes plus every piece still in the archive. Regenerated hourly.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await prisma.product.findMany({
        where: { order: null },
        select: { id: true, createdAt: true },
        orderBy: { createdAt: "desc" },
    });
    const now = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: SITE_URL + "/", lastModified: now, changeFrequency: "weekly", priority: 1 },
        { url: SITE_URL + "/product", lastModified: now, changeFrequency: "daily", priority: 0.9 },
        { url: SITE_URL + "/product/women", lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: SITE_URL + "/product/men", lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: SITE_URL + "/product/shoes", lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: SITE_URL + "/privacy", lastModified: now, changeFrequency: "yearly", priority: 0.2 },
        { url: SITE_URL + "/terms", lastModified: now, changeFrequency: "yearly", priority: 0.2 },
        { url: SITE_URL + "/cookies", lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    ];

    const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
        url: SITE_URL + "/product/" + product.id,
        lastModified: product.createdAt,
        changeFrequency: "weekly",
        priority: 0.6,
    }));

    return [...staticRoutes, ...productRoutes];
}
