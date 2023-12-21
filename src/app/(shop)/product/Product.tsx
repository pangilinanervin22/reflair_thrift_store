"use client";

import { useRouter } from "next/navigation";
import type { Product } from "@prisma/client";
import Image from "next/image";
import style from "./page.module.scss";
import AddCartButton from "@/app/(shop)/account/cart/AddCartButton";
import AddLikeButton from "../account/like/AddLikeButton";

interface ProductProps {
  product: Product;
  session: any;
}

const Product: React.FC<ProductProps> = ({ product, session }) => {
  const router = useRouter();

  const onImageClick = (id: string) => {
    return () => {
      router.push(`/product/${id}`);
    };
  };

  return (
    <div className={style.product_card} key={product.id}>
      <Image
        src={product.image}
        alt="Picture of the product"
        width={1920}
        height={1080}
        onClick={onImageClick(product.id)}
      />
      <div className={style.product_description}>
        <h3>{product.name}</h3>
        <p>Size: {product.size}</p>
        <h4>{`₱ ${product.price}`}</h4>
      </div>
      <div className={style.product_action}>
        <section className={style.button_container}>
          <AddCartButton session={session} product={product} title="ADD TO CART"  >
            <button className={style.cart}>ADD TO CART</button>
          </AddCartButton>
          <AddLikeButton session={session} product={product} title="ADD TO CART"  >
            <button className={style.like}>LIKE</button>
          </AddLikeButton>
        </section>
      </div>
    </div>
  );
};

export { Product };
