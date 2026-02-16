export const siteConfig = {
  name: 'Zanzibar Heavenly',
  tagline: 'Bespoke Zanzibar tours, expeditions, and stays — curated with local love.',
  url: process.env.SITE_URL || 'https://zanzibarheavenly.com',
  contactEmail: 'info@zanzibarheavenly.com',
  whatsappNumber: '255777000000', // Replace with real number
  phone: '+255 777 000 000',
  currency: 'EUR' as const,
  location: {
    city: 'Stone Town',
    island: 'Zanzibar',
    country: 'Tanzania',
    full: 'Stone Town, Zanzibar, Tanzania',
  },
  hours: {
    weekdays: '8:00 AM – 6:00 PM (EAT)',
    weekends: '9:00 AM – 4:00 PM (EAT)',
    timezone: 'East Africa Time (UTC+3)',
  },
  social: {
    instagram: 'https://instagram.com/zanzibarheavenly',
    facebook: 'https://facebook.com/zanzibarheavenly',
    tripadvisor: 'https://tripadvisor.com/zanzibarheavenly',
    youtube: 'https://youtube.com/@zanzibarheavenly',
  },
  nav: [
    { label: 'Tours', href: '/tours' },
    { label: 'Expeditions', href: '/expeditions' },
    { label: 'Accommodation', href: '/accommodation' },
    { label: 'Guide', href: '/guide' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  footerNav: {
    explore: [
      { label: 'Tours', href: '/tours' },
      { label: 'Expeditions', href: '/expeditions' },
      { label: 'Accommodation', href: '/accommodation' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Zanzibar Guide', href: '/guide' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
} as const

export type SiteConfig = typeof siteConfig

export function getWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`
  }
  return base
}

export function getWhatsAppEnquiryUrl(itemName: string, type: string): string {
  const message = `Hi Zanzibar Heavenly! I'm interested in your ${type}: "${itemName}". Could you share more details about availability and pricing?`
  return getWhatsAppUrl(message)
}
