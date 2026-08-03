import type { Handler } from '@netlify/functions'
import Stripe from 'stripe'

function json(statusCode: number, body: Record<string, string>) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') return json(405, { error: 'Method not allowed.' })
  if (!process.env.STRIPE_SECRET_KEY) return json(503, { error: 'Download verification is not configured yet.' })

  const sessionId = event.queryStringParameters?.session_id
  if (!sessionId?.startsWith('cs_')) return json(400, { error: 'A valid purchase session is required.' })

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const isPurchasedCryptoMastery = session.payment_status === 'paid' && session.metadata?.productId === 'crypto-mastery'
    return isPurchasedCryptoMastery
      ? json(200, { status: 'verified' })
      : json(403, { error: 'This purchase does not include the Crypto Mastery download.' })
  } catch (error) {
    console.error('Unable to verify download.', error)
    return json(400, { error: 'We could not verify this purchase session.' })
  }
}
