import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import NavBar from '@/components/NavBar'
import SessionProvider from '@/db/SessionProvider'
import { getServerSession } from "next-auth";


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
          <NavBar />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
