"use client"

import ErrorState from "@/components/ErrorState/ErrorState";

export default function ProductError(props: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <ErrorState
            {...props}
            title="This piece could not be loaded."
            link={{ href: "/product", label: "Back to the archive" }}
        />
    );
}
