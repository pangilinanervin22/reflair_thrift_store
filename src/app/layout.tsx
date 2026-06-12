import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import SessionProvider from '@/db/SessionProvider'
import '@/scss/globals.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const serif = Cormorant_Garamond({
  display: 'swap',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
})

const sans = Jost({
  display: 'swap',
  weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'ReFlair — Curated Pre-Loved Fashion',
  description: 'Thrift store: Unearth the Hidden Flair of Timeless Fashion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // No getServerSession here: reading cookies in the root layout would force
  // every route to render dynamically. SessionProvider fetches the session
  // client-side, so customer pages can stay static/ISR.
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${serif.variable} ${sans.variable}`}>
        <SessionProvider>
          {children}
        </SessionProvider>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          limit={3}
          hideProgressBar
        />
        <div
          role="note"
          aria-label="Demo notice: This is a demo sample. Items are not for sale. For learning only."
          style={{
            position: 'fixed',
            right: '16px',
            bottom: '16px',
            zIndex: 1000,
            background: 'rgba(18, 17, 16, 0.92)',
            color: '#f6f5f1',
            padding: '9px 14px',
            fontSize: '10px',
            lineHeight: 1.2,
            borderRadius: 0,
            border: '1px solid rgba(246, 245, 241, 0.25)',
            pointerEvents: 'none',
            userSelect: 'none',
            letterSpacing: '0.18em',
            fontFamily: 'var(--font-sans), sans-serif',
            textTransform: 'uppercase',
          }}
        >
          Demo Sample · Items Not For Sale · For Learning Only
        </div>
      </body>
    </html>
  )
}
