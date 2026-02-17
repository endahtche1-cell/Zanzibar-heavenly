import Link from 'next/link'
import dynamic from 'next/dynamic'
import HeroSection from '@/components/sections/HeroSection'
import TourCard from '@/components/ui/TourCard'
import AccommodationCard from '@/components/ui/AccommodationCard'
import GuideCard from '@/components/ui/GuideCard'
import TrustBadges from '@/components/ui/TrustBadges'
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/Motion'
import { getFeaturedTours, getFeaturedExpeditions, getFeaturedAccommodation, getAllGuides } from '@/lib/content'

const TestimonialCarousel = dynamic(() => import('@/components/ui/TestimonialCarousel'), {
  loading: () => <div className="bg-warmwhite py-24 lg:py-32" />,
})

export default function HomePage() {
  const featuredTours = getFeaturedTours()
  const featuredExpeditions = getFeaturedExpeditions()
  const featuredAccommodation = getFeaturedAccommodation()
  const guides = getAllGuides().slice(0, 3)

  return (
    <>
      {/* ─── HERO ─── */}
      <HeroSection
        title="Bespoke Zanzibar experiences, curated with local love."
        subtitle="Handcrafted tours, expeditions, and stays on the Spice Island — designed by those who call it home."
        ctaText="Explore Experiences"
        ctaHref="/tours"
        secondaryCta={{ text: 'View Stays', href: '/accommodation' }}
      />

      {/* ─── FEATURED TOURS ─── */}
      {featuredTours.length > 0 && (
        <section className="bg-warmwhite py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <FadeIn>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[12px] tracking-[0.15em] uppercase text-teal font-medium">Curated experiences</p>
                  <h2 className="mt-3 font-heading text-3xl text-ink sm:text-4xl lg:text-5xl">
                    Featured Tours
                  </h2>
                </div>
                <Link href="/tours" className="hidden text-[13px] text-muted transition-colors duration-300 hover:text-teal sm:block">
                  All tours &rarr;
                </Link>
              </div>
            </FadeIn>
            <Stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
              {featuredTours.map((tour) => (
                <StaggerItem key={tour.slug}>
                  <TourCard item={tour} type="tours" />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* ─── TRUST BADGES ─── */}
      <TrustBadges />

      {/* ─── EXPEDITIONS ─── */}
      {featuredExpeditions.length > 0 && (
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <FadeIn>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[12px] tracking-[0.15em] uppercase text-coral font-medium">Go deeper</p>
                  <h2 className="mt-3 font-heading text-3xl text-ink sm:text-4xl lg:text-5xl">
                    Multi-Day Expeditions
                  </h2>
                </div>
                <Link href="/expeditions" className="hidden text-[13px] text-muted transition-colors duration-300 hover:text-teal sm:block">
                  All expeditions &rarr;
                </Link>
              </div>
            </FadeIn>
            <Stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
              {featuredExpeditions.map((exp) => (
                <StaggerItem key={exp.slug}>
                  <TourCard item={exp} type="expeditions" />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* ─── ACCOMMODATION ─── */}
      {featuredAccommodation.length > 0 && (
        <section className="bg-warmwhite py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <FadeIn>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[12px] tracking-[0.15em] uppercase text-saffron font-medium">Where to stay</p>
                  <h2 className="mt-3 font-heading text-3xl text-ink sm:text-4xl lg:text-5xl">
                    Handpicked Stays
                  </h2>
                </div>
                <Link href="/accommodation" className="hidden text-[13px] text-muted transition-colors duration-300 hover:text-teal sm:block">
                  All stays &rarr;
                </Link>
              </div>
            </FadeIn>
            <Stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
              {featuredAccommodation.map((acc) => (
                <StaggerItem key={acc.slug}>
                  <AccommodationCard item={acc} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* ─── TESTIMONIALS ─── */}
      <TestimonialCarousel />

      {/* ─── FINAL CTA ─── */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <FadeIn>
            <p className="text-[12px] tracking-[0.15em] uppercase text-coral font-medium">Begin your journey</p>
            <h2 className="mt-5 font-heading text-3xl leading-[1.2] text-ink sm:text-4xl lg:text-5xl">
              Tell us your dates.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted">
              Our local team will craft a personalised itinerary — no obligation, no templates, just the Zanzibar you&apos;ve been dreaming of.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/contact"
                className="rounded-full bg-teal px-10 py-3.5 text-[14px] tracking-[0.02em] text-white transition-all duration-300 hover:bg-teal-dark hover:shadow-lg"
              >
                Start Planning
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── GUIDE ─── */}
      {guides.length > 0 && (
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <FadeIn>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[12px] tracking-[0.15em] uppercase text-palm font-medium">The journal</p>
                  <h2 className="mt-3 font-heading text-3xl text-ink sm:text-4xl lg:text-5xl">
                    Zanzibar Guide
                  </h2>
                </div>
                <Link href="/guide" className="hidden text-[13px] text-muted transition-colors duration-300 hover:text-teal sm:block">
                  All articles &rarr;
                </Link>
              </div>
            </FadeIn>
            <Stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
              {guides.map((guide) => (
                <StaggerItem key={guide.slug}>
                  <GuideCard item={guide} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}
    </>
  )
}
