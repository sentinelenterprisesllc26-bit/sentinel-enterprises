import type { Config } from '@netlify/functions'
import Stripe from 'stripe'
import { CARE_PRODUCT_ID, careEnabled, forwardToAppsScript, productId } from '../lib/care'

// Stripe webhook (STAGED): checkout.session.completed + customer.subscription.deleted, Care product only.
export default async (req: Request) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  const secret = process.env.STRIPE_CARE_WEBHOOK_SECRET
  const key = process.env.STRIPE_DELIVERY_SECRET_KEY || process.env.STRIPE_SECRET_KEY
  if (!secret || !key) return new Response('not configured', { status: 200 })
  const stripe = new Stripe(key)
  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(await req.text(), req.headers.get('stripe-signature') ?? '', secret)
  } catch {
    return new Response('bad signature', { status: 400 })
  }
  if (!careEnabled()) {
    console.log(`[care] disabled; ignoring ${event.type}`)
    return new Response('disabled', { status: 200 })
  }
  try {
    if (event.type === 'checkout.session.completed') {
      const s = event.data.object as Stripe.Checkout.Session
      const items = await stripe.checkout.sessions.listLineItems(s.id, { limit: 10 })
      if (!items.data.some((i) => productId(i.price as never) === CARE_PRODUCT_ID)) return new Response('not care', { status: 200 })
      const email = s.customer_details?.email
      if (!email) return new Response('no email', { status: 200 })
      await forwardToAppsScript({
        type: 'purchase', email, name: s.customer_details?.name ?? undefined,
        customer: typeof s.customer === 'string' ? s.customer : s.customer?.id,
        subscription: typeof s.subscription === 'string' ? s.subscription : s.subscription?.id,
        session: s.id, livemode: event.livemode,
      })
    } else if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object as Stripe.Subscription
      if (!sub.items.data.some((i) => productId(i.price as never) === CARE_PRODUCT_ID)) return new Response('not care', { status: 200 })
      await forwardToAppsScript({ type: 'cancel', subscription: sub.id, customer: typeof sub.customer === 'string' ? sub.customer : sub.customer.id })
    }
    return new Response('ok', { status: 200 })
  } catch (err) {
    console.error('[care] forward failed', err)
    return new Response('retry', { status: 500 }) // Stripe retries
  }
}
export const config: Config = { path: '/api/care-webhook' }
