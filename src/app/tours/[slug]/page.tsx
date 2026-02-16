import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import EnquiryForm from '@/components/ui/EnquiryForm'
import { TourJsonLd } from '@/components/ui/JsonLd'
import { getTourBySlug, getAllTours } from '@/lib/content'
import { formatPrice } from '@/lib/utils'
import { getWhatsAppEnquiryUrl } from '@/config/site'
import { FadeIn } from '@/components/ui/Motion'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllTours().map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tour = getTourBySlug(slug)
  if (!tour) return {}
  return {
    title: tour.seo.title,
    description: tour.seo.description,
    openGraph: {
      title: tour.seo.title,
      description: tour.seo.description,
      images: [{ url: tour.heroImage }],
    },
  }
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params
  const tour = getTourBySlug(slug)
  if (!tour) notFound()

  const whatsappUrl = getWhatsAppEnquiryUrl(tour.title, 'tour')

  return (
    <>
      <TourJsonLd tour={tour} />

      {/* Hero */}
      <section className="relative min-h-[50vh] overflow-hidden">
        <ImagePlaceholder src={tour.heroImage} alt={tour.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
          <div className="mx-auto max-w-7xl">
            <span className="inline-block border border-teal/40 bg-ink/60 px-3 py-1 text-[11px] tracking-[0.15em] uppercase text-white">
              {tour.difficulty}
            </span>
            <h1 className="mt-3 font-heading text-3xl font-normal text-white sm:text-4xl lg:text-5xl">
              {tour.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span>{tour.location}</span>
              <span>&middot;</span>
              <span>{tour.duration}</span>
              <span>&middot;</span>
              <span>From {formatPrice(tour.priceFrom, tour.currency)}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Tours', href: '/tours' }, { label: tour.title }]} />

          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <FadeIn>
                <div>
                  <p className="text-lg font-light leading-relaxed text-muted">{tour.content}</p>
                </div>
              </FadeIn>

              {/* Highlights */}
              <FadeIn delay={0.1}>
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-muted">Discover</p>
                  <h2 className="mt-2 font-heading text-3xl font-normal text-ink">Highlights</h2>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {tour.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-muted">
                        <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              {/* Itinerary */}
              {tour.itinerary.length > 0 && (
                <FadeIn delay={0.2}>
                  <div>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-muted">Your Day</p>
                    <h2 className="mt-2 font-heading text-3xl font-normal text-ink">Itinerary</h2>
                    <div className="mt-6 space-y-4">
                      {tour.itinerary.map((day, i) => (
                        <div key={i} className="border border-border bg-sand/50 p-6">
                          <h3 className="font-heading text-lg font-normal text-ink">{day.dayTitle}</h3>
                          <p className="mt-2 text-sm font-light leading-relaxed text-muted">{day.dayBody}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* Includes / Excludes */}
              <FadeIn delay={0.1}>
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="font-heading text-lg font-normal text-ink">What&apos;s Included</h3>
                    <ul className="mt-4 space-y-2">
                      {tour.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted">
                          <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-normal text-ink">Not Included</h3>
                    <ul className="mt-4 space-y-2">
                      {tour.excludes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted">
                          <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>

              {/* What to bring */}
              {tour.whatToBring.length > 0 && (
                <FadeIn delay={0.2}>
                  <div>
                    <h2 className="font-heading text-2xl font-normal text-ink">What to Bring</h2>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {tour.whatToBring.map((item) => (
                        <li key={item} className="border border-border bg-warmwhite px-4 py-1.5 text-sm text-muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              )}

              {/* Gallery */}
              {tour.galleryImages.length > 0 && (
                <FadeIn delay={0.1}>
                  <div>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-muted">Gallery</p>
                    <h2 className="mt-2 font-heading text-3xl font-normal text-ink">Gallery</h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      {tour.galleryImages.map((img, i) => (
                        <div key={i} className="aspect-[4/3] overflow-hidden">
                          <ImagePlaceholder src={img} alt={`${tour.title} gallery ${i + 1}`} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Price card */}
                <FadeIn direction="right" delay={0.1}>
                  <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
                    <div className="text-center">
                      <span className="text-[11px] tracking-[0.2em] uppercase text-muted">From</span>
                      <p className="mt-1 text-3xl font-light text-teal">{formatPrice(tour.priceFrom, tour.currency)}</p>
                      <p className="mt-1 text-sm text-muted">per person</p>
                    </div>
                    <div className="mt-6 space-y-3">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal px-6 py-3 text-[13px] font-medium tracking-[0.12em] uppercase text-white transition-all hover:bg-teal-dark hover:shadow-lg"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                        Enquire on WhatsApp
                      </a>
                      <Link
                        href="#enquiry-form"
                        className="flex w-full items-center justify-center rounded-full border border-teal px-6 py-3 text-[13px] font-medium tracking-[0.12em] uppercase text-teal transition-all hover:bg-teal hover:text-white hover:shadow-lg"
                      >
                        Send Enquiry
                      </Link>
                    </div>
                  </div>
                </FadeIn>

                {/* Quick info */}
                <FadeIn direction="right" delay={0.2}>
                  <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
                    <h3 className="text-[11px] tracking-[0.2em] uppercase text-muted">Quick Info</h3>
                    <dl className="mt-4 divide-y divide-border text-sm">
                      <div className="flex items-baseline justify-between py-3">
                        <dt className="shrink-0 text-muted">Duration</dt>
                        <dd className="ml-4 text-right font-medium text-ink">{tour.duration}</dd>
                      </div>
                      <div className="flex items-baseline justify-between py-3">
                        <dt className="shrink-0 text-muted">Difficulty</dt>
                        <dd className="ml-4 text-right font-medium text-ink">{tour.difficulty}</dd>
                      </div>
                      <div className="flex items-baseline justify-between py-3">
                        <dt className="shrink-0 text-muted">Group Size</dt>
                        <dd className="ml-4 text-right font-medium text-ink">{tour.groupSize}</dd>
                      </div>
                      <div className="flex items-baseline justify-between py-3">
                        <dt className="shrink-0 text-muted">Best Time</dt>
                        <dd className="ml-4 text-right font-medium text-ink">{tour.bestTimeToGo}</dd>
                      </div>
                    </dl>
                    {tour.pickupInfo && (
                      <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted">{tour.pickupInfo}</p>
                    )}
                    <p className="mt-2 text-xs leading-relaxed text-muted">{tour.cancellationPolicyShort}</p>
                  </div>
                </FadeIn>
              </div>
            </aside>
          </div>

          {/* Enquiry form section */}
          <FadeIn delay={0.1}>
            <div className="mt-20 border border-border bg-sand/50 p-8" id="enquiry-section">
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted">Get in Touch</p>
              <h2 className="mt-2 font-heading text-3xl font-normal text-ink">Enquire About This Tour</h2>
              <p className="mt-2 text-muted">Fill out the form and our team will get back to you within 24 hours.</p>
              <div className="mt-6">
                <EnquiryForm preselectedType="tour" preselectedItem={tour.slug} compact />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
