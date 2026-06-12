"use client";

import { useRouter } from "next/navigation";
import type { Product } from "@prisma/client";
import Image from "next/image";
import style from "./page.module.scss";
import AddCartButton from "@/app/(shop)/account/cart/AddCartButton";
import AddLikeButton from "../account/like/AddLikeButton";

interface ProductProps {
  product: Product;
  /** Eager-load above-the-fold cards (first grid row) for LCP */
  eager?: boolean;
}

const Product: React.FC<ProductProps> = ({ product, eager }) => {
  const router = useRouter();

  const onImageClick = (id: string) => {
    return () => {
      router.push(`/product/${id}`);
    };
  };

  return (
    <article className={style.product_card} key={product.id}>
      <div className={style.frame} onClick={onImageClick(product.id)}>
        <Image
          src={product.image}
          alt={product.name}
          width={760}
          height={950}
          sizes="(max-width: 480px) 100vw, (max-width: 820px) 50vw, (max-width: 1100px) 33vw, 25vw"
          loading={eager ? "eager" : undefined}
        />
        <span className={style.view_tag}>View piece</span>
      </div>
      <div className={style.product_description}>
        <h3>{product.name}</h3>
        <p>Size {product.size}</p>
        <h4>₱ {product.price}</h4>
      </div>
      <div className={style.product_action}>
        <AddCartButton item_id={product.id} >
          <button className={style.product_cart}>Add to bag</button>
        </AddCartButton>
        <AddLikeButton item_id={product.id}  >
          <button className={style.product_like}>Save</button>
        </AddLikeButton>
      </div>
    </article>
  );
};

export { Product };
