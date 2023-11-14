interface PageProps {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: PageProps) {
    return {
        title: "Product: " + params.slug,
        description: "Product: " + params.slug,
    }
}

export default function ProductPage({ params }: PageProps) {
    return <div>My Item: {params.slug}</div>
}
