import React from 'react'

export default function LoadingLabel({ label = "Loading…" }: { label?: string }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            width: '100%',
            fontFamily: 'var(--font-sans), sans-serif',
            fontSize: '11px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#76736c',
        }}>
            {label}
        </div>
    )
}
