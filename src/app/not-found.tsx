import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-warmwhite pt-16">
      <div className="mx-auto max-w-lg px-4 text-center">
        <p className="text-[120px] font-light leading-none tracking-tight text-border">404</p>
        <h1 className="mt-6 font-heading text-3xl font-light tracking-tight text-ink">Page Not Found</h1>
        <p className="mt-4 text-muted leading-relaxed">
          It seems this page has drifted out to sea. Let us help you find your way back to paradise.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-teal px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-teal-dark"
          >
            Back to Home
          </Link>
          <Link
            href="/tours"
            className="rounded-full border border-teal px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] text-teal transition-all duration-300 hover:bg-teal hover:text-white"
          >
            Explore Tours
          </Link>
        </div>
      </div>
    </section>
  )
}
