import style from "./page.module.scss";

export default function ShopMainPage() {
    return (
        <>
            <section className={style.flex_section}>
                <p>REFLAIR  COOKIES POLICY</p>

                <div className={style.flex_info}>

                    <div className={style.info}>
                        We may use cookies, tags, web pixels, and similar technologies to automatically collect information on our Services. Cookies or tags are bits of code that allow our technology partners to collect information that usually does not directly identify you. If required by law, we will request your consent before using cookies or other tracking technologies. Information within this section describes our use of cookies and your ability to control the use of cookies for advertising-related purposes.
                    </div>

                    <div className={style.info}>
                        Cookies . Cookies are small web files that a site or its provider transfers to your device’s hard drive through your web browser that enables the site’s or provider’s system to recognize your browser and remember certain information.
                    </div>

                    <div className={style.info}>
                        Generally, we use first-party and third-party cookies for the following purposes: to make our Services function properly; to provide a secure browsing experience during your use of our Services; to collect passive information about your use of our Services; to measure how you interact with our marketing campaigns; to help us improve our Services; and to remember your preferences for your convenience.

                    </div>
                </div>




            </section >

        </>
    );
}
