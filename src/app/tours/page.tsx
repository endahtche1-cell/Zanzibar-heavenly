import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import TourCard from '@/components/ui/TourCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Stagger, StaggerItem } from '@/components/ui/Motion'
import { getAllTours } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Tours — Day Trips & Experiences in Zanzibar',
  description: 'Explore curated day tours across Zanzibar: Stone Town walks, spice farms, snorkelling, dhow cruises, and more. Guided by locals who know the island best.',
  openGraph: {
    title: 'Zanzibar Tours — Day Trips & Experiences',
    description: 'Explore curated day tours across Zanzibar: Stone Town walks, spice farms, snorkelling, dhow cruises, and more.',
    images: [{ url: 'https://images.unsplash.com/photo-1617032021001-84731af165ab?w=1200&q=80', width: 1200, height: 630 }],
  },
}

export default function ToursPage() {
  const tours = getAllTours()

  return (
    <>
      <HeroSection
        title="Zanzibar Tours"
        subtitle="From historic Stone Town to crystal-clear waters — discover the island through experiences curated by local experts."
        image="https://images.unsplash.com/photo-1617032021001-84731af165ab?w=1920&q=80"
        compact
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Tours' }]} currentPath="/tours" />

          <div className="mb-12">
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted">{tours.length} tours available</p>
          </div>

          <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <StaggerItem key={tour.slug}>
                <TourCard item={tour} type="tours" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  )
}
