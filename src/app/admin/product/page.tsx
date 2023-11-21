import prisma from "@/db/prisma";
import style from "./page.module.scss";
import ProductTable from "@/components/admin/ProductTable";

export const revalidate = 2;

export default async function ProductDashboard() {
  const product = await prisma.product.findMany();
  console.log("hello");

  return (
    <>
      <section className={style.section}>
        <ProductTable data={product} />
      </section>
      {/* <SignOut /> */}
    </>
  )
}
