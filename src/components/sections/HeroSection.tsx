'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

interface HeroSectionProps {
  title: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  secondaryCta?: { text: string; href: string }
  image?: string
  compact?: boolean
}

export default function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaHref,
  secondaryCta,
  image = 'https://images.unsplash.com/photo-1627899316467-d9e61aa54f98?w=1920&q=80',
  compact = false,
}: HeroSectionProps) {
  return (
    <section className={`relative flex items-end overflow-hidden ${compact ? 'min-h-[50vh]' : 'min-h-screen'}`}>
      {/* Background image with zoom-in */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <ImagePlaceholder src={image} alt="" fill priority className="object-cover" />
        {/* Bright warm overlay instead of dark */}
        <div className="absolute inset-0 bg-gradient-to-t from-warmwhite via-warmwhite/40 to-transparent" />
        <div className="absolute inset-0 bg-warmwhite/10" />
      </motion.div>

      {/* Decorative accent shapes */}
      {!compact && (
        <>
          <div className="accent-shape absolute -top-20 -right-20 h-64 w-64 bg-teal" />
          <div className="accent-shape absolute bottom-32 -left-16 h-40 w-40 bg-coral" />
          <div className="accent-shape absolute top-1/3 right-1/4 h-24 w-24 bg-saffron" />
        </>
      )}

      <div className={`relative z-10 w-full ${compact ? 'pb-14 pt-32' : 'pb-24 pt-40 lg:pb-32'}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className={`font-heading font-normal leading-[1.1] tracking-[-0.02em] text-ink ${
                compact ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-4xl sm:text-5xl lg:text-7xl'
              }`}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="mt-6 max-w-xl text-base leading-relaxed text-ink-light/70 lg:text-lg lg:mt-8"
              >
                {subtitle}
              </motion.p>
            )}
            {(ctaText || secondaryCta) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                className="mt-10 flex flex-wrap items-center gap-5 lg:mt-12"
              >
                {ctaText && ctaHref && (
                  <Link
                    href={ctaHref}
                    className="group inline-flex items-center gap-3 rounded-full bg-teal px-8 py-3.5 text-[14px] tracking-[0.02em] text-white transition-all duration-400 hover:bg-teal-dark hover:shadow-lg"
                  >
                    {ctaText}
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </Link>
                )}
                {secondaryCta && (
                  <Link href={secondaryCta.href} className="text-[14px] tracking-[0.02em] text-ink-light/60 transition-colors duration-300 hover:text-ink">
                    {secondaryCta.text}
                  </Link>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {!compact && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-12 bg-gradient-to-b from-transparent via-ink/20 to-transparent"
          />
        </motion.div>
      )}
    </section>
  )
}
