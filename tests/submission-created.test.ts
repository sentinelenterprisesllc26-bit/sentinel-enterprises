import { test } from 'node:test'
import assert from 'node:assert/strict'
import { enroll, guideFor, handleSubmission, shouldEnroll } from '../netlify/functions/submission-created.mts'

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

test('guide lookup uses public PDFs and skips the paid inheritance checklist', () => {
  assert.equal(guideFor({ form_name: 'caregiver-checklist', data: { email: 'a@b.co' } })?.path, '/pdfs/caregiver-tax-checklist.pdf')
  assert.equal(
    guideFor({ form_name: 'crypto-security-checklist', data: { email: 'a@b.co' } })?.path,
    '/downloads/Crypto_Security_Lead_Magnet.pdf',
  )
  assert.equal(
    guideFor({ form_name: 'crypto-checklist', data: { email: 'a@b.co', source: 'lookalike' } })?.path,
    '/downloads/Lookalike-Address-Checklist.pdf',
  )
  assert.equal(guideFor({ form_name: 'crypto-checklist', data: { email: 'a@b.co' } }), null)
  assert.equal(guideFor({ form_name: 'contact', data: { email: 'a@b.co' } }), null)
  assert.equal(guideFor(lookalike)?.path.includes('private-assets'), false)
})

test('missing Resend settings skip the email and still enroll in Kit', async () => {
  const calls: string[] = []
  const f = (async (url: string) => {
    calls.push(url)
    return new Response('{}', { status: 201 })
  }) as unknown as typeof fetch
  const result = await handleSubmission(lookalike, { KIT_API_KEY: 'k', KIT_SEQUENCE_ID: '42' }, f, 'https://sentinelenterprisesllc.com')
  assert.deepEqual(result, { kit: 'enrolled', email: 'not-configured' })
  assert.deepEqual(calls, [
    'https://api.kit.com/v4/subscribers',
    'https://api.kit.com/v4/sequences/42/subscribers',
  ])
})

test('sends the public PDF through Resend without calling Kit for other forms', async () => {
  const calls: Array<{ url: string; body: string }> = []
  const f = (async (url: string, init?: RequestInit) => {
    calls.push({ url, body: String(init?.body ?? '') })
    if (String(url).endsWith('.pdf')) return new Response(new Uint8Array([37, 80, 68, 70]), { status: 200 })
    return new Response('{}', { status: 200 })
  }) as unknown as typeof fetch
  const result = await handleSubmission(
    { form_name: 'caregiver-checklist', data: { email: 'a@b.co' } },
    { RESEND_API_KEY: 're_test', GUIDE_FROM_EMAIL: 'Sentinel Enterprises <guides@sentinelenterprisesllc.com>' },
    f,
    'https://sentinelenterprisesllc.com',
  )
  assert.deepEqual(result, { kit: 'skipped', email: 'sent' })
  assert.deepEqual(
    calls.map((c) => c.url),
    ['https://sentinelenterprisesllc.com/pdfs/caregiver-tax-checklist.pdf', 'https://api.resend.com/emails'],
  )
  const sent = JSON.parse(calls[1].body) as { from: string; to: string; attachments: Array<{ filename: string; content: string }> }
  assert.equal(sent.from, 'Sentinel Enterprises <guides@sentinelenterprisesllc.com>')
  assert.equal(sent.to, 'a@b.co')
  assert.equal(sent.attachments[0].filename, 'caregiver-tax-checklist.pdf')
  assert.equal(sent.attachments[0].content, Buffer.from(new Uint8Array([37, 80, 68, 70])).toString('base64'))
})

test('a Resend failure still reports Kit enrollment', async () => {
  const f = (async (url: string) => {
    if (String(url).includes('api.kit.com')) return new Response('{}', { status: 201 })
    if (String(url).endsWith('.pdf')) return new Response(new Uint8Array([1]), { status: 200 })
    return new Response('nope', { status: 422 })
  }) as unknown as typeof fetch
  const result = await handleSubmission(
    lookalike,
    {
      KIT_API_KEY: 'k',
      KIT_SEQUENCE_ID: '42',
      RESEND_API_KEY: 're_test',
      GUIDE_FROM_EMAIL: 'Sentinel Enterprises <guides@sentinelenterprisesllc.com>',
    },
    f,
    'https://sentinelenterprisesllc.com',
  )
  assert.deepEqual(result, { kit: 'enrolled', email: 'error' })
})
