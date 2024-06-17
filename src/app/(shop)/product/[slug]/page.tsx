import prisma from "@/db/prisma";
import Image from "next/image";
import style from "./page.module.scss";
import AddCartButton from "../../account/cart/AddCartButton";
import AddLikeButton from "../../account/like/AddLikeButton";
import { authOptions } from "@/db/options";
import { getServerSession } from "next-auth";
import dynamic from 'next/dynamic'
import wait from "@/utils/wait";
const SuggestionProduct = dynamic(() => import('./SuggestionProduct'), {
  loading: () => <p>Suggested Product is loading...</p>,
})


interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  return {
    title: "Product: " + params.slug,
    description: "Product: " + params.slug,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const product = await prisma.product.findFirst({
    where: {
      id: params.slug,
    },
  });

  await wait(10000);
  if (!product) return;

  return (
    <article className={style.product_wrapper}>
      <section className={style.product_container}>
        <section className={style.image_wrapper}>
          {/* Product Image */}
          <Image
            src={product.image}
            alt="Picture of the product"
            width={1920}
            height={1080}
          />
        </section>
        <section className={style.product_details}>
          {/* Product Details */}
          <h2>{product.name}</h2>
          <h3>size: {product.size}</h3>
          <h4>₱ {product.price}</h4>
          {/* Product actions */}
          <section className={style.action_container}>
            <AddCartButton email={session?.user.email} item_id={product.id} >
              <button className={style.cart_button}>ADD TO CART</button>
            </AddCartButton>
            <AddLikeButton email={session?.user.email} item_id={product.id} >
              <button className={style.like_button}>LIKE</button>
            </AddLikeButton>
          </section>
          <span>
            <strong>Details</strong>
          </span>
          <ul>
            <li>Color: {product.color}</li>
            <li>Material: {product.material}</li>
          </ul>
        </section>
      </section>
      <section className={style.suggestion}>
        <h3>You might also like</h3>
        <SuggestionProduct category={product.category} exclude={product.id} />
      </section>
    </article>
  );
}
