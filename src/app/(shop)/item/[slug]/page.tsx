interface PageProps {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: PageProps) {
    return {
        title: "Item: " + params.slug,
        description: "My Item: " + params.slug,
    }
}

export default function Page({ params }: PageProps) {
    return <div>My Item: {params.slug}</div>
}
