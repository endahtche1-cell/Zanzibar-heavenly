import type { Metadata } from 'next'
import { DM_Sans, Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { OrganizationJsonLd } from '@/components/ui/JsonLd'
import { siteConfig } from '@/config/site'
import ClientProviders from '@/components/ui/ClientProviders'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Bespoke Tours, Expeditions & Stays in Zanzibar`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  alternates: {
    canonical: './',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Bespoke Tours, Expeditions & Stays in Zanzibar`,
    description: siteConfig.tagline,
    images: [{ url: 'https://images.unsplash.com/photo-1627899316467-d9e61aa54f98?w=1200&q=80', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.tagline,
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable}`}>
      <body className="font-body bg-warmwhite text-ink antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ClientProviders />
        <OrganizationJsonLd />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
