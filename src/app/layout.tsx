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
      </body>
    </html>
  )
}
