import type { Config } from '@netlify/functions'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PAID_FILES, evaluateDownload, isCheckoutSessionId, isFileKey } from '../../src/lib/purchase-access'
import { json, lookupPurchase } from '../lib/stripe-purchase'

// PDFs are bundled with this function via netlify.toml [functions] included_files.
function readPrivateAsset(name: string): Buffer | null {
  const here = (() => {
    try {
      return dirname(fileURLToPath(import.meta.url))
    } catch {
      return process.cwd()
    }
  })()
  const candidates = [
    resolve(process.cwd(), 'netlify/private-assets', name),
    resolve(here, '../private-assets', name),
    resolve(here, 'netlify/private-assets', name),
    join('/var/task/netlify/private-assets', name),
  ]
  for (const p of candidates) if (existsSync(p)) return readFileSync(p)
  console.error('[download] private asset not found', name, candidates)
  return null
}

export default async (req: Request) => {
  if (req.method !== 'GET') return json(405, { ok: false, error: 'Method not allowed.' })
  const params = new URL(req.url).searchParams
  const sessionId = params.get('session_id')
  const file = params.get('file')
  if (!isCheckoutSessionId(sessionId)) return json(400, { ok: false, error: 'A valid purchase session is required.' })
  if (!isFileKey(file)) return json(400, { ok: false, error: 'Unknown file.' })

  const result = await lookupPurchase(sessionId)
  if (result.kind === 'error') return json(result.status, result.body)
  const access = evaluateDownload(result.session, file)
  if (!access.ok) return json(access.status, { ok: false, error: access.reason })

  const meta = PAID_FILES[file]
  const data = readPrivateAsset(meta.asset)
  if (!data) return json(500, { ok: false, error: 'We could not prepare your download. Please contact support.' })

  return new Response(new Uint8Array(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${meta.downloadName}"`,
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex',
    },
  })
}

export const config: Config = { path: '/api/download' }
