import prisma from "@/db/prisma";
import style from "./page.module.scss";
import { Product } from "./Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/db/options";
import SortPage from "./SortPage";
import { Prisma } from "@prisma/client";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ProductAllPage({ searchParams, }: PageProps) {
  const session = await getServerSession(authOptions);

  const orderBy = getOrderBy(searchParams.sort as string);
  const product = await prisma.product.findMany({
    where: {
      name: {
        contains: searchParams.search as string,
        mode: 'insensitive', // case-insensitive
      },
      category: searchParams.category as string, // filter by category
      material: searchParams.material as string, // filter by material
      color: searchParams.color as string,
    },
    orderBy,
  });

  console.log(searchParams);
  let ListOfProduct = structuredClone(product);

  return (
    <section className={style.product_section}>
      <h3>All Product</h3>
      <SortPage />
      <div className={style.product_container}>
        {ListOfProduct.map((product) => (
          <Product key={product.id} product={product} session={session} />
        ))}
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