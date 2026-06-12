import Stripe from 'stripe'
import type { Config, Context } from '@netlify/functions'
import { PRODUCTS, type ProductId } from '../../src/lib/products'

/*
 * ============================================================================
 *  STRIPE CHECKOUT  —  creates a hosted Checkout Session for one product
 * ============================================================================
 *  Called by <CheckoutButton> (src/lib/checkout.tsx). The browser POSTs a
 *  { productId }; this function looks the product up in the shared catalog
 *  (src/lib/products.ts), creates a one-time Stripe Checkout Session, and
 *  returns its hosted-payment URL for the browser to redirect to.
 *
 *  GOING LIVE — the only thing left to do:
 *    Add a STRIPE_SECRET_KEY environment variable in the Netlify UI
 *    (Site settings → Environment variables). Use a test key (sk_test_…)
 *    while testing, then the live key (sk_live_…) when ready to take real
 *    payments. No code changes are needed to switch between them.
 *
 *  Prices live in src/lib/products.ts, NOT here.
 * ============================================================================
 */

export default async (req: Request, _context: Context) => {
  const secretKey = Netlify.env.get('STRIPE_SECRET_KEY')
  if (!secretKey) {
    return Response.json(
      { error: 'Online payments are not set up yet. Please email us to complete your purchase.' },
      { status: 503 },
    )
  }

  // Guard against the most common setup mistake: pasting a *publishable* key
  // (pk_…) into STRIPE_SECRET_KEY. Checkout Sessions can ONLY be created with a
  // secret key (sk_live_… for real payments, sk_test_… for testing). Surfacing
  // this clearly in the logs saves a confusing round of "why won't it charge?".
  if (!secretKey.startsWith('sk_')) {
    console.error(
      'STRIPE_SECRET_KEY is set but is not a secret key. It must start with "sk_live_" ' +
        '(or "sk_test_" while testing). A publishable key (pk_…) will not work.',
    )
    return Response.json(
      { error: 'Online payments are not set up yet. Please email us to complete your purchase.' },
      { status: 503 },
    )
  }

  let productId: ProductId | undefined
  try {
    const body = (await req.json()) as { productId?: ProductId }
    productId = body.productId
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const product = productId ? PRODUCTS[productId] : undefined
  if (!product) {
    return Response.json({ error: 'Unknown product.' }, { status: 400 })
  }

  const origin = new URL(req.url).origin
  const stripe = new Stripe(secretKey)

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: product.currency,
            unit_amount: product.amountCents,
            product_data: {
              name: product.name,
              description: product.description,
            },
          },
        },
      ],
      // After payment, Stripe sends buyers to the thank-you page with the
      // session id so the order can be confirmed/looked up if needed later.
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: req.headers.get('referer') || `${origin}/guides`,
      metadata: { productId: product.id },
    })

    return Response.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout session error:', err)
    return Response.json({ error: 'Could not start checkout. Please try again.' }, { status: 502 })
  }
}

export const config: Config = {
  path: '/api/checkout',
  method: 'POST',
}
