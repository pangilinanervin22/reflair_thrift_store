import ImageWrapper from "@/components/ImageWrapper";
import Sample from "@/components/SampleAuth";
import Image from "next/image";
import style from './page.module.scss';
import Link from "next/link";

export default function ShopMainPage() {
    return (
        <>
            <section className={style.first_flex}>
                <ImageWrapper styleName={style.container_first_image}>
                    <Image src={"/assets/images/intro_1.jpg"}
                        width={1920} height={1080} quality={100}
                        alt="main page pictures" />
                </ImageWrapper>
                <ImageWrapper styleName={style.container_first_image}>
                    <Image src={"/assets/images/intro_2.jpg"}
                        width={1920} height={1080} quality={100}
                        alt="main page pictures" />
                </ImageWrapper>
                <div className={style.first_description} >
                    <h1>Thrift in fashion</h1>
                    <Link href="/product">
                        <button >SHOP NOW</button>
                    </Link>
                </div>
            </section>
            {/* <h3>ShopMainPage</h3> */}
            <section className={style.third_flex}>
                <ImageWrapper styleName={style.container_third_image}>
                    <Image src="/assets/images/home_sec_girl.png" alt="girl clothes" width={1920} height={1080} />
                </ImageWrapper>
                <div className={style.container_third_description}>
                    <div className="">
                        <h1 >Awakening of last</h1>
                        <h1 >fashion for the </h1>
                        <h1 >future</h1>
                    </div>
                    <p >ReFlair presents collection of the past to showcase in current fashion. </p>
                    <div>
                        <Link href="/product">Discover more</Link>
                        <hr />
                    </div>
                </div>
            </section>




        </>
    )
}