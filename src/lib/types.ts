export interface SEO {
  title: string
  description: string
}

export interface ItineraryDay {
  dayTitle: string
  dayBody: string
}

export interface TourFrontmatter {
  title: string
  slug: string
  heroImage: string
  galleryImages: string[]
  location: string
  duration: string
  priceFrom: number
  currency: 'USD' | 'GBP' | 'EUR'
  bestTimeToGo: string
  difficulty: 'Easy' | 'Moderate' | 'Challenging'
  groupSize: string
  highlights: string[]
  includes: string[]
  excludes: string[]
  itinerary: ItineraryDay[]
  whatToBring: string[]
  pickupInfo: string
  cancellationPolicyShort: string
  featured: boolean
  seo: SEO
}

export interface Tour extends TourFrontmatter {
  content: string
}

export interface ExpeditionFrontmatter extends TourFrontmatter {
  // Expeditions share the same structure as tours
}

export interface Expedition extends ExpeditionFrontmatter {
  content: string
}

export interface AccommodationFrontmatter {
  title: string
  slug: string
  heroImage: string
  galleryImages: string[]
  area: string
  type: 'hotel' | 'villa' | 'apartment' | 'resort'
  bedrooms?: number
  sleeps: number
  priceFrom: number
  currency: 'USD' | 'GBP' | 'EUR'
  amenities: string[]
  nearby: string[]
  houseRules: string[]
  bookingNotes: string
  featured: boolean
  seo: SEO
}

export interface Accommodation extends AccommodationFrontmatter {
  content: string
}

export interface GuideFrontmatter {
  title: string
  slug: string
  date: string
  category: string
  heroImage: string
  excerpt: string
  relatedTours?: string[]
  seo: SEO
}

export interface Guide extends GuideFrontmatter {
  content: string
}

export interface Testimonial {
  name: string
  country: string
  text: string
  rating: number
  tour?: string
}

export interface FAQItem {
  question: string
  answer: string
  category: string
}

export interface EnquiryFormData {
  fullName: string
  email: string
  phone: string
  country: string
  interestedIn: 'tour' | 'expedition' | 'accommodation' | 'general'
  item: string
  dates: string
  groupSize: string
  budgetRange: string
  message: string
  honeypot?: string
}
