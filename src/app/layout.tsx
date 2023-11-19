import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SessionProvider from '@/db/SessionProvider'
import { getServerSession } from "next-auth";
import '@/scss/globals.scss'
import "@uploadthing/react/styles.css";


const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'ReFlair',
  description: 'Thrift store: Unearth the Hidden Flair of Timeless Fashion',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
