import { test } from 'node:test'
import assert from 'node:assert/strict'
import { BUNDLE_CHECKOUT_URL, PACK_CHECKOUT_URL, RIPPLE_BOOK_CHECKOUT_URL } from '../src/lib/buy-cards'
import { analyticsAllowed, offerFromCheckoutHref, trackCheckoutClick } from '../src/lib/offer-clicks'

const CARE = 'https://buy.stripe.com/eVq28rghzek67bvfK1dIA0a?prefilled_promo_code=CARE75'

test('known checkout links map to click events and nothing else', () => {
  assert.deepEqual(offerFromCheckoutHref(BUNDLE_CHECKOUT_URL, '/videos'), {
    event: 'product_checkout_click',
    product_id: 'complete-protection-bundle',
    placement: '/videos',
  })
  assert.equal(BUNDLE_CHECKOUT_URL, 'https://buy.stripe.com/5kQ4gzc1j6RE2VfapHdIA0b')
  assert.deepEqual(offerFromCheckoutHref(RIPPLE_BOOK_CHECKOUT_URL, '/quiz'), {
    event: 'product_checkout_click',
    product_id: 'ripple-effect-book',
    placement: '/quiz',
  })
  assert.deepEqual(offerFromCheckoutHref(PACK_CHECKOUT_URL, '/'), {
    event: 'product_checkout_click',
    product_id: 'protection-ripple-pack',
    placement: '/',
  })
  assert.deepEqual(offerFromCheckoutHref(CARE, '/care'), {
    event: 'service_checkout_click',
    service_id: 'sentinel-care',
    placement: '/care',
  })
  assert.deepEqual(offerFromCheckoutHref('https://paypal.me/JenaeWiley', '/services'), {
    event: 'service_checkout_click',
    service_id: 'paypal',
    placement: '/services',
  })
  assert.equal(offerFromCheckoutHref('https://buy.stripe.com/not-a-current-offer'), null)
  assert.equal(offerFromCheckoutHref('/guides'), null)
})

test('click tracking sends the click event and no purchase fields', () => {
  assert.equal(analyticsAllowed('1'), false)
  assert.equal(analyticsAllowed(null), true)
  if (!analyticsAllowed(navigator.doNotTrack)) return
  const calls: unknown[][] = []
  const previousWindow = globalThis.window
  try {
    globalThis.window = {
      location: { pathname: '/guides' },
      gtag: (...args: unknown[]) => {
        calls.push(args)
      },
    } as unknown as Window & typeof globalThis
    trackCheckoutClick(BUNDLE_CHECKOUT_URL)
    assert.deepEqual(calls, [
      ['event', 'product_checkout_click', { product_id: 'complete-protection-bundle', placement: '/guides' }],
    ])
    const params = calls[0][2] as Record<string, string>
    assert.equal('value' in params, false)
    assert.equal('currency' in params, false)
    assert.equal('transaction_id' in params, false)
    globalThis.window = { location: { pathname: '/' } } as unknown as Window & typeof globalThis
    assert.doesNotThrow(() => trackCheckoutClick(PACK_CHECKOUT_URL))
  } finally {
    globalThis.window = previousWindow
  }
})
