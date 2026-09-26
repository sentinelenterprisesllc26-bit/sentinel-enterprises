import { test } from 'node:test'
import assert from 'node:assert/strict'
import { evaluateDownload, evaluateSession, isCheckoutSessionId } from '../src/lib/purchase-access'

const paid = (product: string, extra: Record<string, unknown> = {}) => ({
  id: 'cs_live_abcdefghijklmnop',
  status: 'complete',
  payment_status: 'paid',
  line_items: { data: [{ price: { product: { id: product } } }] },
  ...extra,
})

test('paid bundle unlocks the 5 bundle PDFs but not the book', () => {
  const r = evaluateSession(paid('prod_VJ00IcCGTl5r9A'))
  assert.ok(r.ok)
  if (r.ok) {
    assert.deepEqual(r.kinds, ['bundle'])
    assert.equal(r.files.length, 5)
    assert.ok(!r.files.includes('ripple-effect-book'))
  }
  assert.equal(evaluateDownload(paid('prod_VJ00IcCGTl5r9A'), 'ripple-effect-book').ok, false)
  assert.equal(evaluateDownload(paid('prod_VJ00IcCGTl5r9A'), 'printable-workbook').ok, true)
})

test('paid book unlocks only the Ripple book', () => {
  const r = evaluateSession(paid('prod_VKdAlI53OWNprH'))
  assert.ok(r.ok)
  if (r.ok) assert.deepEqual(r.files, ['ripple-effect-book'])
  const d = evaluateDownload(paid('prod_VKdAlI53OWNprH'), 'crypto-inheritance-checklist')
  assert.equal(d.ok, false)
  if (!d.ok) assert.equal(d.status, 403)
})

test('paid pack unlocks bundle PDFs + book', () => {
  const r = evaluateSession(paid('prod_VKdArH9H940rLv'))
  assert.ok(r.ok)
  if (r.ok) {
    assert.deepEqual(r.kinds, ['pack'])
    assert.equal(r.files.length, 6)
    assert.ok(r.files.includes('ripple-effect-book'))
  }
})

test('product id as string works too', () => {
  const s = { ...paid('x'), line_items: { data: [{ price: { product: 'prod_VKdAlI53OWNprH' } }] } }
  assert.ok(evaluateSession(s).ok)
})

test('fallback to payment link, then metadata.sku, when line items are absent', () => {
  const base = { status: 'complete', payment_status: 'paid' }
  const byLink = evaluateSession({ ...base, payment_link: 'plink_1UJxuKEPXDHjPrapyoO9N0Wm' })
  assert.ok(byLink.ok && byLink.kinds[0] === 'pack')
  const bySku = evaluateSession({ ...base, metadata: { sku: 'ripple-effect-book' } })
  assert.ok(bySku.ok && bySku.kinds[0] === 'book')
})

test('unpaid / open session is denied with 403', () => {
  for (const s of [
    paid('prod_VJ00IcCGTl5r9A', { payment_status: 'unpaid', status: 'open' }),
    paid('prod_VJ00IcCGTl5r9A', { payment_status: 'unpaid', status: 'complete' }),
    paid('prod_VJ00IcCGTl5r9A', { status: 'expired' }),
  ]) {
    const r = evaluateSession(s)
    assert.equal(r.ok, false)
    if (!r.ok) assert.equal(r.status, 403)
  }
})

test('wrong product (e.g. Crypto Mastery) is denied, even with a matching sku', () => {
  const r = evaluateSession(paid('prod_SOMETHING_ELSE', { metadata: { sku: 'complete-protection-bundle' } }))
  assert.equal(r.ok, false)
  if (!r.ok) assert.equal(r.status, 403)
})

test('fake / malformed session ids and unknown files', () => {
  assert.equal(isCheckoutSessionId('cs_fake'), false)
  assert.equal(isCheckoutSessionId('pi_123456789012345'), false)
  assert.equal(isCheckoutSessionId('../etc/passwd'), false)
  assert.equal(isCheckoutSessionId(null), false)
  assert.equal(isCheckoutSessionId('cs_live_a1VdakhjE3Orv8zzsoeqv2FiLjgC7OQRCKNN3TvrwhgWqmwpGVFVB9kAAS'), true)
  assert.equal(evaluateSession(null).ok, false)
  const d = evaluateDownload(paid('prod_VKdArH9H940rLv'), '../../etc/passwd')
  assert.equal(d.ok, false)
  if (!d.ok) assert.equal(d.status, 400)
})
