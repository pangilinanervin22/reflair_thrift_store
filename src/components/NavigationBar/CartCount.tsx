"use client"

import React from "react";
import { useSession } from "next-auth/react";
import style from "./NavigationBar.module.scss";
import { CART_CHANGED_EVENT } from "@/utils/cartEvents";

export default function CartCount() {
    const { status } = useSession();
    const [count, setCount] = React.useState(0);

    const refresh = React.useCallback(() => {
        fetch("/api/cart")
            .then((res) => (res.ok ? res.json() : { count: 0 }))
            .then((data) => setCount(Number(data.count) || 0))
            .catch(() => setCount(0));
    }, []);

    React.useEffect(() => {
        if (status !== "authenticated") return;
        refresh();
    }, [status, refresh]);

    React.useEffect(() => {
        window.addEventListener(CART_CHANGED_EVENT, refresh);
        return () => window.removeEventListener(CART_CHANGED_EVENT, refresh);
    }, [refresh]);

    if (status !== "authenticated" || !count) return null;

    return <span className={style.cart_count}>{count}</span>;
}
