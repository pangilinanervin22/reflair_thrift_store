import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import SessionProvider from '@/db/SessionProvider'
import { getServerSession } from 'next-auth'
import '@/scss/globals.scss'
import '@uploadthing/react/styles.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ✅ Load font
const font = Playfair_Display({
  display: 'swap',
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ReFlair',
  description: 'Thrift store: Unearth the Hidden Flair of Timeless Fashion',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          limit={3}
        />
        <div
          role="note"
          aria-label="Demo notice: This is a demo sample. Items are not for sale. For learning only."
          style={{
            position: 'fixed',
            right: '16px',
            bottom: '16px',
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            padding: '8px 12px',
            fontSize: '12px',
            lineHeight: 1.2,
            borderRadius: '999px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            pointerEvents: 'none',
            userSelect: 'none',
            letterSpacing: '0.3px',
          }}
        >
          DEMO SAMPLE · ITEMS NOT FOR SALE · FOR LEARNING ONLY
        </div>
      </body>
    </html>
  )
}
