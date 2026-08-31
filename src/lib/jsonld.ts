import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./constants";

// schema.org payloads. Render them with <JsonLd data={…} /> (src/components/JsonLd.tsx).

export function organizationJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: SITE_URL + "/icon",
        description: SITE_DESCRIPTION,
        address: { "@type": "PostalAddress", addressLocality: "Bacoor", addressRegion: "Cavite", addressCountry: "PH" },
    };
}

export function websiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        potentialAction: {
            "@type": "SearchAction",
            target: { "@type": "EntryPoint", urlTemplate: SITE_URL + "/product?search={search_term_string}" },
            "query-input": "required name=search_term_string",
        },
    };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: SITE_URL + item.path,
        })),
    };
}

interface ProductForJsonLd {
    id: string;
    name: string;
    image: string;
    price: number;
    category: string;
    size: string;
    color: string;
    material: string;
}

export function productJsonLd(product: ProductForJsonLd, sold: boolean) {
    const url = SITE_URL + "/product/" + product.id;
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: [product.image],
        url,
        description: [product.category, "Size " + product.size, product.material, product.color].join(" · "),
        sku: product.id,
        category: product.category,
        color: product.color,
        material: product.material,
        size: product.size,
        itemCondition: "https://schema.org/UsedCondition",
        brand: { "@type": "Brand", name: SITE_NAME },
        offers: {
            "@type": "Offer",
            url,
            price: product.price,
            priceCurrency: "PHP",
            availability: sold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
            itemCondition: "https://schema.org/UsedCondition",
            seller: { "@type": "Organization", name: SITE_NAME },
        },
    };
}
