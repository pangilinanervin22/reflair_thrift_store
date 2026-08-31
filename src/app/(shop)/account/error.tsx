"use client"

import ErrorState from "@/components/ErrorState/ErrorState";

export default function AccountError(props: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <ErrorState
            {...props}
            title="Your account page could not be loaded."
            link={{ href: "/product", label: "Continue shopping" }}
        />
    );
}
