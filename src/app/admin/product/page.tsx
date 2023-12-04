import prisma from "@/db/prisma";
import style from "./page.module.scss";
import ProductTable from "@/components/AdminComponent/ProductTable";

export default async function ProductDashboard() {
  const product = await prisma.product.findMany();

  return (
    <>
      <section className={style.section}>
        <ProductTable data={product} />
      </section>
    </>
  )
}
