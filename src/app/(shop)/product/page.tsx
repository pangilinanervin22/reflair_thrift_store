import prisma from "@/db/prisma";
import style from "./page.module.scss";
import { Product } from "./Product";
import SortPage from "./SortProduct";
import { Prisma } from "@prisma/client";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProductAllPage({ searchParams, }: PageProps) {
  const params = await searchParams;

  const orderBy = getOrderBy(params.sort as string);
  const product = await prisma.product.findMany({
    where: {
      name: {
        contains: params.search as string,
        mode: 'insensitive', // case-insensitive
      },
      category: params.category as string, // filter by category
      material: params.material as string, // filter by material
      color: params.color as string,
    },
    orderBy,
  });

  const ListOfProduct = product;

  return (
    <section className={style.product_section}>
      <header className={style.page_head}>
        <p className={style.eyebrow}>The Archive</p>
        <h2>All pieces</h2>
        <p className={style.count}>
          {ListOfProduct.length} {ListOfProduct.length === 1 ? "piece" : "pieces"}
        </p>
      </header>
      <SortPage />
      <div className={style.product_container}>
        {ListOfProduct.length ? ListOfProduct.map((product, i) => (
          <Product key={product.id} product={product} eager={i < 4} />
        )) :
          <div className={style.no_item}>
            <p className={style.eyebrow}>Nothing found</p>
            <h2>The archive holds no such piece.</h2>
            <p>Try checking your spelling, or use more general terms.</p>
            <Link href={"/product"}>
              <button className={style.back_button}>
                Continue shopping
              </button>
            </Link>
          </div>}
      </div>
    </section>
  );
}


function getOrderBy(sortParam: string): Prisma.ProductOrderByWithRelationInput | undefined {
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
      return undefined;
  }
}
