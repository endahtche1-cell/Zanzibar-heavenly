import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasResendKey: !!process.env.RESEND_API_KEY,
    hasContactEmail: !!process.env.CONTACT_EMAIL,
    contactEmail: process.env.CONTACT_EMAIL || 'NOT SET',
    resendKeyPrefix: process.env.RESEND_API_KEY?.slice(0, 6) || 'NOT SET',
  })
}
