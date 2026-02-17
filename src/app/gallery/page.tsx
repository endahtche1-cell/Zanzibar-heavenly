import type { Metadata } from 'next'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { FadeIn } from '@/components/ui/Motion'
import GalleryGrid from '@/components/sections/GalleryGrid'

export const metadata: Metadata = {
  title: 'Gallery — Real Moments from Zanzibar',
  description: 'Browse photos from real Zanzibar Heavenly adventures — dhow cruises, spice tours, snorkelling, wildlife encounters, and more. See the island through our guests\' eyes.',
  openGraph: {
    title: 'Gallery — Real Moments from Zanzibar',
    description: 'Browse photos from real Zanzibar Heavenly adventures — dhow cruises, spice tours, snorkelling, wildlife encounters, and more.',
    images: [{ url: 'https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?w=1200&q=80', width: 1200, height: 630 }],
  },
}

export default function GalleryPage() {
  return (
    <>
      {/* Hero header */}
      <section className="bg-sand py-24 pt-32">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-teal">Our Adventures</p>
            <h1 className="mt-4 font-heading text-3xl font-medium text-ink sm:text-4xl lg:text-5xl">
              Gallery
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[15px] text-muted">
              Real moments from real adventures — captured by our guests and team across Zanzibar.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="bg-warmwhite py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Gallery' }]} currentPath="/gallery" />
          <GalleryGrid />
        </div>
      </section>
    </>
  )
}
