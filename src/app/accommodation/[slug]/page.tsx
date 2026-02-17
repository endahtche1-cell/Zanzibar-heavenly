import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import EnquiryForm from '@/components/ui/EnquiryForm'
import { AccommodationJsonLd } from '@/components/ui/JsonLd'
import { getAccommodationBySlug, getAllAccommodation } from '@/lib/content'
import { formatPrice } from '@/lib/utils'
import { getWhatsAppEnquiryUrl } from '@/config/site'
import { FadeIn } from '@/components/ui/Motion'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllAccommodation().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const acc = getAccommodationBySlug(slug)
  if (!acc) return {}
  return {
    title: acc.seo.title,
    description: acc.seo.description,
    openGraph: { title: acc.seo.title, description: acc.seo.description, images: [{ url: acc.heroImage }] },
  }
}

export default async function AccommodationDetailPage({ params }: Props) {
  const { slug } = await params
  const acc = getAccommodationBySlug(slug)
  if (!acc) notFound()

  const whatsappUrl = getWhatsAppEnquiryUrl(acc.title, 'accommodation')

  return (
    <>
      <AccommodationJsonLd acc={acc} />

      <section className="relative min-h-[50vh] overflow-hidden">
        <ImagePlaceholder src={acc.heroImage} alt={acc.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
          <div className="mx-auto max-w-7xl">
            <span className="inline-block border border-white/30 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-white/90 capitalize">{acc.type}</span>
            <h1 className="mt-3 font-heading text-3xl font-light text-white sm:text-4xl lg:text-5xl">{acc.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span>{acc.area}</span>
              <span>&middot;</span>
              <span>Sleeps {acc.sleeps}</span>
              <span>&middot;</span>
              <span>From {formatPrice(acc.priceFrom, acc.currency)}/night</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warmwhite py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Accommodation', href: '/accommodation' }, { label: acc.title }]} currentPath={`/accommodation/${acc.slug}`} />

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              <FadeIn>
                <div>
                  <p className="text-lg leading-relaxed text-ink/80">{acc.content}</p>
                </div>
              </FadeIn>

              {/* Amenities */}
              <FadeIn delay={0.1}>
                <div>
                  <h2 className="font-heading text-2xl font-light text-ink">Amenities</h2>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {acc.amenities.map((a) => (
                      <li key={a} className="flex items-center gap-2 text-ink/80">
                        <svg className="h-4 w-4 flex-shrink-0 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              {/* Nearby */}
              {acc.nearby.length > 0 && (
                <FadeIn delay={0.2}>
                  <div>
                    <h2 className="font-heading text-2xl font-light text-ink">What&apos;s Nearby</h2>
                    <ul className="mt-4 space-y-2">
                      {acc.nearby.map((n) => (
                        <li key={n} className="flex items-center gap-2 text-ink/80">
                          <svg className="h-4 w-4 flex-shrink-0 text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              )}

              {/* House Rules */}
              {acc.houseRules.length > 0 && (
                <FadeIn delay={0.1}>
                  <div>
                    <h2 className="font-heading text-2xl font-light text-ink">House Rules</h2>
                    <ul className="mt-4 space-y-2">
                      {acc.houseRules.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-sm text-muted">
                          <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-ink-light" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              )}

              {/* Gallery */}
              {acc.galleryImages.length > 0 && (
                <FadeIn delay={0.2}>
                  <div>
                    <h2 className="font-heading text-2xl font-light text-ink">Gallery</h2>
                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                      {acc.galleryImages.map((img, i) => (
                        <div key={i} className="aspect-[4/3] overflow-hidden">
                          <ImagePlaceholder src={img} alt={`${acc.title} gallery ${i + 1}`} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <FadeIn direction="right" delay={0.1}>
                  <div className="border border-border bg-sand/50 p-6">
                    <div className="text-center">
                      <span className="text-xs uppercase tracking-wider text-muted">From</span>
                      <p className="text-3xl font-light text-ink">{formatPrice(acc.priceFrom, acc.currency)}<span className="text-base text-muted">/night</span></p>
                    </div>
                    <div className="mt-6 space-y-3">
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 bg-[#25D366] px-6 py-3 text-xs font-medium uppercase tracking-[0.12em] text-white transition-all hover:bg-[#1da851]">
                        Enquire on WhatsApp
                      </a>
                      <Link href="#enquiry-section" className="flex w-full items-center justify-center rounded-full bg-teal px-6 py-3 text-xs font-medium uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-teal-dark hover:shadow-lg">
                        Send Enquiry
                      </Link>
                    </div>
                  </div>
                </FadeIn>
                <FadeIn direction="right" delay={0.2}>
                  <div className="border border-border bg-sand/50 p-6">
                    <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-teal">Property Details</h3>
                    <dl className="mt-4 space-y-3 text-sm">
                      <div className="flex justify-between"><dt className="text-muted">Type</dt><dd className="font-medium text-ink capitalize">{acc.type}</dd></div>
                      <div className="flex justify-between"><dt className="text-muted">Area</dt><dd className="font-medium text-ink">{acc.area}</dd></div>
                      <div className="flex justify-between"><dt className="text-muted">Sleeps</dt><dd className="font-medium text-ink">{acc.sleeps}</dd></div>
                      {acc.bedrooms && <div className="flex justify-between"><dt className="text-muted">Bedrooms</dt><dd className="font-medium text-ink">{acc.bedrooms}</dd></div>}
                    </dl>
                    {acc.bookingNotes && <p className="mt-4 border-t border-border pt-4 text-xs text-muted">{acc.bookingNotes}</p>}
                  </div>
                </FadeIn>
              </div>
            </aside>
          </div>

          <FadeIn delay={0.1}>
            <div className="mt-20 border border-border bg-sand/50 p-8" id="enquiry-section">
              <h2 className="font-heading text-2xl font-light text-ink">Enquire About This Property</h2>
              <p className="mt-2 text-sm text-muted">Fill out the form and our team will get back to you within 24 hours.</p>
              <div className="mt-6">
                <EnquiryForm preselectedType="accommodation" preselectedItem={acc.slug} compact />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
