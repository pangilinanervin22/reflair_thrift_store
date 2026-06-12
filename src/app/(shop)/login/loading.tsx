import React from 'react'

export default function LoginLoading() {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            fontFamily: 'var(--font-sans), sans-serif',
            fontSize: '11px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#76736c',
        }}>
            Loading…
        </div>
    )
}
