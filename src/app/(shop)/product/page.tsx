import prisma from "@/db/prisma";
import style from "./page.module.scss";
import { Product } from "./Product";
import SortProduct from "./SortProduct";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const PAGE_SIZE = 24;

// A repeated query param (?search=a&search=b) arrives as an array — take the first.
const first = (value: string | string[] | undefined): string | undefined =>
  (Array.isArray(value) ? value[0] : value) || undefined;

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const search = first(params.search)?.trim();
  const filtered = ["search", "sort", "category", "material", "color", "page"].some((key) => first(params[key]));
  return {
    title: search ? "Search: " + search : "All pieces",
    description: "Every piece currently in the ReFlair archive — one of each, sourced once and sold once.",
    alternates: { canonical: "/product" },
    // Filtered and paged views are variations of one page; keep the index on the canonical
    robots: filtered ? { index: false, follow: true } : undefined,
  };
}

export default async function ProductAllPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = first(params.search)?.trim();
  const sort = first(params.sort);
  const category = first(params.category);
  const material = first(params.material);
  const color = first(params.color);
  const page = Math.max(1, parseInt(first(params.page) ?? "1", 10) || 1);

  const contains = (value: string): Prisma.StringFilter => ({ contains: value, mode: "insensitive" });
  const where: Prisma.ProductWhereInput = {
    order: null, // sold pieces leave the archive
    ...(category ? { category } : {}),
    ...(material ? { material } : {}),
    ...(color ? { color } : {}),
    ...(search ? { OR: [{ name: contains(search) }, { material: contains(search) }, { color: contains(search) }] } : {}),
  };

  const [total, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: getOrderBy(sort),
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // Pager links keep every other filter and only change `page`
  const pageHref = (target: number) => {
    const next = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      const single = first(value);
      if (single && key !== "page") next.set(key, single);
    }
    if (target > 1) next.set("page", String(target));
    const query = next.toString();
    return query ? "/product?" + query : "/product";
  };

  return (
    <section className={style.product_section}>
      <header className={style.page_head}>
        <p className={style.eyebrow}>The Archive</p>
        <h1>All pieces</h1>
        <p className={style.count}>
          {total} {total === 1 ? "piece" : "pieces"}
        </p>
      </header>
      <Suspense fallback={null}>
        <SortProduct />
      </Suspense>
      <div className={style.product_container}>
        {products.length ? products.map((product, i) => (
          <Product key={product.id} product={product} eager={i < 4} priority={i < 2} />
        )) :
          <div className={style.no_item}>
            <p className={style.eyebrow}>Nothing found</p>
            <h2>The archive holds no such piece.</h2>
            <p>Try checking your spelling, or use more general terms.</p>
            <Link href="/product" className={style.back_button}>Continue shopping</Link>
          </div>}
      </div>
      {totalPages > 1 && (
        <nav className={style.pager} aria-label="Pagination">
          {page > 1
            ? <Link href={pageHref(page - 1)} className={style.pager_link}>← Previous</Link>
            : <span className={style.pager_link} aria-disabled="true">← Previous</span>}
          <span className={style.pager_info}>Page {page} of {totalPages}</span>
          {page < totalPages
            ? <Link href={pageHref(page + 1)} className={style.pager_link}>Next →</Link>
            : <span className={style.pager_link} aria-disabled="true">Next →</span>}
        </nav>
      )}
    </section>
  );
}

function getOrderBy(sortParam: string | undefined): Prisma.ProductOrderByWithRelationInput {
  switch (sortParam) {
    case 'price_asc':
      return { price: 'asc' };
    case 'price_desc':
      return { price: 'desc' };
    case 'name_asc':
      return { name: 'asc' };
    case 'name_desc':
      return { name: 'desc' };
    default:
      // "Featured" = newest first. Paging needs a stable order.
      return { createdAt: 'desc' };
  }
}
