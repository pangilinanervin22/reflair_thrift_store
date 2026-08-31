"use client"

import ErrorState from "@/components/ErrorState/ErrorState";

export default function ShopError(props: { error: Error & { digest?: string }; reset: () => void }) {
    return <ErrorState {...props} />;
}
