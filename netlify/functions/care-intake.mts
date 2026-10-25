import type { Config } from '@netlify/functions'
import Stripe from 'stripe'
import { CARE_PRODUCT_ID, careEnabled, forwardToAppsScript, productId } from '../lib/care'

const FIELDS = ['family_name', 'loved_one_first_name', 'people_involved', 'caregivers', 'what_to_track', 'update_emails'] as const

// POST /api/care-intake {session_id, ...FIELDS}. Only accepts a completed Care checkout session.
export default async (req: Request) => {
  if (req.method !== 'POST') return Response.json({ ok: false }, { status: 405 })
  const body = (await req.json().catch(() => ({}))) as Record<string, string>
  const sessionId = String(body.session_id ?? '')
  if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) return Response.json({ ok: false, error: 'Missing checkout link. Please use the link in your welcome email.' }, { status: 400 })
  const fields: Record<string, string> = {}
  for (const k of FIELDS) fields[k] = String(body[k] ?? '').slice(0, 2000).trim()
  if (!fields.update_emails) return Response.json({ ok: false, error: 'Please add at least one email for weekly updates.' }, { status: 400 })
  const key = process.env.STRIPE_DELIVERY_SECRET_KEY || process.env.STRIPE_SECRET_KEY
  if (!key) return Response.json({ ok: false, error: 'Not available yet.' }, { status: 503 })
  const stripe = new Stripe(key)
  const s = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['line_items'] }).catch(() => null)
  const isCare = s?.line_items?.data.some((i) => productId(i.price as never) === CARE_PRODUCT_ID)
  if (!s || s.status !== 'complete' || !isCare) return Response.json({ ok: false, error: 'We could not find that Care order.' }, { status: 403 })
  if (!careEnabled()) return Response.json({ ok: true, staged: true })
  await forwardToAppsScript({ type: 'intake', session: s.id, email: s.customer_details?.email ?? '', fields })
  return Response.json({ ok: true })
}
export const config: Config = { path: '/api/care-intake' }
