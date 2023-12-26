import prisma from "@/db/prisma";
import style from "./page.module.scss";
import Link from "next/link";
import { Product } from "./Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/db/options";


export default async function ProductAllPage() {
  const session = await getServerSession(authOptions);
  const product = await prisma.product.findMany({
    orderBy: {
      color: "asc",
    },

  });

  return (
    <section className={style.product_section}>
      <br />
      <h3>All Product</h3>
      <br />
      <div className={style.product_container}>
        {product.map((product) => (
          <Product key={product.id} product={product} session={session} />
        ))}
      </div>
    </section>
  );
}
