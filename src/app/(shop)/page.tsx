import { Suspense } from "react";
import Image from "next/image";
import style from "./page.module.scss";
import Link from "next/link";
import ThreeProductImage from "@/components/ServerComponents/ThreeProductImage";
import CampaignSkeleton from "@/components/ServerComponents/CampaignSkeleton";

// Fully static: cached indefinitely, regenerated ONLY when a mutation calls
// revalidateStorefront() — zero compute while the catalogue is unchanged.
export const revalidate = false;

const collections = [
    {
        index: "01",
        name: "Women",
        href: "/product/women",
        note: "Slip dresses, tailoring, archive denim",
        image: "/assets/images/home-sec5-1.webp",
    },
    {
        index: "02",
        name: "Men",
        href: "/product/men",
        note: "Workwear, knits, vintage outerwear",
        image: "/assets/images/home-sec5-2.webp",
    },
    {
        index: "03",
        name: "Shoes",
        href: "/product/shoes",
        note: "Herbert Levine to Halston, ’50s–’70s",
        image: "/assets/images/home-sec4.webp",
    },
];

const journal = [
    {
        title: "About fashion",
        copy: "Real-life gestures chimed with the season’s biggest look: pared-back, everyday clothes, executed in best-in-class fabrics.",
        image: "/assets/images/home-sec5-1.webp",
        tall: true,
    },
    {
        title: "Men’s fashion",
        copy: "If you're looking for unique items of clothing, buying new isn't always the way forward — vintage menswear is.",
        image: "/assets/images/home-sec5-2.webp",
        tall: false,
    },
    {
        title: "Forgotten",
        copy: "Slip dresses, bomber jackets, scrunchies and plaid flannel — the ’90s are working their way back into vogue.",
        image: "/assets/images/home-sec5-3.webp",
        tall: true,
    },
    {
        title: "Rare finds",
        copy: "The earliest side of the shoe range features designers including Herbert Levine and Halston, from the early ’50s to the ’70s.",
        image: "/assets/images/home-sec5-4.webp",
        tall: false,
    },
    {
        title: "Vintage fashion",
        copy: "Pared-back, everyday clothes — each piece carefully curated, worn well and ready to be loved again.",
        image: "/assets/images/home-sec5-5.webp",
        tall: true,
    },
    {
        title: "ReFlair Thrift",
        copy: "It’s not just an old trailer — it’s a renovated 1970s Empire turned cozy retro boutique. Every piece curated by ReFlair.",
        image: "/assets/images/home-sec5-7.webp",
        tall: false,
    },
];

export default function ShopMainPage() {
    return (
        <>
            {/* ── Hero ─────────────────────────────── */}
            <section className={style.hero}>
                <div className={style.hero_images}>
                    <div className={style.hero_image}>
                        <Image
                            src="/assets/images/intro_1.webp"
                            fill
                            sizes="50vw"
                            priority
                            alt="Archive editorial — look one"
                        />
                    </div>
                    <div className={style.hero_image}>
                        <Image
                            src="/assets/images/intro_2.webp"
                            fill
                            sizes="50vw"
                            priority
                            alt="Archive editorial — look two"
                        />
                    </div>
                </div>

                <div className={style.hero_overlay}>
                    <p className={style.hero_eyebrow}>Curated second-hand · Est. 2022</p>
                    <h1 className={style.hero_title}>
                        Unearth the hidden<br />
                        <em>flair</em> of timeless fashion
                    </h1>
                    <Link href="/product" className={style.hero_cta}>
                        Shop the collection
                    </Link>
                </div>

                <span className={style.hero_scroll} aria-hidden="true">Scroll</span>
            </section>

            {/* ── Marquee ──────────────────────────── */}
            <div className={style.marquee} aria-hidden="true">
                <div className={style.marquee_track}>
                    {[0, 1].map((i) => (
                        <span key={i}>
                            One-of-a-kind pieces&ensp;·&ensp;Curated weekly&ensp;·&ensp;Women — Men — Shoes&ensp;·&ensp;Sustainable luxury&ensp;·&ensp;Worn well, loved again&ensp;·&ensp;
                        </span>
                    ))}
                </div>
            </div>

            {/* ── The Edit ─────────────────────────── */}
            <section className={style.edit}>
                <header className={style.section_head}>
                    <p className={style.section_label}>01 — The Edit</p>
                    <h2>This week’s campaign</h2>
                    <Link href="/product" className={style.section_link}>
                        Discover the campaign
                    </Link>
                </header>
                <Suspense fallback={<CampaignSkeleton />}>
                    <ThreeProductImage />
                </Suspense>
            </section>

            {/* ── Manifesto ────────────────────────── */}
            <section className={style.manifesto}>
                <div className={style.manifesto_text}>
                    <p className={style.section_label}>02 — Manifesto</p>
                    <h2 className={style.manifesto_title}>
                        Awakening of lost fashion, <em>for the future.</em>
                    </h2>
                    <p className={style.manifesto_copy}>
                        ReFlair presents collections of the past to showcase in current
                        fashion. Every garment is sourced once, restored with care, and
                        offered exactly one time — pared-back, everyday clothes in
                        best-in-class fabrics.
                    </p>
                    <Link href="/product" className={style.section_link}>
                        Discover more
                    </Link>
                </div>
                <div className={style.manifesto_image}>
                    <Image
                        src="/assets/images/home_sec_girl.webp"
                        alt="Editorial portrait in archive clothing"
                        width={960}
                        height={1280}
                        sizes="(max-width: 960px) 100vw, 45vw"
                    />
                </div>
            </section>

            {/* ── Collections index ────────────────── */}
            <section className={style.collections}>
                <header className={style.section_head}>
                    <p className={style.section_label}>03 — Collections</p>
                    <h2>Browse the archive</h2>
                </header>
                <div className={style.collection_rows}>
                    {collections.map((c) => (
                        <Link href={c.href} key={c.index} className={style.collection_row}>
                            <span className={style.collection_index}>{c.index}</span>
                            <span className={style.collection_name}>{c.name}</span>
                            <span className={style.collection_note}>{c.note}</span>
                            <span className={style.collection_arrow} aria-hidden="true">⟶</span>
                            <span className={style.collection_image}>
                                <Image src={c.image} alt="" width={480} height={600} sizes="220px" />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ── Shoe archive banner ──────────────── */}
            <section className={style.banner}>
                <div className={style.banner_image}>
                    <Image
                        src="/assets/images/home-sec4.webp"
                        alt="The shoe archive"
                        width={1280}
                        height={860}
                        sizes="(max-width: 960px) 100vw, 50vw"
                    />
                </div>
                <div className={style.banner_text}>
                    <p className={style.section_label_light}>The Shoe Archive</p>
                    <h2>Footwear from the early ’50s to the ’70s</h2>
                    <Link href="/product/shoes" className={style.banner_cta}>
                        Shop shoes
                    </Link>
                </div>
            </section>

            {/* ── Journal ──────────────────────────── */}
            <section className={style.journal}>
                <header className={style.section_head}>
                    <p className={style.section_label}>04 — Journal</p>
                    <h2>Notes from the store</h2>
                </header>
                <div className={style.journal_grid}>
                    {journal.map((entry, i) => (
                        <figure
                            key={entry.title}
                            className={`${style.journal_card} ${entry.tall ? style.tall : ""}`}
                        >
                            <div className={style.journal_image}>
                                <Image
                                    src={entry.image}
                                    alt={entry.title}
                                    width={760}
                                    height={900}
                                    sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                                />
                            </div>
                            <figcaption>
                                <span className={style.journal_index}>
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3>{entry.title}</h3>
                                <p>{entry.copy}</p>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </section>
        </>
    );
}
