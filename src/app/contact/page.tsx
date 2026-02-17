import type { Metadata } from 'next'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import EnquiryForm from '@/components/ui/EnquiryForm'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { siteConfig } from '@/config/site'
import { getAllListingItems } from '@/lib/content'
import { FadeIn } from '@/components/ui/Motion'

export const metadata: Metadata = {
  title: 'Enquire — Start Planning Your Holiday',
  description: 'Ready to plan your Zanzibar adventure? Contact Zanzibar Heavenly via our enquiry form, WhatsApp, email, or phone. We respond within 24 hours.',
  openGraph: {
    title: 'Enquire — Start Planning Your Zanzibar Holiday',
    description: 'Ready to plan your Zanzibar adventure? Contact Zanzibar Heavenly via our enquiry form, WhatsApp, email, or phone.',
  },
}

export default function ContactPage() {
  const { tours, expeditions, accommodation } = getAllListingItems()
  const allItems = [
    ...tours.map((t) => ({ ...t, label: `Tour: ${t.label}` })),
    ...expeditions.map((e) => ({ ...e, label: `Expedition: ${e.label}` })),
    ...accommodation.map((a) => ({ ...a, label: `Stay: ${a.label}` })),
  ]

  return (
    <>
      <section className="bg-sand py-24 pt-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="font-heading text-3xl font-medium text-teal sm:text-4xl lg:text-5xl">
              Start Planning Your Holiday
            </h1>
            <p className="mt-4 text-[15px] text-muted">
              Complete the form below and one of our specialists will be in touch
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-warmwhite py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Contact' }]} currentPath="/contact" />

          <FadeIn>
            <div className="mt-8">
              <EnquiryForm items={allItems} />
            </div>
          </FadeIn>

          {/* Contact details below form */}
          <FadeIn delay={0.2}>
            <div className="mt-16 grid gap-6 border-t border-border pt-12 sm:grid-cols-3">
              <div className="text-center">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-teal">WhatsApp</p>
                <div className="mt-3">
                  <WhatsAppButton variant="inline" label="Chat with us" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-teal">Email</p>
                <a href={`mailto:${siteConfig.contactEmail}`} className="mt-3 block text-[15px] text-ink transition-colors hover:text-teal">
                  {siteConfig.contactEmail}
                </a>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-teal">Phone</p>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="mt-3 block text-[15px] text-ink transition-colors hover:text-teal">
                  {siteConfig.phone}
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
