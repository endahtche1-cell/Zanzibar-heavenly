import { siteConfig } from '@/config/site'

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.tagline,
        email: siteConfig.contactEmail,
        telephone: siteConfig.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: siteConfig.location.city,
          addressRegion: siteConfig.location.island,
          addressCountry: 'TZ',
        },
        sameAs: Object.values(siteConfig.social),
      }}
    />
  )
}

export function TourJsonLd({ tour }: { tour: { title: string; slug: string; seo: { description: string }; priceFrom: number; currency: string; heroImage: string; location: string } }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'TouristTrip',
        name: tour.title,
        description: tour.seo.description,
        url: `${siteConfig.url}/tours/${tour.slug}`,
        image: `${siteConfig.url}${tour.heroImage}`,
        touristType: 'Leisure',
        provider: {
          '@type': 'TravelAgency',
          name: siteConfig.name,
          url: siteConfig.url,
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: tour.currency,
          price: tour.priceFrom,
          availability: 'https://schema.org/InStock',
        },
      }}
    />
  )
}

export function AccommodationJsonLd({ acc }: { acc: { title: string; slug: string; seo: { description: string }; priceFrom: number; currency: string; heroImage: string; area: string; amenities: string[] } }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'LodgingBusiness',
        name: acc.title,
        description: acc.seo.description,
        url: `${siteConfig.url}/accommodation/${acc.slug}`,
        image: `${siteConfig.url}${acc.heroImage}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: acc.area,
          addressRegion: 'Zanzibar',
          addressCountry: 'TZ',
        },
        priceRange: `From ${acc.currency} ${acc.priceFrom}`,
        amenityFeature: acc.amenities.map((a) => ({
          '@type': 'LocationFeatureSpecification',
          name: a,
          value: true,
        })),
      }}
    />
  )
}

export function BlogPostingJsonLd({ post }: { post: { title: string; slug: string; date: string; excerpt: string; heroImage: string; seo: { description: string } } }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.seo.description,
        url: `${siteConfig.url}/guide/${post.slug}`,
        image: `${siteConfig.url}${post.heroImage}`,
        datePublished: post.date,
        author: {
          '@type': 'Organization',
          name: siteConfig.name,
        },
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url,
        },
      }}
    />
  )
}

export function FAQPageJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }}
    />
  )
}

export function BreadcrumbListJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  )
}
