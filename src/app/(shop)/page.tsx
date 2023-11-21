import Image from "next/image";
import style from "./page.module.scss";
import Link from "next/link";

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
                    <Image
                        src="/assets/jackets/3.jpg"
                        alt="Sec2-Jacket3"
                        width={1920}
                        height={1080}
                    />

                    <Image
                        src="/assets/jackets/2.jpg"
                        alt="Sec2-Jacket2"
                        width={1920}
                        height={1080}
                    />

                    <Image
                        src="/assets/jackets/1.jpg"
                        alt="Sec2-Jacket1"
                        width={1920}
                        height={1080}
                    />

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
                        fashion.{" "}
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
                    <Link href="/product">
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
                                alt="girl clothes"
                                width={1920}
                                height={1080}
                            />
                            <h1 >title title title</h1>
                            <h2>Description. Description. Description. Description. Description. Description. Description. Description. Description. Description. Description. Description.</h2>
                        </div>

                        <div className={style.title5}>
                            <Image
                                src="/assets/images/home-sec5-1.png"
                                alt="girl clothes"
                                width={1920}
                                height={1080}
                            />
                            <h1>title title title</h1>
                            <h2>Description. Description. Description. Description. Description. Description. Description. Description. Description. Description. Description. Description.</h2>
                        </div>
                    </div>
                </div>

            </section>




        </>
    );
}
