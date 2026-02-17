import { NextRequest, NextResponse } from 'next/server'

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

function buildHtmlEmail(body: EnquiryPayload): string {
  const typeLabel: Record<string, string> = {
    general: 'General Enquiry',
    tour: 'Day Tour',
    expedition: 'Multi-Day Expedition',
    accommodation: 'Accommodation',
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f7f6f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <!-- Header -->
    <div style="background-color:#2f6f73;padding:32px;border-radius:12px 12px 0 0;text-align:center;">
      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:600;letter-spacing:0.5px;">New Enquiry</h1>
      <p style="margin:8px 0 0;color:#ffffff99;font-size:14px;">${typeLabel[body.interestedIn] || body.interestedIn}</p>
    </div>

    <!-- Body -->
    <div style="background-color:#ffffff;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e8e5de;border-top:none;">
      <!-- Guest info -->
      <h2 style="margin:0 0 16px;font-size:14px;text-transform:uppercase;letter-spacing:1.5px;color:#2f6f73;">Guest Details</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0eee8;color:#666;font-size:14px;width:140px;">Name</td>
          <td style="padding:10px 0;border-bottom:1px solid #f0eee8;color:#1a1a1a;font-size:14px;font-weight:500;">${body.fullName}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0eee8;color:#666;font-size:14px;">Email</td>
          <td style="padding:10px 0;border-bottom:1px solid #f0eee8;color:#1a1a1a;font-size:14px;">
            <a href="mailto:${body.email}" style="color:#2f6f73;text-decoration:none;">${body.email}</a>
          </td>
        </tr>
        ${body.phone ? `<tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0eee8;color:#666;font-size:14px;">Phone</td>
          <td style="padding:10px 0;border-bottom:1px solid #f0eee8;color:#1a1a1a;font-size:14px;">
            <a href="https://wa.me/${body.phone.replace(/[^0-9]/g, '')}" style="color:#2f6f73;text-decoration:none;">${body.phone}</a>
          </td>
        </tr>` : ''}
        ${body.country ? `<tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0eee8;color:#666;font-size:14px;">Country</td>
          <td style="padding:10px 0;border-bottom:1px solid #f0eee8;color:#1a1a1a;font-size:14px;">${body.country}</td>
        </tr>` : ''}
      </table>

      <!-- Trip info -->
      <h2 style="margin:0 0 16px;font-size:14px;text-transform:uppercase;letter-spacing:1.5px;color:#2f6f73;">Trip Details</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0eee8;color:#666;font-size:14px;width:140px;">Interest</td>
          <td style="padding:10px 0;border-bottom:1px solid #f0eee8;color:#1a1a1a;font-size:14px;font-weight:500;">${typeLabel[body.interestedIn] || body.interestedIn}</td>
        </tr>
        ${body.item ? `<tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0eee8;color:#666;font-size:14px;">Specific Item</td>
          <td style="padding:10px 0;border-bottom:1px solid #f0eee8;color:#1a1a1a;font-size:14px;">${body.item}</td>
        </tr>` : ''}
        ${body.dates ? `<tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0eee8;color:#666;font-size:14px;">Dates</td>
          <td style="padding:10px 0;border-bottom:1px solid #f0eee8;color:#1a1a1a;font-size:14px;">${body.dates}</td>
        </tr>` : ''}
        ${body.groupSize ? `<tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0eee8;color:#666;font-size:14px;">Group Size</td>
          <td style="padding:10px 0;border-bottom:1px solid #f0eee8;color:#1a1a1a;font-size:14px;">${body.groupSize}</td>
        </tr>` : ''}
      </table>

      <!-- Message -->
      ${body.message ? `
      <h2 style="margin:0 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:1.5px;color:#2f6f73;">Message</h2>
      <div style="background-color:#f7f6f2;padding:20px;border-radius:8px;margin-bottom:28px;">
        <p style="margin:0;color:#333;font-size:14px;line-height:1.6;white-space:pre-wrap;">${body.message}</p>
      </div>
      ` : ''}

      <!-- Quick reply button -->
      <div style="text-align:center;padding-top:8px;">
        <a href="mailto:${body.email}?subject=Re: Your Zanzibar Heavenly Enquiry&body=Hi ${body.fullName.split(' ')[0]},%0A%0AThank you for your enquiry!%0A%0A"
          style="display:inline-block;background-color:#2f6f73;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:14px;font-weight:500;letter-spacing:0.5px;">
          Reply to ${body.fullName.split(' ')[0]}
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:24px 0 0;">
      <p style="margin:0;color:#999;font-size:12px;">Zanzibar Heavenly — zanzibarheavenly.com</p>
    </div>
  </div>
</body>
</html>`
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

    // Build plain text fallback
    const textContent = [
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
      ``,
      `Message:`,
      body.message || '(No message)',
    ].join('\n')

    const contactEmail = process.env.CONTACT_EMAIL
    const resendKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

    if (resendKey && contactEmail) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: contactEmail,
          subject: `New Enquiry: ${body.interestedIn} — ${body.fullName}`,
          html: buildHtmlEmail(body),
          text: textContent,
          reply_to: body.email,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        console.error('Resend API error:', err)
        return NextResponse.json({ error: 'Failed to send email', details: err }, { status: 500 })
      }
    } else {
      console.warn('Resend not configured — set RESEND_API_KEY and CONTACT_EMAIL env vars')
      return NextResponse.json({ error: 'Email not configured' }, { status: 500 })
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
