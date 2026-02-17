import type { Metadata } from 'next'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import FAQAccordion from '@/components/ui/FAQAccordion'
import Link from 'next/link'
import type { FAQItem } from '@/lib/types'
import { FadeIn } from '@/components/ui/Motion'
import { FAQPageJsonLd } from '@/components/ui/JsonLd'

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions',
  description: 'Answers to common questions about Zanzibar tours, expeditions, accommodation, payments, cancellations, and travel tips.',
  openGraph: {
    title: 'FAQ — Frequently Asked Questions | Zanzibar Heavenly',
    description: 'Answers to common questions about Zanzibar tours, expeditions, accommodation, payments, cancellations, and travel tips.',
  },
}

const faqItems: FAQItem[] = [
  {
    question: 'How do I book a tour or accommodation?',
    answer: 'You can enquire through our website contact form, via WhatsApp, or by email. Once we receive your enquiry, our team will respond within 24 hours with availability, pricing, and a suggested itinerary tailored to your preferences.',
    category: 'Booking',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept bank transfers, major credit cards, and mobile payment options. A deposit is typically required to confirm your booking, with the balance due before or upon arrival. We will share full payment details once your booking is confirmed.',
    category: 'Booking',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Day tours can be cancelled free of charge up to 24 hours before the scheduled start time. Multi-day expeditions require at least 7 days notice for a full refund. Accommodation cancellation policies vary by property — we will confirm the specific terms when you book.',
    category: 'Booking',
  },
  {
    question: 'Do I need a visa to visit Zanzibar?',
    answer: 'Most nationalities can obtain a visa on arrival at Zanzibar airport or at the seaport. We recommend checking the latest visa requirements for your nationality before travelling. Our team can also help advise on entry requirements.',
    category: 'Travel',
  },
  {
    question: 'When is the best time to visit Zanzibar?',
    answer: 'Zanzibar is wonderful year-round, but the best weather is typically from June to October (dry season) and December to February (short dry season). March to May sees the long rains. The best time depends on what you want to do — contact us for personalised advice.',
    category: 'Travel',
  },
  {
    question: 'Is Zanzibar safe for tourists?',
    answer: 'Yes, Zanzibar is generally very safe for tourists. As with any destination, we recommend common-sense precautions. Our guides are trained in safety protocols, and we always ensure our guests are well looked after throughout their experience.',
    category: 'Travel',
  },
  {
    question: 'Are your tours suitable for children?',
    answer: 'Many of our tours are family-friendly and we love welcoming children. We can adapt itineraries to suit different ages and energy levels. Some activities have minimum age requirements for safety — just let us know the ages of your group and we will recommend the best options.',
    category: 'Tours',
  },
  {
    question: 'Can tours be customised?',
    answer: 'Absolutely! Customisation is at the heart of what we do. Whether you want to combine multiple experiences, adjust the pace, add special requests, or create a completely bespoke itinerary, our team will work with you to make it happen.',
    category: 'Tours',
  },
  {
    question: 'What should I pack for Zanzibar?',
    answer: 'Light, breathable clothing is essential. We recommend modest dress when visiting Stone Town and villages (shoulders and knees covered). Bring reef-safe sunscreen, a hat, comfortable walking shoes, and swimwear. Check our Zanzibar Guide for a detailed packing list.',
    category: 'Travel',
  },
  {
    question: 'Do you provide airport transfers?',
    answer: 'Yes, we can arrange airport transfers to and from your accommodation. This can be booked separately or included as part of a tour package. Let us know your flight details and we will have a driver ready for you.',
    category: 'Tours',
  },
]

export default function FAQPage() {
  return (
    <>
      <FAQPageJsonLd items={faqItems} />
      <section className="bg-sand py-24 pt-32">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-teal">Support</p>
          <h1 className="mt-4 font-heading text-3xl font-light text-ink sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-muted">
            Everything you need to know about travelling with Zanzibar Heavenly.
          </p>
        </div>
      </section>

      <section className="bg-warmwhite py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'FAQ' }]} currentPath="/faq" />

          <FadeIn>
            <FAQAccordion items={faqItems} />
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-16 bg-white p-10 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-teal">Need More Help?</p>
              <h2 className="mt-3 font-heading text-xl font-light text-ink">Still have questions?</h2>
              <p className="mt-2 text-sm text-muted">Our team is happy to help with anything you need.</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link href="/contact" className="rounded-full bg-teal px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-teal-dark">
                  Contact Us
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
