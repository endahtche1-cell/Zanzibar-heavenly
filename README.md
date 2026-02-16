# Zanzibar Heavenly

A production-ready marketing website for **Zanzibar Heavenly** — a boutique tourism business offering Tours, Expeditions, and Accommodation on the island of Zanzibar.

Built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

---

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev        # → http://localhost:3000

# Production build
npm run build      # Builds + generates sitemap

# Preview production build
npm run start
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `SITE_URL` | Yes | Your production URL (used for sitemap, OG tags) |
| `CONTACT_EMAIL` | Yes | Where enquiry form submissions are sent |
| `RESEND_API_KEY` | No | [Resend](https://resend.com) API key for sending form emails |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics measurement ID |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Plausible Analytics domain |

### Email Delivery

The enquiry form sends emails via **Resend** (free tier: 3,000 emails/month). No extra npm packages needed.

1. Create a free account at [resend.com](https://resend.com)
2. Get your API key
3. Add `RESEND_API_KEY` and `CONTACT_EMAIL` to `.env.local`

In development mode, enquiries are also saved to `enquiries.json` in the project root for testing.

---

## Content Management

All content lives in **JSON files** under `/content/`. No CMS required — edit files directly.

### Adding a New Tour

1. Create a file: `content/tours/my-new-tour.json`
2. Use this template:

```json
{
  "title": "My New Tour",
  "slug": "my-new-tour",
  "heroImage": "/images/tours/my-new-tour.jpg",
  "galleryImages": ["/images/tours/my-new-tour-1.jpg"],
  "location": "Stone Town, Zanzibar",
  "duration": "Half day (4 hours)",
  "priceFrom": 65,
  "currency": "USD",
  "bestTimeToGo": "Year-round",
  "difficulty": "Easy",
  "groupSize": "2–12 guests",
  "highlights": ["Highlight 1", "Highlight 2"],
  "includes": ["Transport", "Guide", "Lunch"],
  "excludes": ["Travel insurance", "Tips"],
  "itinerary": [
    { "dayTitle": "The Experience", "dayBody": "Description of what happens..." }
  ],
  "whatToBring": ["Sunscreen", "Hat", "Comfortable shoes"],
  "pickupInfo": "Free hotel pickup in Stone Town area.",
  "cancellationPolicyShort": "Free cancellation up to 24 hours before.",
  "featured": false,
  "seo": {
    "title": "My New Tour | Zanzibar Heavenly",
    "description": "SEO description for this tour."
  },
  "content": "A paragraph describing the tour in detail."
}
```

3. Add the hero image to `public/images/tours/`
4. Rebuild (`npm run build`) or restart dev server

### Adding Accommodation

Same process — create a file in `content/accommodation/`. Key fields:

- `type`: `"hotel"`, `"villa"`, `"apartment"`, or `"resort"`
- `bedrooms`, `sleeps`, `amenities`, `nearby`, `houseRules`

### Adding a Guide Article

Create a file in `content/guides/`. Supports markdown in the `content` field (`## headings`, `- lists`, `**bold**`).

Use `relatedTours` to link to tour slugs (creates cross-links on the article page).

### Editing Content via GitHub

For non-technical owners:

1. Navigate to the file on GitHub (e.g., `content/tours/safari-blue.json`)
2. Click the pencil icon to edit
3. Make changes and commit
4. If deployed on Vercel, the site rebuilds automatically

---

## Project Structure

```
zanzibar-heavenly/
├── content/                    # Content JSON files
│   ├── tours/                  # 6 seeded tours
│   ├── expeditions/            # 3 seeded expeditions
│   ├── accommodation/          # 6 seeded properties
│   └── guides/                 # 6 seeded articles
├── public/images/              # Image assets (placeholders)
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── tours/[slug]/       # Tour detail pages
│   │   ├── expeditions/[slug]/ # Expedition detail pages
│   │   ├── accommodation/[slug]/ # Accommodation detail pages
│   │   ├── guide/[slug]/       # Guide article pages
│   │   ├── about/              # About page
│   │   ├── faq/                # FAQ page
│   │   ├── contact/            # Contact/booking page
│   │   ├── privacy/            # Privacy policy
│   │   ├── terms/              # Terms of service
│   │   └── api/enquiry/        # Enquiry form API route
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   ├── sections/           # HeroSection
│   │   └── ui/                 # Cards, Forms, WhatsApp, FAQ, etc.
│   ├── config/site.ts          # Site-wide configuration
│   └── lib/
│       ├── content.ts          # Content loading functions
│       ├── types.ts            # TypeScript types
│       ├── analytics.ts        # Analytics event tracking
│       └── utils.ts            # Helpers (formatPrice, cn, slugify)
├── next-sitemap.config.js      # Sitemap generation config
└── .env.example                # Environment variable template
```

## Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero, featured listings, testimonials, trust badges |
| Tours | `/tours` | All tours grid |
| Tour Detail | `/tours/[slug]` | Full tour info, itinerary, enquiry form |
| Expeditions | `/expeditions` | All expeditions grid |
| Expedition Detail | `/expeditions/[slug]` | Full expedition info |
| Accommodation | `/accommodation` | All properties grid |
| Accommodation Detail | `/accommodation/[slug]` | Full property info |
| Guide | `/guide` | All guide articles |
| Guide Article | `/guide/[slug]` | Article with related tours |
| About | `/about` | Company story, values, team |
| FAQ | `/faq` | Accordion FAQ |
| Contact | `/contact` | Full enquiry form + contact details |
| Privacy Policy | `/privacy` | Privacy policy template |
| Terms | `/terms` | Terms of service template |
| 404 | (auto) | Custom not-found page |

## Key Features

- **Static Site Generation** — All pages pre-rendered at build time
- **WhatsApp Integration** — Floating button + per-item enquiry links with prefilled messages
- **Enquiry Form** — Honeypot spam protection, rate limiting, email delivery via Resend
- **SEO** — Per-page metadata, OpenGraph, JSON-LD (Organization, TouristTrip, LodgingBusiness, BlogPosting)
- **Sitemap & Robots.txt** — Auto-generated via next-sitemap
- **Analytics Ready** — Google Analytics + Plausible placeholders (off by default)
- **Responsive** — Mobile-first design with sticky header, mobile nav
- **Accessible** — Skip link, semantic HTML, focus states, ARIA labels
- **Image Placeholders** — Gradient fallbacks when images aren't available

## Deployment (Vercel)

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy — Vercel auto-detects Next.js

Every push to `main` triggers a new build.

## Configuration

Edit `src/config/site.ts` to update:

- Business name, tagline
- WhatsApp number and phone
- Contact email
- Social media links
- Operating hours
- Navigation structure
- Default currency

## Launch Checklist

- [ ] Replace placeholder images in `/public/images/` with real photos
- [ ] Update WhatsApp number in `src/config/site.ts`
- [ ] Update contact email, phone, social links
- [ ] Set up Resend account and add API key
- [ ] Review and customize all content in `/content/`
- [ ] Update Privacy Policy and Terms with real business details
- [ ] Set `SITE_URL` to production domain
- [ ] Add favicon (replace `public/favicon.ico`)
- [ ] Connect Google Analytics or Plausible
- [ ] Test enquiry form end-to-end
- [ ] Test all pages on mobile
- [ ] Deploy to Vercel
- [ ] Set up custom domain
- [ ] Submit sitemap to Google Search Console

## License

Private. All rights reserved.
