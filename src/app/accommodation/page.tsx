import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import AccommodationCard from '@/components/ui/AccommodationCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/Motion'
import { getAllAccommodation } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Accommodation — Villas, Hotels & Stays in Zanzibar',
  description: 'Handpicked Zanzibar accommodation: beachfront villas, boutique hotels, resort retreats, and budget-friendly apartments across the island.',
}

export default function AccommodationPage() {
  const accommodation = getAllAccommodation()

  return (
    <>
      <HeroSection
        title="Zanzibar Accommodation"
        subtitle="From beachfront villas to historic boutique hotels — find your perfect island retreat."
        image="/images/hero/accommodation.jpg"
        compact
      />

      <section className="bg-warmwhite py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Accommodation' }]} />

          <FadeIn>
            <div className="mb-12">
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted">{accommodation.length} properties available</p>
            </div>
          </FadeIn>

          <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {accommodation.map((acc) => (
              <StaggerItem key={acc.slug}>
                <AccommodationCard item={acc} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  )
}
