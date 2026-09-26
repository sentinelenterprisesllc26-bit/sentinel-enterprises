import { test } from 'node:test'
import assert from 'node:assert/strict'
import download from '../netlify/functions/download.mts'
import verify from '../netlify/functions/verify-purchase.mts'
import { __setStripeFactoryForTests } from '../netlify/lib/stripe-purchase'

const SESSIONS: Record<string, unknown> = {
  cs_test_paidbundle0000000: { status: 'complete', payment_status: 'paid', line_items: { data: [{ price: { product: { id: 'prod_VJ00IcCGTl5r9A' } } }] } },
  cs_test_paidbook000000000: { status: 'complete', payment_status: 'paid', line_items: { data: [{ price: { product: { id: 'prod_VKdAlI53OWNprH' } } }] } },
  cs_test_paidpack000000000: { status: 'complete', payment_status: 'paid', line_items: { data: [{ price: { product: { id: 'prod_VKdArH9H940rLv' } } }] } },
  cs_test_unpaid00000000000: { status: 'open', payment_status: 'unpaid', line_items: { data: [{ price: { product: { id: 'prod_VJ00IcCGTl5r9A' } } }] } },
}
let account = 'acct_1SyKpPEPXDHjPrap'
const fake = () => ({
  checkout: {
    sessions: {
      retrieve: async (id: string) => {
        if (!SESSIONS[id]) throw Object.assign(new Error('No such checkout.session'), { code: 'resource_missing' })
        return { id, ...(SESSIONS[id] as object) }
      },
    },
  },
  accounts: { retrieveCurrent: async () => ({ id: account }) },
}) as never

process.env.STRIPE_SECRET_KEY = 'dummy-key-for-unit-tests'
__setStripeFactoryForTests(fake)

const get = (fn: (r: Request) => Promise<Response>, qs: string) => fn(new Request(`https://x.test/api?${qs}`))

test('verify-purchase: bundle / book / pack / unpaid / fake', async () => {
  let r = await get(verify, 'session_id=cs_test_paidbundle0000000')
  assert.equal(r.status, 200)
  assert.equal((await r.json()).files.length, 5)
  r = await get(verify, 'session_id=cs_test_paidbook000000000')
  assert.deepEqual((await r.json()).files.map((f: { key: string }) => f.key), ['ripple-effect-book'])
  r = await get(verify, 'session_id=cs_test_paidpack000000000')
  assert.equal((await r.json()).files.length, 6)
  assert.equal((await get(verify, 'session_id=cs_test_unpaid00000000000')).status, 403)
  assert.equal((await get(verify, 'session_id=cs_live_doesnotexist12345')).status, 403)
  assert.equal((await get(verify, 'session_id=cs_fake')).status, 400)
  assert.equal((await get(verify, '')).status, 400)
})

test('download: serves the bundled PDF only when the purchase includes it', async () => {
  const ok = await get(download, 'session_id=cs_test_paidbook000000000&file=ripple-effect-book')
  assert.equal(ok.status, 200)
  assert.equal(ok.headers.get('content-type'), 'application/pdf')
  assert.match(ok.headers.get('content-disposition') ?? '', /^attachment;/)
  assert.equal(ok.headers.get('cache-control'), 'private, no-store')
  const bytes = Buffer.from(await ok.arrayBuffer())
  assert.equal(bytes.subarray(0, 4).toString(), '%PDF')

  const packWb = await get(download, 'session_id=cs_test_paidpack000000000&file=printable-workbook')
  assert.equal(packWb.status, 200)
  assert.equal((await get(download, 'session_id=cs_test_paidbundle0000000&file=ripple-effect-book')).status, 403)
  assert.equal((await get(download, 'session_id=cs_test_paidbook000000000&file=printable-workbook')).status, 403)
  assert.equal((await get(download, 'session_id=cs_test_unpaid00000000000&file=printable-workbook')).status, 403)
  assert.equal((await get(download, 'session_id=cs_fake&file=printable-workbook')).status, 400)
  assert.equal((await get(download, 'session_id=cs_test_paidpack000000000&file=../../package.json')).status, 400)
})

test('key for a different Stripe account → 503 stripe_account_mismatch', async () => {
  account = 'acct_SOMEOTHERACCOUNT'
  __setStripeFactoryForTests(fake)
  const r = await get(verify, 'session_id=cs_live_doesnotexist12345')
  assert.equal(r.status, 503)
  assert.equal((await r.json()).code, 'stripe_account_mismatch')
})
