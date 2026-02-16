import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface EnquiryPayload {
  fullName: string
  email: string
  phone: string
  country: string
  interestedIn: string
  item: string
  dates: string
  groupSize: string
  budgetRange: string
  message: string
  honeypot?: string
}

// Simple rate limiter (in-memory, resets on restart)
const rateLimit = new Map<string, number[]>()
const RATE_LIMIT_WINDOW = 60_000 // 1 minute
const RATE_LIMIT_MAX = 5 // 5 requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = rateLimit.get(ip) || []
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW)
  rateLimit.set(ip, recent)

  if (recent.length >= RATE_LIMIT_MAX) return true
  recent.push(now)
  rateLimit.set(ip, recent)
  return false
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      )
    }

    const body: EnquiryPayload = await req.json()

    // Honeypot check
    if (body.honeypot) {
      // Silently accept but don't process (bot detected)
      return NextResponse.json({ success: true })
    }

    // Validation
    if (!body.fullName?.trim()) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
    }
    if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 })
    }

    // Build email content
    const emailContent = [
      `New enquiry from ${body.fullName}`,
      ``,
      `Name: ${body.fullName}`,
      `Email: ${body.email}`,
      `Phone: ${body.phone || 'Not provided'}`,
      `Country: ${body.country || 'Not provided'}`,
      `Interested in: ${body.interestedIn}`,
      `Item: ${body.item || 'Not specified'}`,
      `Dates: ${body.dates || 'Flexible'}`,
      `Group size: ${body.groupSize || 'Not specified'}`,
      `Budget: ${body.budgetRange || 'Not specified'}`,
      ``,
      `Message:`,
      body.message || '(No message)',
    ].join('\n')

    const contactEmail = process.env.CONTACT_EMAIL

    // Send via Resend API (recommended — no extra deps needed)
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey && contactEmail) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: 'Zanzibar Heavenly <noreply@zanzibarheavenly.com>',
            to: contactEmail,
            subject: `New Enquiry: ${body.interestedIn} — ${body.fullName}`,
            text: emailContent,
            reply_to: body.email,
          }),
        })
      } catch (resendError) {
        console.error('Resend send failed:', resendError)
      }
    }

    // Dev only: log to local file
    if (process.env.NODE_ENV === 'development') {
      const logPath = path.join(process.cwd(), 'enquiries.json')
      let existing: EnquiryPayload[] = []
      try {
        existing = JSON.parse(fs.readFileSync(logPath, 'utf-8'))
      } catch {
        // File doesn't exist yet
      }
      existing.push({ ...body, honeypot: undefined } as EnquiryPayload)
      fs.writeFileSync(logPath, JSON.stringify(existing, null, 2))
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Enquiry API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or contact us directly.' },
      { status: 500 }
    )
  }
}
