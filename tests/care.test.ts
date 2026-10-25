import { test } from 'node:test'
import assert from 'node:assert/strict'
import Stripe from 'stripe'
import { forwardToAppsScript } from '../netlify/lib/care'
import webhook from '../netlify/functions/care-webhook.mts'
import intake from '../netlify/functions/care-intake.mts'

const ev = { type: 'cancel', subscription: 'sub_x' } as const
test('flag off: nothing forwarded', async () => {
  let called = false
  const r = await forwardToAppsScript(ev, {}, (async () => { called = true; return new Response('') }) as never)
  assert.equal(r, 'disabled'); assert.equal(called, false)
})
test('flag on: forwards with secret', async () => {
  let body = ''
  const r = await forwardToAppsScript(ev, { CARE_AUTOMATION_ENABLED: 'true', CARE_APPS_SCRIPT_URL: 'https://x', CARE_SHARED_SECRET: 's' },
    (async (_u: string, i: RequestInit) => { body = String(i.body); return new Response('{"ok":true}') }) as never)
  assert.equal(r, '{"ok":true}'); assert.match(body, /"secret":"s"/)
})
test('webhook rejects bad signature, accepts good one but stays disabled', async () => {
  process.env.STRIPE_CARE_WEBHOOK_SECRET = 'whsec_test'; process.env.STRIPE_SECRET_KEY = 'sk_test_dummy'
  delete process.env.CARE_AUTOMATION_ENABLED
  const payload = JSON.stringify({ id: 'evt_1', object: 'event', type: 'checkout.session.completed', livemode: false, data: { object: { id: 'cs_test_1' } } })
  const bad = await webhook(new Request('https://x', { method: 'POST', body: payload, headers: { 'stripe-signature': 't=1,v1=bad' } }))
  assert.equal(bad.status, 400)
  const sig = new Stripe('sk_test_dummy').webhooks.generateTestHeaderString({ payload, secret: 'whsec_test' })
  const good = await webhook(new Request('https://x', { method: 'POST', body: payload, headers: { 'stripe-signature': sig } }))
  assert.equal(good.status, 200); assert.equal(await good.text(), 'disabled')
})
test('intake rejects missing session and missing email', async () => {
  const a = await intake(new Request('https://x', { method: 'POST', body: JSON.stringify({}) })); assert.equal(a.status, 400)
  const b = await intake(new Request('https://x', { method: 'POST', body: JSON.stringify({ session_id: 'cs_test_abc' }) })); assert.equal(b.status, 400)
})
