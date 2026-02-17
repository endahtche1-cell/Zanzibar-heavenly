import type { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '@/components/sections/HeroSection'
import TrustBadges from '@/components/ui/TrustBadges'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { FadeIn } from '@/components/ui/Motion'

export const metadata: Metadata = {
  title: 'About Zanzibar Heavenly — Our Story',
  description: 'Meet the team behind Zanzibar Heavenly. Born and raised on the island, we bring authentic local expertise to every tour, expedition, and stay we curate.',
  openGraph: {
    title: 'About Zanzibar Heavenly — Our Story',
    description: 'Meet the team behind Zanzibar Heavenly. Born and raised on the island, we bring authentic local expertise to every tour, expedition, and stay we curate.',
    images: [{ url: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80', width: 1200, height: 630 }],
  },
}

export default function AboutPage() {
  return (
    <>
      <HeroSection
        title="Our Story"
        subtitle="Born from a love of Zanzibar and a desire to share its magic with the world."
        image="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&q=80"
        compact
      />

      <section className="bg-warmwhite py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'About' }]} currentPath="/about" />

          <div className="space-y-12 text-ink/80">
            <FadeIn>
              <div>
                <h2 className="font-heading text-3xl font-light tracking-tight text-ink">Welcome to Zanzibar Heavenly</h2>
                <p className="mt-6 text-lg leading-relaxed">
                  Zanzibar Heavenly was founded with a simple belief: the best travel experiences come from genuine local knowledge combined with world-class hospitality. We are a boutique tour and accommodation company rooted in Stone Town, offering bespoke experiences that go far beyond the typical tourist trail.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div>
                <h2 className="font-heading text-2xl font-light tracking-tight text-ink">The Founder&apos;s Story</h2>
                <p className="mt-4 leading-relaxed">
                  Growing up in the narrow, winding streets of Stone Town, our founder developed a deep connection with Zanzibar&apos;s rich tapestry of cultures — Swahili, Arab, Indian, and European influences that make this island unlike anywhere else on earth. After years of sharing hidden gems with friends and family visiting the island, what began as a passion became a calling.
                </p>
                <p className="mt-4 leading-relaxed">
                  Zanzibar Heavenly was born from the desire to offer visitors an authentic, personal window into island life — not just the postcard-perfect beaches (though we have plenty of those), but the stories, flavours, rhythms, and warmth that make Zanzibar truly heavenly.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <h2 className="font-heading text-2xl font-light tracking-tight text-ink">What We Believe</h2>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {[
                    {
                      title: 'Authenticity First',
                      body: 'Every tour, stay, and expedition is designed to showcase the real Zanzibar — its people, traditions, and natural beauty.',
                    },
                    {
                      title: 'Personal Touch',
                      body: 'We treat every guest as family. Your itinerary is tailored to your interests, pace, and curiosity.',
                    },
                    {
                      title: 'Sustainable Tourism',
                      body: 'We work with local communities, support conservation efforts, and ensure tourism benefits the island and its people.',
                    },
                    {
                      title: 'Safety & Trust',
                      body: 'Licensed, insured, and deeply experienced — you are in safe hands from the moment you arrive.',
                    },
                  ].map((value) => (
                    <div key={value.title} className="border border-border bg-white p-8">
                      <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-teal">{value.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{value.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div>
                <h2 className="font-heading text-2xl font-light tracking-tight text-ink">Our Team</h2>
                <p className="mt-4 leading-relaxed">
                  Our team is made up of Zanzibar locals who are passionate about their island. From expert guides who can trace Stone Town&apos;s history through every carved door, to marine enthusiasts who know the best reefs and currents, to hospitality professionals who ensure every stay is comfortable and memorable — each member brings genuine expertise and warmth.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-sand p-12 text-center">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-teal">Begin Your Journey</p>
                <h2 className="mt-4 font-heading text-2xl font-light text-ink">Ready to Discover Zanzibar?</h2>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
                  Let us create something special for you. Whether it&apos;s a day tour, a multi-day expedition, or finding the perfect place to stay — we&apos;re here to help.
                </p>
                <Link
                  href="/contact"
                  className="mt-8 inline-block rounded-full bg-teal px-10 py-3 text-xs font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-teal-dark"
                >
                  Get in Touch
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <TrustBadges />
    </>
  )
}
