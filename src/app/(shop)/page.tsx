import ImageWrapper from "@/components/ImageWrapper";
import Sample from "@/components/Sample";
import Image from "next/image";
import style from './page.module.scss';

export default function ShopMainPage() {
    return (
        <>
            <h3>ShopMainPage</h3>
            <Sample />
            <ImageWrapper styleName={style.container}>
                <Image src={"/assets/jackets/1.jpg"}
                    width={1080} height={1080} quality={100}
                    alt="wew" />
            </ImageWrapper>
            <ImageWrapper styleName={style.container}>
                <Image src={"/assets/images/home-sec3.png"}
                    width={1920} height={1920}
                    alt="wew" />
            </ImageWrapper>
            {/* <Image
                className={style.images}
                src={"/assets/jackets/1.jpg"}
                alt="Picture of the author"
                sizes="100vw"
                style={{
                    width: '100%',
                    height: 'auto',
                }}
            /> */}

            < img src={"/assets/jackets/1.jpg"} alt="wew" className={style.images} />


        </>
    )
}