"use client"

import ErrorState from "@/components/ErrorState/ErrorState";

export default function AdminError(props: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <ErrorState
            {...props}
            eyebrow="ReFlair Atelier · Something went wrong"
            title="This admin page could not be loaded."
            link={{ href: "/admin", label: "Back to the dashboard" }}
        />
    );
}
