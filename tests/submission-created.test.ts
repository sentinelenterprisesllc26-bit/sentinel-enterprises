import { test } from 'node:test'
import assert from 'node:assert/strict'
import { enroll, shouldEnroll } from '../netlify/functions/submission-created.mts'

const lookalike = { form_name: 'crypto-checklist', data: { email: ' Pat@Example.com ', source: 'lookalike' } }

test('only /lookalike signups on crypto-checklist are enrolled', () => {
  assert.equal(shouldEnroll(lookalike), 'pat@example.com')
  assert.equal(shouldEnroll({ form_name: 'crypto-checklist', data: { email: 'a@b.co' } }), null)
  assert.equal(shouldEnroll({ form_name: 'contact', data: { email: 'a@b.co', source: 'lookalike' } }), null)
  assert.equal(shouldEnroll({ form_name: 'crypto-checklist', data: { email: 'nope', source: 'lookalike' } }), null)
})

test('does nothing without Kit settings', async () => {
  let called = false
  const r = await enroll(lookalike, {}, (async () => { called = true; return new Response('{}') }) as typeof fetch)
  assert.equal(r, 'not-configured')
  assert.equal(called, false)
})

test('creates subscriber, adds to sequence, then tag', async () => {
  const calls: Array<{ url: string; key: string | null; body: string }> = []
  const f = (async (url: string, init: RequestInit) => {
    calls.push({ url, key: new Headers(init.headers).get('X-Kit-Api-Key'), body: String(init.body) })
    return new Response('{}', { status: 201 })
  }) as unknown as typeof fetch
  const r = await enroll(lookalike, { KIT_API_KEY: 'test-key', KIT_SEQUENCE_ID: '42', KIT_TAG_ID: '7' }, f)
  assert.equal(r, 'enrolled')
  assert.deepEqual(calls.map((c) => c.url), [
    'https://api.kit.com/v4/subscribers',
    'https://api.kit.com/v4/sequences/42/subscribers',
    'https://api.kit.com/v4/tags/7/subscribers',
  ])
  assert.ok(calls.every((c) => c.key === 'test-key' && c.body === '{"email_address":"pat@example.com"}'))
})

test('Kit errors never throw', async () => {
  const f = (async () => new Response('nope', { status: 401 })) as unknown as typeof fetch
  assert.equal(await enroll(lookalike, { KIT_API_KEY: 'k', KIT_SEQUENCE_ID: '1' }, f), 'error')
})
