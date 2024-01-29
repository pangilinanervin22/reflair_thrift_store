import Image from "next/image";
import style from "./page.module.scss";
import Link from "next/link";
import ThreeProductImage from "@/components/ServerComponents/ThreeProductImage";

export default function ShopMainPage() {
    return (
        <>
            <section className={style.first_flex}>
                <div className={style.container_first_image}>
                    <Image
                        src={"/assets/images/intro_1.jpg"}
                        width={1920}
                        height={1080}
                        quality={100}
                        alt="main page pictures"
                    />
                </div>
                <div className={style.container_first_image}>
                    <Image
                        src={"/assets/images/intro_2.jpg"}
                        width={1920}
                        height={1080}
                        quality={100}
                        alt="main page pictures"
                    />
                </div>
                <div className={style.first_description}>
                    <h1>Thrift in fashion</h1>
                    <Link href="/product">
                        <button>SHOP NOW</button>
                    </Link>
                </div>
            </section>

            <section className={style.second_flex}>
                <div className={style.container_second_description}>
                    <h1> <Link href="">Discover the campaign</Link></h1>
                </div>
                <div className={style.container_second_image}>
                    <ThreeProductImage />
                </div>
            </section>

            {/* <h3>ShopMainPage</h3> */}
            <section className={style.third_flex}>
                <div className={style.container_third_image}>
                    <Image
                        src="/assets/images/home_sec_girl.png"
                        alt="girl clothes"
                        width={1920}
                        height={1080}
                    />
                </div>
                <div className={style.container_third_description}>
                    <div className="">
                        <h1>Awakening of last</h1>
                        <h1>fashion for the </h1>
                        <h1>future</h1>
                    </div>
                    <p>
                        ReFlair presents collection of the past to showcase in current
                        fashion.
                    </p>
                    <div>
                        <Link href="/product">Discover more</Link>
                        <hr />
                    </div>
                </div>
            </section>

            <section className={style.fourth_flex}>
                <div className={style.container_fourth_image}>
                    <Image
                        src="/assets/images/home-sec4.png"
                        alt="girl clothes"
                        width={1920}
                        height={1080}
                    />
                </div>
                <div className={style.container_fourth_description}>
                    <h1>Shoes collection</h1>
                    <Link href="/product/shoes">
                        <button>SHOP NOW</button>
                    </Link>
                </div>
            </section>

            <section className={style.fifth_flex}>
                <div className={style.fifth_flex_row}>
                    <div className={style.sec5_column1}>
                        <div className={style.title1}>
                            <Image
                                src="/assets/images/home-sec5-1.png"
                                alt="Sec5-img1"
                                width={1920}
                                height={1080}
                            />
                            <h1 >About fashion</h1>
                            <h2>Those real-life gestures chimed with the season’s biggest look: pared-back, everyday clothes, executed in best-in-class fabrics.</h2>
                        </div>

                        <div className={style.title5}>
                            <Image
                                src="/assets/images/home-sec5-5.png"
                                alt="girl clothes"
                                width={1920}
                                height={1080}
                            />
                            <h1>Vintage Fashion</h1>
                            <h2>Those real-life gestures chimed with the season’s biggest look: pared-back, everyday clothes, executed in best-in-class fabrics.  </h2>
                        </div>
                    </div>

                    <div className={style.sec5_column2}>
                        <div className={style.title2}>
                            <Image
                                src="/assets/images/home-sec5-2.png"
                                alt="sec5-img2"
                                width={1920}
                                height={1080}
                            />
                            <h1>Men fashion</h1>
                            <h2>{"If you're looking for unique items of clothing, sometimes buying new isn't always the way forward and vintage menswear shops are the way forward."}</h2>
                        </div>

                        <div className={style.title4}>
                            <Image
                                src="/assets/images/home-sec5-4.png"
                                alt="sec5-img4"
                                width={1920}
                                height={1080}
                            />
                            <h1>Rare Finds</h1>
                            <h2>{"The shoe range’s earliest side features a selection of footwear from designers including Herbert Levine and Halston, ranging from the early ’50s to the ’70s."}</h2>
                        </div>

                        <div className={style.title6}>
                            <Image
                                src="/assets/images/home-sec5-6.png"
                                alt="sec5-img6"
                                width={1920}
                                height={1080}
                            />
                            <h1>Fashion Show</h1>
                            <h2>During the fashion show, recycled and second hand clothing items from ReFlair Thrift will be modeled.</h2>
                        </div>
                    </div>

                    <div className={style.sec5_column3}>
                        <div className={style.title3}>
                            <Image
                                src="/assets/images/home-sec5-3.png"
                                alt="sec5-img3"
                                width={1920}
                                height={1080}
                            />
                            <h1>Forgotten</h1>
                            <h2>{"Slip dresses, bomber jackets, scrunchies and plaid flannel shirts were all the rage during the '90s — and many of these fashion trends are working their way back into vogue. "}</h2>
                        </div>

                        <div className={style.title7}>
                            <Image
                                src="/assets/images/home-sec5-7.png"
                                alt="sec5-img3"
                                width={1920}
                                height={1080}
                            />
                            <h1>ReFlair Thrift</h1>
                            <h2>{"It’s not just an old trailer, though — it’s a 1970s Empire that Wilson renovated into a cozy retro boutique. And they’re not just any vintage goods: each piece is carefully curated by ReFlair. "}</h2>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
