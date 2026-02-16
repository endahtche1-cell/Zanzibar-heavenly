import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { BlogPostingJsonLd } from '@/components/ui/JsonLd'
import { getGuideBySlug, getAllGuides, getTourBySlug } from '@/lib/content'
import { FadeIn } from '@/components/ui/Motion'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) return {}
  return {
    title: guide.seo.title,
    description: guide.seo.description,
    openGraph: { title: guide.seo.title, description: guide.seo.description, images: [{ url: guide.heroImage }] },
  }
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) notFound()

  const relatedTours = (guide.relatedTours || [])
    .map((s) => getTourBySlug(s))
    .filter(Boolean)

  // Simple markdown-to-html for content (handles headings, paragraphs, bold, lists)
  const contentHtml = guide.content
    .split('\n\n')
    .map((block) => {
      if (block.startsWith('## ')) return `<h2 class="font-heading text-2xl font-light text-ink mt-8 mb-3">${block.slice(3)}</h2>`
      if (block.startsWith('### ')) return `<h3 class="font-heading text-xl font-light text-ink mt-6 mb-2">${block.slice(4)}</h3>`
      if (block.startsWith('- ')) {
        const items = block.split('\n').map((line) => `<li>${line.slice(2)}</li>`).join('')
        return `<ul class="list-disc pl-6 space-y-1 text-ink/80">${items}</ul>`
      }
      return `<p class="text-ink/80 leading-relaxed">${block}</p>`
    })
    .join('\n')

  return (
    <>
      <BlogPostingJsonLd post={guide} />

      <section className="relative min-h-[40vh] overflow-hidden">
        <ImagePlaceholder src={guide.heroImage} alt={guide.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
          <div className="mx-auto max-w-4xl">
            <span className="inline-block border border-white/30 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-white/80">{guide.category}</span>
            <h1 className="mt-3 font-heading text-3xl font-light text-white sm:text-4xl lg:text-5xl">{guide.title}</h1>
            <time className="mt-3 block text-sm text-white/50" dateTime={guide.date}>
              {new Date(guide.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </div>
        </div>
      </section>

      <article className="bg-warmwhite py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Guide', href: '/guide' }, { label: guide.title }]} />

          <FadeIn>
            <div
              className="max-w-none space-y-4"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </FadeIn>

          {/* Related Tours */}
          {relatedTours.length > 0 && (
            <FadeIn delay={0.2}>
              <div className="mt-16 bg-sand p-8">
                <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-teal">Related Tours</h3>
                <div className="mt-4 space-y-3">
                  {relatedTours.map((tour) => tour && (
                    <Link
                      key={tour.slug}
                      href={`/tours/${tour.slug}`}
                      className="flex items-center justify-between border border-border bg-warmwhite p-4 transition-all duration-300 hover:border-teal/40"
                    >
                      <div>
                        <p className="font-medium text-ink">{tour.title}</p>
                        <p className="text-sm text-muted">{tour.duration} &middot; From ${tour.priceFrom}</p>
                      </div>
                      <svg className="h-5 w-5 text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </article>
    </>
  )
}
