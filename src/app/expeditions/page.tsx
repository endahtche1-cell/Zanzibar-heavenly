import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import TourCard from '@/components/ui/TourCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Stagger, StaggerItem } from '@/components/ui/Motion'
import { getAllExpeditions } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Expeditions — Multi-Day Adventures in Zanzibar',
  description: 'Immersive multi-day expeditions across Zanzibar: island hopping, cultural immersion, photography, and more. Go beyond the ordinary.',
  openGraph: {
    title: 'Zanzibar Expeditions — Multi-Day Adventures',
    description: 'Immersive multi-day expeditions across Zanzibar: island hopping, cultural immersion, photography, and more.',
    images: [{ url: 'https://images.unsplash.com/photo-1634662052101-78f72e8307be?w=1200&q=80', width: 1200, height: 630 }],
  },
}

export default function ExpeditionsPage() {
  const expeditions = getAllExpeditions()

  return (
    <>
      <HeroSection
        title="Zanzibar Expeditions"
        subtitle="Multi-day adventures that take you deeper into the heart and soul of Zanzibar and its surrounding islands."
        image="https://images.unsplash.com/photo-1634662052101-78f72e8307be?w=1920&q=80"
        compact
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Expeditions' }]} currentPath="/expeditions" />

          <div className="mb-12">
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted">{expeditions.length} expeditions available</p>
          </div>

          <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {expeditions.map((exp) => (
              <StaggerItem key={exp.slug}>
                <TourCard item={exp} type="expeditions" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  )
}
