/**
 * Click tracking for the current Stripe checkout buttons.
 * Events are clicks only. They are not purchases, revenue, or completed payments.
 * The existing GA4 tag in src/routes/__root.tsx (G-Q6SKVDVTMJ) receives them.
 *
 * These are the live Payment Links. The bundle link is the $17.99 Complete
 * Protection Bundle. Do not point this at a retired link.
 */

const BUNDLE_CHECKOUT_URL = 'https://buy.stripe.com/5kQ4gzc1j6RE2VfapHdIA0b'
const RIPPLE_BOOK_CHECKOUT_URL = 'https://buy.stripe.com/7sY5kDaXf2Bo3Zj55ndIA0c'
const PACK_CHECKOUT_URL = 'https://buy.stripe.com/dRmaEXghzfoa2VfgO5dIA09'
const CARE_CHECKOUT_URL = 'https://buy.stripe.com/eVq28rghzek67bvfK1dIA0a'
const PAYPAL_CHECKOUT_URL = 'https://paypal.me/JenaeWiley'

const PRODUCT_OFFERS: Record<string, 'complete-protection-bundle' | 'ripple-effect-book' | 'protection-ripple-pack'> = {
  [BUNDLE_CHECKOUT_URL]: 'complete-protection-bundle',
  [RIPPLE_BOOK_CHECKOUT_URL]: 'ripple-effect-book',
  [PACK_CHECKOUT_URL]: 'protection-ripple-pack',
}

export type OfferClick =
  | {
      event: 'product_checkout_click'
      product_id: 'complete-protection-bundle' | 'ripple-effect-book' | 'protection-ripple-pack'
      placement: string
    }
  | {
      event: 'service_checkout_click'
      service_id: 'sentinel-care' | 'paypal'
      placement: string
    }

export function offerFromCheckoutHref(href: string, placement = 'unknown'): OfferClick | null {
  let url: URL
  try {
    url = new URL(href, 'https://sentinelenterprisesllc.com')
  } catch {
    return null
  }
  if (url.protocol !== 'https:') return null
  const bare = `${url.origin}${url.pathname}`.replace(/\/$/, '')
  const place = placement || 'unknown'
  if (url.hostname === 'buy.stripe.com') {
    const productId = PRODUCT_OFFERS[bare]
    if (productId) return { event: 'product_checkout_click', product_id: productId, placement: place }
    if (bare === CARE_CHECKOUT_URL) return { event: 'service_checkout_click', service_id: 'sentinel-care', placement: place }
    return null
  }
  if (bare === PAYPAL_CHECKOUT_URL) return { event: 'service_checkout_click', service_id: 'paypal', placement: place }
  return null
}

export function analyticsAllowed(doNotTrack: string | null | undefined): boolean {
  return doNotTrack !== '1'
}

function placementFromLocation(): string {
  const path = typeof window !== 'undefined' ? window.location?.pathname : ''
  if (!path || !path.startsWith('/') || path.length > 80 || path.includes('?')) return 'unknown'
  return path
}

export function trackCheckoutClick(href: string): void {
  if (typeof window === 'undefined') return
  const offer = offerFromCheckoutHref(href, placementFromLocation())
  if (!offer) return
  try {
    if (!analyticsAllowed(typeof navigator === 'undefined' ? null : navigator.doNotTrack)) return
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
    if (typeof gtag !== 'function') return
    if (offer.event === 'product_checkout_click') {
      gtag('event', 'product_checkout_click', { product_id: offer.product_id, placement: offer.placement })
      return
    }
    gtag('event', 'service_checkout_click', { service_id: offer.service_id, placement: offer.placement })
  } catch {
    /* analytics must never block the checkout link */
  }
}
