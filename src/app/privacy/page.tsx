import type { Metadata } from 'next'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${siteConfig.name}. Learn how we collect, use, and protect your personal information.`,
}

export default function PrivacyPage() {
  return (
    <section className="bg-warmwhite pt-32 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

        <h1 className="font-heading text-3xl font-light tracking-tight text-ink sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted">Last updated: January 2025</p>

        <div className="mt-10 space-y-8 leading-relaxed text-ink/80">
          <div>
            <h2 className="font-heading text-xl font-light text-ink">1. Information We Collect</h2>
            <p className="mt-3">When you use our website or make an enquiry, we may collect your name, email address, phone number, country of residence, and details about your travel preferences. We collect this information when you voluntarily provide it through our contact forms, email, or WhatsApp communications.</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-light text-ink">2. How We Use Your Information</h2>
            <p className="mt-3">We use your personal information to respond to your enquiries, arrange tours and accommodation, communicate about your bookings, and improve our services. We do not sell, trade, or rent your personal information to third parties.</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-light text-ink">3. Data Storage & Security</h2>
            <p className="mt-3">Your data is stored securely and we take reasonable measures to protect it. We retain your information only for as long as necessary to provide our services and comply with legal obligations.</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-light text-ink">4. Cookies & Analytics</h2>
            <p className="mt-3">Our website may use cookies and analytics tools to understand how visitors use the site. These tools collect anonymous usage data. You can disable cookies in your browser settings at any time.</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-light text-ink">5. Third-Party Services</h2>
            <p className="mt-3">We may share your information with trusted third-party service providers (such as accommodation partners or transport providers) solely for the purpose of fulfilling your booking. These parties are obligated to protect your data.</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-light text-ink">6. Your Rights</h2>
            <p className="mt-3">You have the right to access, correct, or delete your personal data at any time. To exercise these rights, please contact us at {siteConfig.contactEmail}.</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-light text-ink">7. Contact</h2>
            <p className="mt-3">For any privacy-related questions, please contact us at <a href={`mailto:${siteConfig.contactEmail}`} className="text-teal underline underline-offset-2 transition-colors hover:text-teal-dark">{siteConfig.contactEmail}</a>.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
