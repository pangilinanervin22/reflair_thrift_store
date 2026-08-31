import type { Product as ProductModel } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import style from "./page.module.scss";
import AddCartButton from "@/app/(shop)/account/cart/AddCartButton";
import AddLikeButton from "../account/like/AddLikeButton";
import { formatPeso } from "@/utils/formatPrice";

interface ProductProps {
  product: ProductModel;
  /** Eager-load above-the-fold cards (first grid row) for LCP */
  eager?: boolean;
  /** Preload the very first tiles — the likely LCP element */
  priority?: boolean;
}

// Server component: the tile is a real link (crawlable, keyboard-reachable,
// middle-clickable); only the two action buttons are client islands.
export function Product({ product, eager, priority }: ProductProps) {
  return (
    <article className={style.product_card}>
      <Link href={"/product/" + product.id} className={style.frame}>
        <Image
          src={product.image}
          alt={product.name}
          width={760}
          height={950}
          sizes="(max-width: 480px) 100vw, (max-width: 820px) 50vw, (max-width: 1100px) 33vw, 25vw"
          priority={priority}
          loading={!priority && eager ? "eager" : undefined}
        />
        <span className={style.view_tag}>View piece</span>
      </Link>
      <div className={style.product_description}>
        <h3>{product.name}</h3>
        <p>Size {product.size}</p>
        <p className={style.price}>{formatPeso(product.price)}</p>
      </div>
      <div className={style.product_action}>
        <AddCartButton item_id={product.id} className={style.product_cart}>Add to bag</AddCartButton>
        <AddLikeButton item_id={product.id} className={style.product_like}>Save</AddLikeButton>
      </div>
    </article>
  );
}
