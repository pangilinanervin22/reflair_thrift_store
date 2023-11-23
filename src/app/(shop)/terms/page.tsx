import style from "./page.module.scss";

export default function ShopMainPage() {
    return (
        <>
            <section className={style.flex_section}>
                <p>REFLAIR  TERMS AND CONDITION</p>


                <div className={style.container1}>
                    <h1>
                        1. GENERAL
                    </h1>

                    <div className={style.flex_info}>
                        <div className={style.info}>
                            1.1 Scope. Welcome to ReFlair. This Terms & Conditions is a contract between you and Fashion Choice Pte. Ltd., registered address at 22 Sin Ming Lane, #06-76, Midview City, Philippines ( "Company" , "we" , "us" or "our" ), governing your use of our website at ReFlair (the "Site" which includes local versions of the Site that are operated by the Company), that hyperlink to this Agreement, any other written, electronic, and oral communications with the Company and its affiliated entities, or any websites, pages, features, or content owned, licensed to or operated by us or our affiliated entities that hyperlink to this Agreement (collectively, including the Site and Apps, the "Services" ).
                        </div>

                        <div className={style.info}>
                            By accessing or using the Services in any manner, including, but not limited to, visiting or browsing the Site, downloading the mobile applications, registering an account, or contributing content or other materials to the Site or on or via the Apps, you expressly understand, acknowledge and agree that you have read and understood the Terms and agree to be bound by such terms found on the Site.
                        </div>

                        <div className={style.info}>
                            You are only authorized to use the Services if you agree to abide by all applicable laws and to these Terms. If you reside in one territory but order products to be shipped to another territory, you may be redirected to the local Site of the territory, which may be an Other ReFlair Site, to which products are shipped. You will be subject to the Terms of that local Site.
                        </div>
                    </div>
                </div>

                <div className={style.container2}>
                    <h1>
                        2. USE OF OUR SERVICES
                    </h1>

                    <div className={style.flex_info}>
                        <div className={style.info}>
                            2.1 Representations. When you use our Services, you agree to the processing of the information and details and you state that all information and details provided are true and correspond to reality. You represent and warrant that you are at least 16 years old or visiting the Services under the supervision of a parent or guardian. Subject to the terms and conditions of this Agreement, the Company hereby grants you a limited, revocable, non-transferable and non-exclusive license to access and use the Services by displaying it on your internet browser, for our Site, or on your mobile devices, for our Apps, only for the purpose of shopping for personal items sold on the Site or Apps and not for any commercial use or use on behalf of any third party, except as explicitly permitted by the Company in advance. Any breach of this Agreement shall result in the immediate revocation of the license granted in this paragraph without notice to you.
                        </div>

                        <div className={style.info}>
                            2.2 Limitations on Use. Except as permitted in the paragraph above, you may not reproduce, distribute, display, sell, lease, transmit, create derivative works from, translate, modify, reverse-engineer, disassemble, decompile or otherwise exploit the Services or any portion of them unless expressly permitted by the Company in writing. You may not make any commercial use of any of the information provided on the Services or make any use of the Services for the benefit of another business unless explicitly permitted by the Company in advance. The Company reserves the right to refuse service, terminate accounts, and/or cancel orders in its discretion, including, without limitation, if we believe that customer conduct violates applicable law or is harmful to our interests.
                        </div>

                        <div className={style.info}>
                            You shall not upload to, distribute, or otherwise publish through the Services any content, information, or other material that: (a) violates or infringes the copyrights, patents, trademarks, service marks, trade secrets, or other proprietary rights of any person; (b) is libelous, threatening, defamatory, obscene, indecent, pornographic, or could give rise to any civil or criminal liability under local or international law; or (c) includes any bugs, logic bombs, viruses, worms, trap doors, Trojan horses or other code, material or properties which are malicious or technologically harmful.
                        </div>
                    </div>
                </div>


            </section >

        </>
    );
}
