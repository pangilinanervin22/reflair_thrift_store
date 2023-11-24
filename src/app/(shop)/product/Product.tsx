"use client";

import { useRouter } from "next/navigation";
import type { Product } from "@prisma/client";
import Image from "next/image";
import style from "./page.module.scss";

interface ProductProps {
  product: Product;
}

// extracted component to use events e.g. onClick


const Product: React.FC<ProductProps> = ({ product }) => {
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
        <p>{product.size}</p>
        <h4>{`₱ ${product.price}`}</h4>
      </div>
      <div className={style.product_action}>
        <button className={style.product_cart}>
          <p>ADD TO CART</p>
        </button>
        <button className={style.product_like}>
          <p>LIKE</p>
        </button>
      </div>
    </div>
  );
};

export { Product };