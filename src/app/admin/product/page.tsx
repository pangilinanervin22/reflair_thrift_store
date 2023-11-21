import SignOut from "@/components/SignOut";
import prisma from "@/db/prisma";
import Image from "next/image";
import style from "./page.module.scss";

export const revalidate = 2;

export default async function ProductDashboard() {
  const product = await prisma.product.findMany();
  console.log(product, "hello");

  return (
    <>
      <section className={style.section}>
        <h3>All Product by nadela</h3>
        <div className={style.container_product}>
          {product.map((product) => (
            <div className={style.card_product} key={product.id}>
              <Image
                src={product.image}
                alt="Picture of the product"
                width={200}
                height={200}
              />
              <div>
                <h3>{product.name}</h3>
                <p>({product.price})</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <SignOut /> */}
    </>
  );
}
