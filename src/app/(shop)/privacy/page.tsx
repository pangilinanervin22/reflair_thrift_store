import style from "./page.module.scss";
import Link from "next/link";

export default function ShopMainPage() {
    return (
        <>
            <section className={style.flex_section}>
                <p>REFLAIR PRIVACY POLICY</p>


                <h1>
                    Introduction and Overview </h1>

                <div className={style.info_container}>
                    <div className={style.info}>
                        {`This Privacy Policy ( "Policy" ) explains how your personal information is collected, used, shared and processed when accessing this website or using other services provided by its operator, including any written or electronic communications and purchases performed (collectively, the "Services" ) as well as the rights and choices you have associated with that information.`}
                    </div>

                    <div className={style.info}>
                        {`The Services include any services provided via this website, located at ReFlair website, our accounts and fan pages on social media platforms (the "Social Media Accounts" ), and any other websites, pages, features, or content owned and operated by the Company that hyperlink to this Policy.`}
                    </div>

                    <div className={style.info}>
                        The company selling the products via the Site and Apps and providing the Services (and therefore, the payment collection entity) is Fashion Choice Pte. Ltd., 22 Sin Ming Lane, #06-76, Midview City, Philippines
                    </div>

                    <div className={style.info}>
                        Please read our <Link href="">Terms and Conditions</Link>  and this Policy before accessing or using our Services. If you cannot agree with this Policy or the Terms and Conditions, please do not access or use our Services. By using our Services, you accept the Terms and Conditions and Privacy Policy on the site you are using.
                    </div>

                    <div className={style.info}>
                        Right to modify this Policy: We may change this Policy from time to time, to reflect how we are processing your data, and if we make changes, we will notify you by revising the effective date or last modified date at the top of this Policy. If we make significant changes that materially affect your privacy rights, we will provide advanced notice and make that clear on the ReFlair website or other ReFlair services, or by some other means of contact such as email, so that you are able to review the changes before you continue to use the Services. If you do not agree with the modified Policy, please discontinue use of the Services immediately.

                    </div>

                    <div className={style.info}>
                        Instant information: In addition, we may provide you with real time disclosures or additional information about the personal information handling practices of specific parts of our Services. Such notices may supplement this Policy or provide you with additional choices about how we process your personal information.
                    </div>

                </div>





            </section >

        </>
    );
}
