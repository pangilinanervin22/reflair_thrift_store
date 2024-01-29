'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
    error,


}: {
    error: Error & { digest?: string }

}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div>
            <h1>Customer might not found</h1>
            <h2>Something went wrong!</h2>
            <button onClick={() => window.location.reload()}>Reload</button>
        </div>
    )
}