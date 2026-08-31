import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import style from "./page.module.scss";
import AddCartButton from "../../account/cart/AddCartButton";
import AddLikeButton from "../../account/like/AddLikeButton";
import SuggestionProduct from "./SuggestionProduct";
import JsonLd from "@/components/JsonLd";
import { formatPeso } from "@/utils/formatPrice";
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/constants";
import { getProductById } from "@/lib/queries/product";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/jsonld";

const CATEGORY_LABEL: Record<ProductCategory, string> = { men: "Men", women: "Women", shoes: "Shoes" };
const isCategory = (value: string): value is ProductCategory =>
  (PRODUCT_CATEGORIES as readonly string[]).includes(value);

// Only the three real rails have their own route; anything else goes to the archive filter
function categoryLink(category: string) {
  return isCategory(category)
    ? { href: "/product/" + category, label: CATEGORY_LABEL[category] }
    : { href: "/product?category=" + encodeURIComponent(category), label: category };
}

// Rendered on first visit, then cached indefinitely; regenerated ONLY when a
// mutation calls revalidateStorefront() — no recompute while data is unchanged.
export const revalidate = false;

// No build-time prerendering (empty params), but having this opts the route
// into static generation so each visited slug is cached and revalidated.
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return [];
}

function SuggestionSkeleton() {
  return (
    <div className={style.loading_suggestions_container}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className={style.card_loading}>
          <div className={style.loading_image}></div>
          <div className={style.loading_text}></div>
        </div>
      ))}
    </div>
  );
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductById(slug);
  if (!product) return { title: "Piece not found", robots: { index: false, follow: false } };

  const isSold = product.order !== null;
  const description = [
    product.category,
    "Size " + product.size,
    product.material,
    formatPeso(product.price),
    isSold ? "Sold" : "1 of 1",
  ].join(" · ");
  const url = "/product/" + product.id;

  return {
    title: product.name,
    description,
    alternates: { canonical: url },
    // Sold pieces stay reachable for shared links but shouldn't be indexed
    robots: { index: !isSold, follow: true },
    openGraph: {
      type: "website",
      url,
      title: product.name,
      description,
      images: [{ url: product.image, width: 1200, height: 1500, alt: product.name }],
    },
    twitter: { card: "summary_large_image", title: product.name, description, images: [product.image] },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductById(slug);
  if (!product) notFound();

  // A piece with an order is sold: keep the page reachable (shared links) but
  // don't offer it for sale.
  const isSold = product.order !== null;
  const category = categoryLink(product.category);

  return (
    <article className={style.product_wrapper}>
      <JsonLd
        data={[
          productJsonLd(product, isSold),
          breadcrumbJsonLd([
            { name: "The Archive", path: "/product" },
            { name: category.label, path: category.href },
            { name: product.name, path: "/product/" + product.id },
          ]),
        ]}
      />
      <nav className={style.breadcrumb} aria-label="Breadcrumb">
        <Link href="/product">The Archive</Link>
        <span aria-hidden="true">/</span>
        <Link href={category.href}>{category.label}</Link>
        <span aria-hidden="true">/</span>
        <span className={style.breadcrumb_current}>{product.name}</span>
      </nav>

      <section className={style.product_container}>
        <section className={style.image_wrapper}>
          {/* Product Image */}
          <Image
            src={product.image}
            alt={product.name}
            width={1200}
            height={1500}
            sizes="(max-width: 960px) 100vw, 55vw"
            priority
          />
          <span className={style.one_tag}>
            {isSold ? "Sold · Found a new home" : "1 of 1 · Archive piece"}
          </span>
        </section>

        <section className={style.product_details}>
          {/* Product Details */}
          <p className={style.eyebrow}>ReFlair Archive · {product.category}</p>
          <h1 className={style.name}>{product.name}</h1>
          <p className={style.price}>{formatPeso(product.price)}</p>

          {/* Product actions */}
          {isSold ? (
            <p className={style.sold_note}>
              <strong>Sold</strong>
              This piece has found a new home. Every ReFlair piece is sourced
              once and sold once — the pieces below are still in the archive.{" "}
              <Link href={category.href}>Browse similar pieces</Link>
            </p>
          ) : (
            <section className={style.action_container}>
              <AddCartButton item_id={product.id} className={style.cart_button}>Add to bag</AddCartButton>
              <AddLikeButton item_id={product.id} className={style.like_button}>Save to favourites</AddLikeButton>
            </section>
          )}

          <dl className={style.specs}>
            <div>
              <dt>Size</dt>
              <dd>{product.size}</dd>
            </div>
            <div>
              <dt>Colour</dt>
              <dd>{product.color}</dd>
            </div>
            <div>
              <dt>Material</dt>
              <dd>{product.material}</dd>
            </div>
            <div>
              <dt>Condition</dt>
              <dd>Curated pre-loved</dd>
            </div>
          </dl>

          <p className={style.note}>
            Every ReFlair piece is sourced once and sold once. When it finds a
            new home, it leaves the archive for good.
          </p>
        </section>
      </section>

      <section className={style.suggestion}>
        <header className={style.suggestion_head}>
          <p className={style.eyebrow}>Continue browsing</p>
          <h2>You might also like</h2>
        </header>
        <Suspense fallback={<SuggestionSkeleton />}>
          <SuggestionProduct category={product.category} exclude={product.id} />
        </Suspense>
      </section>
    </article>
  );
}
