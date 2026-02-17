import type { Metadata } from 'next'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of service for ${siteConfig.name}. Read about our booking terms, cancellation policy, and service conditions.`,
}

export default function TermsPage() {
  return (
    <section className="bg-warmwhite pt-32 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Terms of Service' }]} currentPath="/terms" />

        <h1 className="font-heading text-3xl font-light tracking-tight text-ink sm:text-4xl">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted">Last updated: January 2025</p>

        <div className="mt-10 space-y-8 leading-relaxed text-ink/80">
          <div>
            <h2 className="font-heading text-xl font-light text-ink">1. General</h2>
            <p className="mt-3">These terms govern your use of the {siteConfig.name} website and the booking of tours, expeditions, and accommodation through our services. By making a booking, you agree to these terms.</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-light text-ink">2. Bookings & Payments</h2>
            <p className="mt-3">All bookings are subject to availability. A booking is confirmed once we have received your deposit and sent a written confirmation. Full payment terms will be communicated at the time of booking. Prices are quoted in USD unless otherwise stated.</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-light text-ink">3. Cancellations</h2>
            <p className="mt-3">Day tours: Free cancellation up to 24 hours before the tour. Multi-day expeditions: Free cancellation up to 7 days before the start date. Late cancellations may incur a fee of up to 50% of the total price. No-shows are non-refundable. Accommodation cancellations are subject to the individual property&apos;s policy.</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-light text-ink">4. Changes & Modifications</h2>
            <p className="mt-3">We reserve the right to modify itineraries due to weather, safety concerns, or other circumstances beyond our control. In such cases, we will offer suitable alternatives or a full refund.</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-light text-ink">5. Liability</h2>
            <p className="mt-3">{siteConfig.name} acts as an agent and intermediary between you and third-party service providers. While we take great care in selecting our partners, we cannot be held liable for acts or omissions of third parties. We carry appropriate insurance and recommend that guests arrange comprehensive travel insurance.</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-light text-ink">6. Health & Safety</h2>
            <p className="mt-3">Guests are responsible for ensuring they are fit to participate in their chosen activities. Please inform us of any medical conditions, dietary requirements, or mobility needs at the time of booking. We reserve the right to refuse participation if we believe it may pose a safety risk.</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-light text-ink">7. Intellectual Property</h2>
            <p className="mt-3">All content on this website, including text, images, and design, is the property of {siteConfig.name} and may not be reproduced without written permission.</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-light text-ink">8. Contact</h2>
            <p className="mt-3">For questions about these terms, please contact us at <a href={`mailto:${siteConfig.contactEmail}`} className="text-teal underline underline-offset-2 transition-colors hover:text-teal-dark">{siteConfig.contactEmail}</a>.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
