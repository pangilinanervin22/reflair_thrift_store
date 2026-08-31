"use client"

import { useEffect } from "react";
import Link from "next/link";
import style from "./ErrorState.module.scss";

interface Props {
    error: Error & { digest?: string };
    reset: () => void;
    eyebrow?: string;
    title?: string;
    note?: string;
    /** Secondary escape hatch, e.g. { href: "/product", label: "Back to the archive" } */
    link?: { href: string; label: string };
}

// Shared body for every error.tsx boundary. Next strips error messages in
// production, so the digest is the only detail worth showing a visitor.
export default function ErrorState({
    error,
    reset,
    eyebrow = "ReFlair · Something went wrong",
    title = "This page could not be loaded.",
    note = "It’s us, not you. Try again in a moment.",
    link = { href: "/", label: "Return to the store" },
}: Props) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className={style.wrapper} role="alert">
            <p className={style.eyebrow}>{eyebrow}</p>
            <h1 className={style.title}>{title}</h1>
            <p className={style.note}>{note}</p>
            {error.digest && <p className={style.digest}>Reference: {error.digest}</p>}
            <div className={style.actions}>
                <button type="button" className={style.retry} onClick={() => reset()}>Try again</button>
                <Link href={link.href} className={style.link}>{link.label}</Link>
            </div>
        </div>
    );
}
