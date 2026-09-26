import type { Config } from '@netlify/functions'
import { PAID_FILES } from '../../src/lib/purchase-access'
import { json, lookupPurchase } from '../lib/stripe-purchase'

export default async (req: Request) => {
  if (req.method !== 'GET') return json(405, { ok: false, error: 'Method not allowed.' })
  const sessionId = new URL(req.url).searchParams.get('session_id')
  const result = await lookupPurchase(sessionId)
  if (result.kind === 'error') return json(result.status, result.body)
  const { access } = result
  if (!access.ok) return json(access.status, { ok: false, error: access.reason })
  return json(200, {
    ok: true,
    kinds: access.kinds,
    products: access.productNames,
    files: access.files.map((k) => ({ key: k, title: PAID_FILES[k].title, description: PAID_FILES[k].description })),
  })
}

export const config: Config = { path: '/api/verify-purchase' }
