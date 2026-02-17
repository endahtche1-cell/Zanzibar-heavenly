'use client'

import dynamic from 'next/dynamic'

const SmoothScroll = dynamic(() => import('./SmoothScroll'), { ssr: false })
const WhatsAppButton = dynamic(() => import('./WhatsAppButton'), { ssr: false })
const AnalyticsScript = dynamic(() => import('./AnalyticsScript'), { ssr: false })

export default function ClientProviders() {
  return (
    <>
      <SmoothScroll />
      <WhatsAppButton variant="floating" />
      <AnalyticsScript />
    </>
  )
}
