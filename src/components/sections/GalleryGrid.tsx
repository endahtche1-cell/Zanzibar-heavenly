'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from '@/components/ui/Motion'

interface GalleryImage {
  src: string
  alt: string
  caption: string
  category: string
  aspect: 'landscape' | 'portrait' | 'square'
}

const galleryImages: GalleryImage[] = [
  {
    src: '/images/web%20imagee.jpeg',
    alt: 'Aerial view of a traditional dhow boat in crystal clear turquoise water',
    caption: 'Dhow sailing in the crystal waters of Zanzibar',
    category: 'Ocean',
    aspect: 'portrait',
  },
  {
    src: '/images/5.jpeg',
    alt: 'Stunning sunset over the Indian Ocean with dhow boat silhouette',
    caption: 'Golden sunset over the Indian Ocean',
    category: 'Scenery',
    aspect: 'landscape',
  },
  {
    src: '/images/iamge%203.jpeg',
    alt: 'Group of friends enjoying a beach day on Zanzibar white sand',
    caption: 'Beach vibes on Zanzibar\'s pristine shores',
    category: 'Experiences',
    aspect: 'portrait',
  },
  {
    src: '/images/fish.jpeg',
    alt: 'Colourful tropical fish swimming in turquoise reef waters',
    caption: 'Tropical reef life beneath the surface',
    category: 'Ocean',
    aspect: 'landscape',
  },
  {
    src: '/images/the%20team.jpeg',
    alt: 'The Zanzibar Heavenly team in branded white polo shirts',
    caption: 'Meet the Zanzibar Heavenly team',
    category: 'Team',
    aspect: 'landscape',
  },
  {
    src: '/images/horses%20and%20sea.jpeg',
    alt: 'Horse riding through the turquoise shallows of Zanzibar',
    caption: 'Horse riding through the shallows',
    category: 'Experiences',
    aspect: 'landscape',
  },
  {
    src: '/images/turtle.jpeg',
    alt: 'Giant Aldabra tortoise on Prison Island',
    caption: 'Giant tortoise encounter on Prison Island',
    category: 'Wildlife',
    aspect: 'portrait',
  },
  {
    src: '/images/image2.jpeg',
    alt: 'Guests on a spice farm tour wearing flower crowns',
    caption: 'Spice farm tour with the freshest flower crowns',
    category: 'Experiences',
    aspect: 'portrait',
  },
  {
    src: '/images/w.jpeg',
    alt: 'Jet skiing on turquoise Zanzibar waters',
    caption: 'Jet ski thrills on the Indian Ocean',
    category: 'Experiences',
    aspect: 'square',
  },
  {
    src: '/images/sea.jpeg',
    alt: 'Swimming in a natural cave with crystal clear water',
    caption: 'Hidden cave swimming — a secret paradise',
    category: 'Ocean',
    aspect: 'portrait',
  },
  {
    src: '/images/images.jpeg',
    alt: 'Group of guests waving from a traditional dhow boat',
    caption: 'All aboard the dhow — island hopping adventures',
    category: 'Experiences',
    aspect: 'landscape',
  },
  {
    src: '/images/fun.jpeg',
    alt: 'Quad biking on a white sand beach in Zanzibar',
    caption: 'Quad biking on Zanzibar\'s white sand beaches',
    category: 'Experiences',
    aspect: 'landscape',
  },
  {
    src: '/images/WhatsApp%20Image%202026-02-11%20at%2008.41.34.jpeg',
    alt: 'Colourful tropical fruit platter with pineapple, watermelon, passion fruit and bananas',
    caption: 'Fresh tropical fruit — taste of the island',
    category: 'Food',
    aspect: 'portrait',
  },
  {
    src: '/images/people%20on%20tour.jpeg',
    alt: 'Family enjoying a guided spice tour with handmade flower crowns',
    caption: 'Family moments on the spice tour',
    category: 'Experiences',
    aspect: 'portrait',
  },
  {
    src: '/images/3.jpeg',
    alt: 'Children enjoying a fruit platter on a sandbank in turquoise water',
    caption: 'Sandbank picnic — pure paradise',
    category: 'Experiences',
    aspect: 'landscape',
  },
  {
    src: '/images/WhatsApp%20Image%202026-02-11%20at%2008.41.36.jpeg',
    alt: 'Sea turtles swimming at Baraka Natural Aquarium',
    caption: 'Sea turtles at Baraka Natural Aquarium',
    category: 'Wildlife',
    aspect: 'portrait',
  },
]

const categories = ['All', ...Array.from(new Set(galleryImages.map((img) => img.category)))]

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered =
    activeCategory === 'All' ? galleryImages : galleryImages.filter((img) => img.category === activeCategory)

  const openLightbox = (index: number) => setLightbox(index)
  const closeLightbox = () => setLightbox(null)

  const goNext = () => {
    if (lightbox === null) return
    setLightbox((lightbox + 1) % filtered.length)
  }

  const goPrev = () => {
    if (lightbox === null) return
    setLightbox((lightbox - 1 + filtered.length) % filtered.length)
  }

  return (
    <>
      {/* Category filter */}
      <FadeIn>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-[13px] font-medium tracking-wide transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-teal text-white shadow-sm'
                  : 'bg-sand text-muted hover:bg-teal/10 hover:text-teal'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Masonry-style grid */}
      <motion.div layout className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((image, index) => (
            <motion.div
              key={image.src}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="group mb-4 cursor-pointer break-inside-avoid overflow-hidden rounded-xl"
              onClick={() => openLightbox(index)}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.aspect === 'portrait' ? 600 : image.aspect === 'square' ? 600 : 800}
                  height={image.aspect === 'portrait' ? 800 : image.aspect === 'square' ? 600 : 530}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="w-full p-5">
                    <p className="text-[13px] font-medium text-white">{image.caption}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-white/60">{image.category}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-muted">No images in this category yet.</p>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close lightbox"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goPrev()
              }}
              className="absolute left-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Previous image"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goNext()
              }}
              className="absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Next image"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={filtered[lightbox].src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[85vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightbox].src}
                alt={filtered[lightbox].alt}
                width={1200}
                height={900}
                className="max-h-[85vh] w-auto rounded-lg object-contain"
                sizes="90vw"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-ink/80 to-transparent px-6 pb-5 pt-12">
                <p className="text-[15px] font-medium text-white">{filtered[lightbox].caption}</p>
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[13px] text-white/50">
              {lightbox + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
