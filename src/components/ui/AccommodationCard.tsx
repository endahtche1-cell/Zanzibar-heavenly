import Link from 'next/link'
import { ImageHoverZoom } from './CSSMotion'
import ImagePlaceholder from './ImagePlaceholder'
import { formatPrice } from '@/lib/utils'
import type { Accommodation } from '@/lib/types'

export default function AccommodationCard({ item }: { item: Accommodation }) {
  const href = `/accommodation/${item.slug}`

  return (
    <article className="group">
      <Link href={href} className="block">
        {/* Image with rounded corners */}
        <ImageHoverZoom className="aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden">
          <ImagePlaceholder
            src={item.heroImage}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </ImageHoverZoom>

        {/* Content below image */}
        <div className="mt-4 px-1">
          <div className="flex items-center gap-2 text-[12px] text-muted">
            <span>{item.area}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="capitalize">{item.type}</span>
          </div>
          <h3 className="mt-1.5 font-heading text-xl leading-snug text-ink transition-colors duration-300 group-hover:text-teal">
            {item.title}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-muted">
              From <span className="font-medium text-teal">{formatPrice(item.priceFrom, item.currency)}</span>
              <span className="text-subtle">/night</span>
            </span>
            <span className="text-[12px] text-subtle transition-colors duration-300 group-hover:text-teal">
              View &rarr;
            </span>
          </div>
          {/* Accent bar */}
          <div className="mt-3 h-[2px] w-8 rounded-full bg-saffron transition-all duration-300 group-hover:w-12" />
        </div>
      </Link>
    </article>
  )
}
