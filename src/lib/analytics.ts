'use client'

type EventName =
  | 'whatsapp_click'
  | 'enquiry_submit'
  | 'cta_click'
  | 'tour_view'
  | 'expedition_view'
  | 'accommodation_view'

interface EventProps {
  [key: string]: string | number | boolean
}

export function trackEvent(name: EventName, props?: EventProps) {
  // Google Analytics
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as unknown as Record<string, Function>).gtag('event', name, props)
  }

  // Plausible
  if (typeof window !== 'undefined' && 'plausible' in window) {
    (window as unknown as Record<string, Function>).plausible(name, { props })
  }

  // Dev logging
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${name}`, props)
  }
}
