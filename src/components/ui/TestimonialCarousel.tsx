'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Testimonial } from '@/lib/types'

const testimonials: Testimonial[] = [
  {
    name: 'Sarah & James',
    country: 'United Kingdom',
    text: 'An absolutely magical experience. Our guide knew every hidden corner of Stone Town and the spice farm tour was unforgettable. Zanzibar Heavenly made our honeymoon truly special.',
    rating: 5,
    tour: 'Stone Town Walking Tour',
  },
  {
    name: 'Marco P.',
    country: 'Italy',
    text: 'The Safari Blue day trip was the highlight of our holiday. Crystal clear waters, fresh seafood lunch on a sandbank, and the most beautiful sunset from the dhow. Highly recommend!',
    rating: 5,
    tour: 'Safari Blue Day Trip',
  },
  {
    name: 'Aisha K.',
    country: 'Canada',
    text: 'We booked the island-hopping expedition and it exceeded all expectations. The team was professional, knowledgeable, and genuinely passionate about sharing their culture.',
    rating: 5,
    tour: 'Island Hopping Adventure',
  },
  {
    name: 'Thomas & Lisa',
    country: 'Germany',
    text: 'The accommodation they arranged was perfect — a beautiful villa right on the beach. The whole trip was seamless from start to finish. Will definitely return.',
    rating: 5,
    tour: 'Ocean Breeze Villa',
  },
  {
    name: 'Priya M.',
    country: 'India',
    text: 'What sets Zanzibar Heavenly apart is their personal touch. They tailored everything to our preferences and checked in throughout our stay. A truly premium service.',
    rating: 5,
  },
]

const variants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 20 : -20,
  }),
  center: {
    opacity: 1,
    y: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -20 : 20,
  }),
}

export default function TestimonialCarousel() {
  const [[current, direction], setCurrentState] = useState([0, 0])

  const setCurrent = useCallback((newIndex: number) => {
    setCurrentState(([prev]) => [newIndex, newIndex > prev ? 1 : -1])
  }, [])

  const next = () => setCurrent((current + 1) % testimonials.length)
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length)

  const t = testimonials[current]

  return (
    <section className="bg-warmwhite py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="text-center">
          {/* Stars */}
          <div className="flex justify-center gap-1.5">
            {[...Array(t.rating)].map((_, i) => (
              <svg key={i} className="h-4 w-4 text-saffron" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Quote */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="mt-10"
            >
              <p className="font-heading text-xl leading-relaxed text-ink/90 italic sm:text-2xl lg:text-[28px] lg:leading-[1.5]">
                &ldquo;{t.text}&rdquo;
              </p>
            </motion.blockquote>
          </AnimatePresence>

          {/* Attribution */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`attr-${current}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.05 }}
              className="mt-8"
            >
              <p className="text-[13px] tracking-[0.06em] text-ink-light">
                {t.name} &mdash; {t.country}
              </p>
              {t.tour && (
                <p className="mt-1.5 text-[12px] text-muted">
                  {t.tour}
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Dot Nav */}
          <div className="mt-12 flex items-center justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-6 bg-teal'
                    : 'w-2 bg-border hover:bg-subtle'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
