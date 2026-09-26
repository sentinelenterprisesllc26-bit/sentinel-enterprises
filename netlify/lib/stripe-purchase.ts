import Stripe from 'stripe'
import { evaluateSession, isCheckoutSessionId, type AccessResult, type SessionLike } from '../../src/lib/purchase-access'

export const EXPECTED_STRIPE_ACCOUNT = 'acct_1SyKpPEPXDHjPrap'

export type LookupResult =
  | { kind: 'access'; session: SessionLike | null; access: AccessResult }
  | { kind: 'error'; status: number; body: Record<string, unknown> }

let cachedKeyAccount: string | null | undefined

type StripeLike = Pick<Stripe, 'checkout' | 'accounts'>
let makeStripe: (key: string) => StripeLike = (key) => new Stripe(key)
/** Test hook only — lets tests/functions.test.ts inject a fake Stripe client. */
export function __setStripeFactoryForTests(f: (key: string) => StripeLike) {
  makeStripe = f
  cachedKeyAccount = undefined
}

/** Which Stripe account does the delivery key belong to? Never logs the key. */
async function keyAccount(stripe: StripeLike): Promise<string | null> {
  if (cachedKeyAccount !== undefined) return cachedKeyAccount
  try {
    const acct = await stripe.accounts.retrieveCurrent()
    cachedKeyAccount = acct.id
  } catch (err) {
    console.error('[stripe-purchase] accounts.retrieve failed:', (err as { code?: string })?.code ?? 'unknown')
    cachedKeyAccount = null
  }
  console.log(`[stripe-purchase] ${deliveryStripeKeySource()} account: ${cachedKeyAccount ?? 'unknown'} (expected ${EXPECTED_STRIPE_ACCOUNT})`)
  return cachedKeyAccount
}

/**
 * Key used for paid-file delivery. Prefer STRIPE_DELIVERY_SECRET_KEY (a restricted key for
 * acct_1SyKpPEPXDHjPrap); fall back to STRIPE_SECRET_KEY only if it's missing, so the
 * Crypto Mastery functions (which use STRIPE_SECRET_KEY) stay untouched.
 */
export function deliveryStripeKey(): string | undefined {
  const delivery = process.env.STRIPE_DELIVERY_SECRET_KEY?.trim()
  if (delivery) return delivery
  const fallback = process.env.STRIPE_SECRET_KEY?.trim()
  return fallback || undefined
}

export function deliveryStripeKeySource(): 'STRIPE_DELIVERY_SECRET_KEY' | 'STRIPE_SECRET_KEY' | 'none' {
  if (process.env.STRIPE_DELIVERY_SECRET_KEY?.trim()) return 'STRIPE_DELIVERY_SECRET_KEY'
  if (process.env.STRIPE_SECRET_KEY?.trim()) return 'STRIPE_SECRET_KEY'
  return 'none'
}

export async function lookupPurchase(sessionId: string | null): Promise<LookupResult> {
  if (!isCheckoutSessionId(sessionId)) {
    return { kind: 'error', status: 400, body: { ok: false, error: 'A valid purchase session is required.' } }
  }
  const key = deliveryStripeKey()
  if (!key) {
    return { kind: 'error', status: 503, body: { ok: false, error: 'Purchase verification is not configured.', code: 'not_configured' } }
  }
  const stripe = makeStripe(key)
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['line_items.data.price.product'] })
    return { kind: 'access', session: session as unknown as SessionLike, access: evaluateSession(session as unknown as SessionLike) }
  } catch (err) {
    const code = (err as { code?: string })?.code
    if (code === 'resource_missing') {
      const acct = await keyAccount(stripe)
      if (acct && acct !== EXPECTED_STRIPE_ACCOUNT) {
        console.error(`[stripe-purchase] Session lookup failed: ${deliveryStripeKeySource()} is for ${acct}, not ${EXPECTED_STRIPE_ACCOUNT}. Set STRIPE_DELIVERY_SECRET_KEY to a restricted key for ${EXPECTED_STRIPE_ACCOUNT} in Netlify env.`)
        return {
          kind: 'error',
          status: 503,
          body: { ok: false, error: 'Purchase verification is temporarily unavailable.', code: 'stripe_account_mismatch' },
        }
      }
      return { kind: 'access', session: null, access: { ok: false, status: 403, reason: 'Purchase not found.' } }
    }
    console.error('[stripe-purchase] Session lookup error:', code ?? (err as Error)?.message)
    return { kind: 'error', status: 502, body: { ok: false, error: 'We could not verify this purchase right now.' } }
  }
}

export function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'private, no-store' },
  })
}
