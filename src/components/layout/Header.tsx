'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '@/config/site'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-warmwhite/95 backdrop-blur-md shadow-sm'
            : 'bg-warmwhite/80 backdrop-blur-sm'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-10" aria-label="Main navigation">
          <div className="flex h-16 items-center justify-between lg:h-[72px]">
            <Link
              href="/"
              className="relative z-10 flex items-center gap-2.5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image
                src="/images/logo.png"
                alt="Zanzibar Heavenly"
                width={44}
                height={44}
                className="h-9 w-9 lg:h-11 lg:w-11 object-contain"
                priority
              />
              <span className="font-heading text-xl text-ink lg:text-2xl">
                Zanzibar
                <span className="text-teal"> Heavenly</span>
              </span>
            </Link>

            <div className="hidden lg:flex lg:items-center lg:gap-8">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-[13px] tracking-[0.04em] text-ink-light transition-colors duration-300 hover:text-ink after:absolute after:bottom-[-4px] after:left-0 after:h-[1.5px] after:w-0 after:bg-teal after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="ml-2 rounded-full bg-teal px-6 py-2 text-[13px] tracking-[0.04em] text-white transition-all duration-300 hover:bg-teal-dark hover:shadow-md"
              >
                Enquire
              </Link>
            </div>

            <button
              type="button"
              className="relative z-10 lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="flex flex-col gap-1.5 w-6">
                <span className={`block h-[1.5px] rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[4px] bg-ink' : 'bg-ink'}`} />
                <span className={`block h-[1.5px] rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[4px] bg-ink' : 'bg-ink'}`} />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-warmwhite flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {siteConfig.nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg text-ink-light transition-colors hover:text-teal"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-4"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-full bg-teal px-8 py-3 text-[15px] tracking-[0.04em] text-white transition-all hover:bg-teal-dark"
                >
                  Enquire
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
