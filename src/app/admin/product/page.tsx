import prisma from "@/db/prisma";
import style from "./page.module.scss";
import ProductTable from "@/app/admin/product/ProductTable";

export default async function ProductDashboardPage() {
  const product = await prisma.product.findMany();

  return (
    <>
      <section className={style.section}>
        <ProductTable data={product} />
      </section>
    </>
  )
}
