import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import GuideCard from '@/components/ui/GuideCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/Motion'
import { getAllGuides } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Zanzibar Guide — Travel Tips, Culture & Inspiration',
  description: 'Your complete Zanzibar travel guide: when to visit, what to pack, top beaches, cultural tips, and insider knowledge from local experts.',
}

export default function GuidePage() {
  const guides = getAllGuides()

  return (
    <>
      <HeroSection
        title="Zanzibar Guide"
        subtitle="Insider tips, cultural insights, and practical advice to help you plan the perfect Zanzibar adventure."
        image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
        compact
      />

      <section className="bg-warmwhite py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Guide' }]} />

          <FadeIn>
            <div className="mb-12">
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted">{guides.length} articles</p>
            </div>
          </FadeIn>

          <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <StaggerItem key={guide.slug}>
                <GuideCard item={guide} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  )
}
