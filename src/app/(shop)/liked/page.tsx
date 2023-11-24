import style from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function ShopMainPage() {
    return (
        <>
            <section className={style.flex_section}>
                <h1>Total Liked: </h1>

                <div className={style.product_container}>
                    <div className={style.ImageWrapper}>
                        <Image
                            src="/"
                            width={400}
                            height={400}
                            quality={100}
                            alt="liked pic"
                        />


                        <section className={style.description}>
                            <h3>Name</h3>
                            <h1>Size: </h1>
                            <h1>₱ </h1>
                        </section>



                        <section className={style.button}>
                            <button className={style.cart}>ADD TO CART</button>
                            <button className={style.remove}>REMOVE</button>
                        </section>
                    </div>



                </div>
                <Link href="/admin/product/create">
                    <button>Add Product</button>
                </Link>

            </section>


        </>
    );
}
