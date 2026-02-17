import Link from 'next/link'
import { BreadcrumbListJsonLd } from './JsonLd'
import { siteConfig } from '@/config/site'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  currentPath?: string
}

export default function Breadcrumbs({ items, currentPath }: BreadcrumbsProps) {
  // Build JSON-LD items with full URLs
  const jsonLdItems = [
    { name: 'Home', url: siteConfig.url },
    ...items.map((item) => ({
      name: item.label,
      url: item.href ? `${siteConfig.url}${item.href}` : currentPath ? `${siteConfig.url}${currentPath}` : siteConfig.url,
    })),
  ]

  return (
    <>
      <BreadcrumbListJsonLd items={jsonLdItems} />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
          <li>
            <Link href="/" className="transition-colors duration-200 hover:text-teal">
              Home
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              <svg className="h-4 w-4 text-border" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              {item.href ? (
                <Link href={item.href} className="transition-colors duration-200 hover:text-teal">
                  {item.label}
                </Link>
              ) : (
                <span className="text-ink font-medium" aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
