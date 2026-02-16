'use client'

import { useState } from 'react'
import type { FAQItem } from '@/lib/types'

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div>
      {items.map((item, i) => (
        <div key={i}>
          {/* Divider */}
          <div className="h-px bg-border" />

          <button
            type="button"
            className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span
              className={`font-heading text-[17px] transition-colors duration-200 ${
                openIndex === i ? 'text-ink' : 'text-ink-light'
              }`}
            >
              {item.question}
            </span>
            <svg
              className={`h-4 w-4 flex-shrink-0 text-subtle transition-transform duration-300 ${
                openIndex === i ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {/* Expandable content */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === i ? 'max-h-96 pb-6' : 'max-h-0'
            }`}
          >
            <p className="text-[15px] leading-relaxed text-muted">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
      {/* Bottom divider */}
      <div className="h-px bg-border" />
    </div>
  )
}
