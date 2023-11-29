import prisma from "@/db/prisma";
import style from "./page.module.scss";
import Link from "next/link";
import { Product } from "./Product";


export default async function ProductDashboard() {
  const product = await prisma.product.findMany({
    orderBy: {
      color: "asc",
    },

  });

  console.log("hello render");
  return (
    <>
      <section className={style.product_section}>
        <br />
        <h3>All Product</h3>
        <br />
        <div className={style.product_container}>
          {product.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
