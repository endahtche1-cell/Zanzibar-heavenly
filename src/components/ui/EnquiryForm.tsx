'use client'

import { useState, useRef } from 'react'
import { trackEvent } from '@/lib/analytics'
import type { EnquiryFormData } from '@/lib/types'

interface EnquiryFormProps {
  preselectedType?: string
  preselectedItem?: string
  items?: { label: string; value: string; type: string }[]
  compact?: boolean
}

const initialForm: EnquiryFormData = {
  fullName: '',
  email: '',
  phone: '',
  country: '',
  interestedIn: 'general',
  item: '',
  dates: '',
  groupSize: '',
  budgetRange: '',
  message: '',
}

function NumberStepper({ label, value, onChange, min = 0, suffix }: { label: string; value: number; onChange: (v: number) => void; min?: number; suffix?: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-white px-4 py-3">
      <span className="text-[15px] text-muted">
        {label} {suffix && <span className="text-xs text-subtle">{suffix}</span>}
      </span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-teal hover:text-teal"
          aria-label={`Decrease ${label}`}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" d="M5 12h14" /></svg>
        </button>
        <span className="w-6 text-center text-[15px] font-medium text-ink">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-teal hover:text-teal"
          aria-label={`Increase ${label}`}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" d="M12 5v14m-7-7h14" /></svg>
        </button>
      </div>
    </div>
  )
}

const inputClasses =
  'block w-full rounded-lg border border-border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-subtle/50 transition-colors duration-200 focus:border-teal focus:ring-1 focus:ring-teal/20 focus:outline-none'

const selectClasses =
  'block w-full rounded-lg border border-border bg-white px-4 py-3 text-[15px] text-ink transition-colors duration-200 focus:border-teal focus:ring-1 focus:ring-teal/20 focus:outline-none appearance-none cursor-pointer'

export default function EnquiryForm({ preselectedType, preselectedItem, items = [], compact = false }: EnquiryFormProps) {
  const [form, setForm] = useState<EnquiryFormData>({
    ...initialForm,
    interestedIn: (preselectedType as EnquiryFormData['interestedIn']) || 'general',
    item: preselectedItem || '',
  })
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const honeypotRef = useRef<HTMLInputElement>(null)
  const lastSubmitRef = useRef<number>(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (honeypotRef.current?.value) return

    const now = Date.now()
    if (now - lastSubmitRef.current < 10000) {
      setErrorMsg('Please wait a moment before submitting again.')
      return
    }

    if (!form.fullName.trim() || !form.email.trim()) {
      setErrorMsg('Please fill in your name and email.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrorMsg('Please enter a valid email address.')
      return
    }

    setStatus('submitting')
    lastSubmitRef.current = now

    const submitData = {
      ...form,
      groupSize: `${adults} adults${children > 0 ? `, ${children} children` : ''}`,
      honeypot: honeypotRef.current?.value,
    }

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      setStatus('success')
      trackEvent('enquiry_submit', { type: form.interestedIn, item: form.item })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-sand p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal/10">
          <svg className="h-7 w-7 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="mt-5 font-heading text-2xl font-medium text-ink">Enquiry Sent</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Thank you for your interest. Our team will get back to you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} id="enquiry-form">
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input ref={honeypotRef} type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Section 1: Your Trip */}
      <div className="space-y-6">
        <h3 className="font-heading text-xl font-medium text-teal">Your Trip</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="interestedIn" className="sr-only">Destination / Interest</label>
            <select
              id="interestedIn"
              name="interestedIn"
              value={form.interestedIn}
              onChange={handleChange}
              className={selectClasses}
            >
              <option value="general">What are you interested in? *</option>
              <option value="tour">Day Tour</option>
              <option value="expedition">Multi-Day Expedition</option>
              <option value="accommodation">Accommodation</option>
            </select>
          </div>

          <div>
            <label htmlFor="dates" className="sr-only">Departure date</label>
            <input
              type="date"
              id="dates"
              name="dates"
              value={form.dates}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Departure date *"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <NumberStepper
            label="Adults"
            value={adults}
            onChange={setAdults}
            min={1}
          />
          <NumberStepper
            label="Children"
            value={children}
            onChange={setChildren}
            suffix="(under 12)"
          />
        </div>

        {items.length > 0 && (
          <div>
            <label htmlFor="item" className="sr-only">Specific tour or experience</label>
            <select
              id="item"
              name="item"
              value={form.item}
              onChange={handleChange}
              className={selectClasses}
            >
              <option value="">Select a specific tour or experience</option>
              {items.map((it) => (
                <option key={it.value} value={it.value}>{it.label}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="message" className="sr-only">Tell us about your trip</label>
          <textarea
            id="message"
            name="message"
            rows={compact ? 3 : 4}
            value={form.message}
            onChange={handleChange}
            className={`${inputClasses} resize-none`}
            placeholder="Tell us more about your trip (likes, dislikes, must-haves...)"
          />
        </div>
      </div>

      {/* Section 2: Your Contact Information */}
      <div className="mt-10 space-y-6">
        <h3 className="font-heading text-xl font-medium text-teal">Your Contact Information</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="sr-only">Full name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={form.fullName}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Full name *"
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Email address *"
            />
          </div>

          <div>
            <label htmlFor="phone" className="sr-only">Phone / WhatsApp</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Phone / WhatsApp"
            />
          </div>

          <div>
            <label htmlFor="country" className="sr-only">Country of residence</label>
            <input
              type="text"
              id="country"
              name="country"
              value={form.country}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Country of residence"
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {errorMsg && (
        <p className="mt-6 rounded-lg bg-error/5 px-4 py-3 text-[14px] text-error" role="alert">{errorMsg}</p>
      )}

      {/* Submit */}
      <div className="mt-10">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full rounded-lg bg-teal px-10 py-4 text-[15px] font-medium tracking-wide text-white transition-all duration-300 hover:bg-teal-dark hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed sm:w-auto"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Enquiry'}
        </button>
      </div>
    </form>
  )
}
