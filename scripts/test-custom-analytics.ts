import assert from 'node:assert/strict'
import { submitNetlifyForm, submitNetlifyFormOnce } from '../src/lib/forms'
import { trackEvent } from '../src/lib/analytics'

type TestWindow = {
  gtag?: (command: 'event', eventName: string, parameters?: Record<string, string | number | boolean>) => void
  'ga-disable-G-Q6SKVDVTMJ'?: boolean
}

const dispatched: Array<readonly unknown[]> = []
const testWindow: TestWindow = {
  gtag: (...args) => dispatched.push(args),
}

Object.defineProperty(globalThis, 'window', { configurable: true, value: testWindow })
Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { doNotTrack: '0' } })

trackEvent('product_checkout_click', {
  product_id: 'complete-bundle',
  placement: 'homepage_bundle',
})
assert.equal(dispatched.length, 1)
assert.deepEqual(dispatched[0], [
  'event',
  'product_checkout_click',
  { product_id: 'complete-bundle', placement: 'homepage_bundle' },
])

trackEvent('product_checkout_click', {
  product_id: 'not-a-product',
  placement: 'homepage_bundle',
} as never)
assert.equal(dispatched.length, 1, 'invalid identifiers must not reach GA4')

trackEvent('product_checkout_click', {
  product_id: 'complete-bundle',
  placement: 'contact_page',
} as never)
assert.equal(dispatched.length, 1, 'event-specific placement allowlists must be enforced')

trackEvent('service_checkout_click', {
  service_id: 'asset_protection',
  placement: 'service_details_asset_protection',
})
assert.equal(dispatched.length, 2, 'service checkout clicks must dispatch through the same allowlist')

testWindow.gtag = undefined
assert.doesNotThrow(() =>
  trackEvent('contact_form_success', { placement: 'contact_page' }),
)

testWindow.gtag = (...args) => dispatched.push(args)
Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { doNotTrack: '1' } })
trackEvent('contact_form_success', { placement: 'contact_page' })
assert.equal(dispatched.length, 2, 'Do Not Track must prevent dispatch')
Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { doNotTrack: '0' } })

testWindow.gtag = () => {
  throw new Error('blocked tracker')
}
assert.doesNotThrow(() => trackEvent('contact_form_success', { placement: 'contact_page' }))

class MockFormData {
  static form: { emailValue: string } | undefined

  entries(): Array<[string, string]> {
    return [
      ['form-name', 'contact'],
      ['email', MockFormData.form?.emailValue ?? 'test@example.invalid'],
    ]
  }
}

Object.defineProperty(globalThis, 'FormData', { configurable: true, value: MockFormData })
const originalFetch = globalThis.fetch
let requestBody = ''
MockFormData.form = { emailValue: 'test@example.invalid' }
globalThis.fetch = async (_input, init) => {
  requestBody = String(init?.body)
  return new Response('', { status: 200 })
}

await submitNetlifyForm({} as HTMLFormElement)
assert.equal(requestBody, 'form-name=contact&email=test%40example.invalid')

globalThis.fetch = async () => new Response('', { status: 500 })
await assert.rejects(
  submitNetlifyForm({} as HTMLFormElement),
  /Form submission failed \(500\)/,
)

globalThis.fetch = async () => {
  throw new Error('network unavailable')
}
await assert.rejects(submitNetlifyForm({} as HTMLFormElement), /network unavailable/)

// Exercise the handler-level orchestration used by every form: one accepted
// success callback, no callback for failures, duplicate suppression in flight,
// and a retry that keeps the recoverable input untouched.
const formState = { emailValue: 'recoverable@example.invalid' }
MockFormData.form = formState
const form = formState as unknown as HTMLFormElement
const acceptedEvent = () =>
  trackEvent('lead_form_success', {
    form_name: 'crypto_checklist',
    placement: 'crypto_checklist_page',
  })
testWindow.gtag = (...args) => dispatched.push(args)
dispatched.length = 0
let fetchCalls = 0
let resolvePending: (response: Response) => void = () => undefined
globalThis.fetch = async () => {
  fetchCalls += 1
  return new Promise<Response>((resolve) => {
    resolvePending = resolve
  })
}

const pendingSubmission = submitNetlifyFormOnce(form, acceptedEvent)
const duplicateSubmission = submitNetlifyFormOnce(form, acceptedEvent)
assert.equal(await duplicateSubmission, false)
assert.equal(fetchCalls, 1, 'duplicate activation must not make another request')
assert.equal(dispatched.length, 0, 'success must wait for the HTTP response')
resolvePending(new Response('', { status: 200 }))
assert.equal(await pendingSubmission, true)
assert.equal(dispatched.length, 1, 'one 2xx response must emit exactly one success event')
assert.equal(formState.emailValue, 'recoverable@example.invalid')

globalThis.fetch = async () => new Response('', { status: 500 })
await assert.rejects(submitNetlifyFormOnce(form, acceptedEvent), /Form submission failed \(500\)/)
assert.equal(dispatched.length, 1, 'HTTP failures must not emit success')
assert.equal(formState.emailValue, 'recoverable@example.invalid', 'failed submissions retain input')

globalThis.fetch = async () => new Response('', { status: 201 })
assert.equal(await submitNetlifyFormOnce(form, acceptedEvent), true, 'a failed request must be retryable')
assert.equal(dispatched.length, 2, 'the successful retry emits one success event')

globalThis.fetch = async () => {
  throw new Error('network unavailable')
}
await assert.rejects(submitNetlifyFormOnce(form, acceptedEvent), /network unavailable/)
assert.equal(dispatched.length, 2, 'network failures must not emit success')
assert.equal(formState.emailValue, 'recoverable@example.invalid')

globalThis.fetch = originalFetch
console.log('custom analytics smoke tests passed')