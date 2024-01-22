import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SessionProvider from '@/db/SessionProvider'
import { getServerSession } from "next-auth";
import '@/scss/globals.scss'
import "@uploadthing/react/styles.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PT_Sans_Caption } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'

const font = PT_Sans_Caption({
  display: 'swap',
  weight: "400",
  subsets: ['latin'],
});

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
    <html lang="en" className={font.className}>
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
        <ToastContainer
          position='bottom-center'
          autoClose={2000}
          limit={3}
        />
      </body>
    </html>
  )
}
