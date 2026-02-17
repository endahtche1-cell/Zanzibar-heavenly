import Link from 'next/link'
import { ImageHoverZoom } from './CSSMotion'
import ImagePlaceholder from './ImagePlaceholder'
import type { Guide } from '@/lib/types'

export default function GuideCard({ item }: { item: Guide }) {
  const href = `/guide/${item.slug}`

  return (
    <article className="group">
      <Link href={href} className="block">
        <ImageHoverZoom className="aspect-[16/10] rounded-2xl overflow-hidden">
          <ImagePlaceholder
            src={item.heroImage}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </ImageHoverZoom>
      </Link>
      <div className="mt-4 px-1">
        <div className="flex items-center gap-2 text-[12px] text-muted">
          <span>{item.category}</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <time dateTime={item.date}>
            {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
          </time>
        </div>
        <Link href={href}>
          <h3 className="mt-1.5 font-heading text-xl leading-snug text-ink transition-colors duration-300 group-hover:text-teal">
            {item.title}
          </h3>
        </Link>
        <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
          {item.excerpt}
        </p>
        <Link
          href={href}
          className="mt-3 inline-flex items-center gap-2 text-[12px] text-teal transition-colors duration-300 hover:text-teal-dark"
        >
          Read article
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
        </Link>
      </div>
    </article>
  )
}
