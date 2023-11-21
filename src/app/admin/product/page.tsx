import prisma from "@/db/prisma";
import style from "./page.module.scss";

export const revalidate = 2;

export default async function ProductDashboard() {
  const product = await prisma.product.findMany()
  console.log("hello");

  return (
    <>
      <section className={style.section}>

      </section>


      {/* <SignOut /> */}

    </>
  )
}
