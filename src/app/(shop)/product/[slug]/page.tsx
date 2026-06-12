import { Suspense } from "react";
import prisma from "@/db/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import style from "./page.module.scss";
import AddCartButton from "../../account/cart/AddCartButton";
import AddLikeButton from "../../account/like/AddLikeButton";
import SuggestionProduct from "./SuggestionProduct";

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

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return {
    title: "Product: " + slug,
    description: "Product: " + slug,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await prisma.product.findFirst({
    where: {
      id: slug,
    },
  });

  if (!product) notFound();

  return (
    <article className={style.product_wrapper}>
      <nav className={style.breadcrumb} aria-label="Breadcrumb">
        <Link href="/product">The Archive</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/product/${product.category}`}>{product.category}</Link>
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
            priority
          />
          <span className={style.one_tag}>1 of 1 · Archive piece</span>
        </section>

        <section className={style.product_details}>
          {/* Product Details */}
          <p className={style.eyebrow}>ReFlair Archive · {product.category}</p>
          <h2 className={style.name}>{product.name}</h2>
          <p className={style.price}>₱ {product.price}</p>

          {/* Product actions */}
          <section className={style.action_container}>
            <AddCartButton item_id={product.id} >
              <button className={style.cart_button}>Add to bag</button>
            </AddCartButton>
            <AddLikeButton item_id={product.id} >
              <button className={style.like_button}>Save to favourites</button>
            </AddLikeButton>
          </section>

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
          <h3>You might also like</h3>
        </header>
        <Suspense fallback={<SuggestionSkeleton />}>
          <SuggestionProduct category={product.category} exclude={product.id} />
        </Suspense>
      </section>
    </article>
  );
}
