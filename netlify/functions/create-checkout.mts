import type { Handler } from '@netlify/functions'
import Stripe from 'stripe'
import { PRODUCTS, type ProductId } from '../../src/lib/products'

const allowedProductIds = new Set<ProductId>(['crypto-mastery'])

function json(statusCode: number, body: Record<string, string>) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed.' })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Missing STRIPE_SECRET_KEY.')
    return json(503, { error: 'Checkout is not configured yet. Please try again later.' })
  }

  try {
    const payload = JSON.parse(event.body || '{}') as { productId?: ProductId }
    const productId = payload.productId

    if (!productId || !allowedProductIds.has(productId)) {
      return json(400, { error: 'That product is not available for checkout.' })
    }

    const product = PRODUCTS[productId]
    const priceId = product.stripePriceEnv ? process.env[product.stripePriceEnv] : undefined

    if (!priceId) {
      console.error(`Missing ${product.stripePriceEnv} for ${productId}.`)
      return json(503, { error: 'Checkout is not configured yet. Please try again later.' })
    }

    const siteUrl = (process.env.URL || process.env.DEPLOY_PRIME_URL || 'http://localhost:8888').replace(/\/$/, '')
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/crypto-mastery/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/crypto-mastery`,
      metadata: {
        productId,
        delivery: 'secure-pdf-download',
      },
    })

    if (!session.url) {
      throw new Error('Stripe did not return a checkout URL.')
    }

    return json(200, { url: session.url })
  } catch (error) {
    console.error('Unable to create checkout session.', error)
    return json(500, { error: 'Unable to start checkout. Please try again.' })
  }
}
