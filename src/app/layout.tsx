import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import SessionProvider from '@/db/SessionProvider'
import '@/scss/globals.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DemoBadge from '@/components/DemoBadge/DemoBadge'
import JsonLd from '@/components/JsonLd'
import { organizationJsonLd, websiteJsonLd } from '@/lib/jsonld'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants'

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

const DEFAULT_TITLE = 'ReFlair — Curated Pre-Loved Fashion'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: '%s · ReFlair' },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_PH',
    url: '/',
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: 'summary_large_image', title: DEFAULT_TITLE, description: SITE_DESCRIPTION },
  robots: { index: true, follow: true },
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
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <SessionProvider>
          {children}
        </SessionProvider>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          limit={3}
          hideProgressBar
        />
        <DemoBadge />
      </body>
    </html>
  )
}
