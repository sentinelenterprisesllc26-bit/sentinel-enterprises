/*
 * ============================================================================
 *  SUBMISSION-CREATED: push /lookalike signups into the Kit email sequence
 * ============================================================================
 *  Netlify runs this event function automatically after every verified form
 *  submission (the file name `submission-created` is the trigger). Netlify
 *  Forms still stores every submission exactly as before; this only adds a
 *  copy to Kit so the 5-email "Lookalike" sequence starts on its own.
 *
 *  Which signups go in: form `crypto-checklist` with hidden field
 *  source=lookalike (set by src/routes/lookalike.tsx, reached via /paste,
 *  /copy, /zero). Other forms are ignored. Add more rows to ENROLL to widen it.
 *
 *  GOING LIVE (Jenae, in the Netlify UI: Site configuration > Environment
 *  variables). No code change needed:
 *    KIT_API_KEY      = V4 API key from Kit > Settings > Developer   (secret)
 *    KIT_SEQUENCE_ID  = number in the sequence's URL in Kit,
 *                       e.g. app.kit.com/sequences/1234567 -> 1234567
 *    KIT_TAG_ID       = optional; tag to apply (e.g. "lookalike")
 *  Until KIT_API_KEY and KIT_SEQUENCE_ID are set, Kit enrollment logs a warning
 *  and does nothing else. It never throws, so it can never break a form
 *  submission or the guide email that may follow.
 *
 *  After Kit enrollment (or a skip), the same event emails the matching free
 *  PDF when one already exists in the deployed site. Paid files under
 *  netlify/private-assets/ are never attached. The crypto inheritance
 *  checklist is one of those paid files, so a crypto-checklist signup with
 *  no `source` does not get an email.
 *
 *  Guide email needs both of these in Netlify (Site configuration >
 *  Environment variables). If either is missing, the email step logs a
 *  warning and returns success so Kit enrollment still runs:
 *    RESEND_API_KEY    = API key from https://resend.com
 *    GUIDE_FROM_EMAIL  = a from address on a domain verified in Resend,
 *                        e.g. Sentinel Enterprises <guides@sentinelenterprisesllc.com>
 * ============================================================================
 */

type FormPayload = { form_name?: string; data?: Record<string, string | undefined> }

const ENROLL: Array<{ form: string; source?: string }> = [{ form: 'crypto-checklist', source: 'lookalike' }]

const KIT_API = 'https://api.kit.com/v4'

export function shouldEnroll(payload: FormPayload): string | null {
  const email = payload.data?.email?.trim().toLowerCase()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null
  const source = payload.data?.source?.trim()
  const match = ENROLL.some((r) => r.form === payload.form_name && (!r.source || r.source === source))
  return match ? email : null
}

async function kit(path: string, apiKey: string, body: unknown, fetchImpl: typeof fetch) {
  const res = await fetchImpl(`${KIT_API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Kit-Api-Key': apiKey },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Kit ${path} returned ${res.status}: ${(await res.text()).slice(0, 300)}`)
}

export async function enroll(
  payload: FormPayload,
  env: Record<string, string | undefined> = process.env,
  fetchImpl: typeof fetch = fetch,
): Promise<string> {
  const email = shouldEnroll(payload)
  if (!email) return 'skipped'

  const apiKey = env.KIT_API_KEY
  const sequenceId = env.KIT_SEQUENCE_ID
  if (!apiKey || !sequenceId) {
    console.warn(
      `Kit not configured (KIT_API_KEY / KIT_SEQUENCE_ID missing). ${payload.form_name} signup is saved in ` +
        'Netlify Forms only and was not added to the email sequence.',
    )
    return 'not-configured'
  }

  try {
    // Upsert the subscriber, then add them to the sequence (Kit requires the subscriber to exist first).
    await kit('/subscribers', apiKey, { email_address: email }, fetchImpl)
    await kit(`/sequences/${encodeURIComponent(sequenceId)}/subscribers`, apiKey, { email_address: email }, fetchImpl)
    if (env.KIT_TAG_ID) {
      await kit(`/tags/${encodeURIComponent(env.KIT_TAG_ID)}/subscribers`, apiKey, { email_address: email }, fetchImpl)
    }
    console.log(`Added a ${payload.form_name} signup to Kit sequence ${sequenceId}.`)
    return 'enrolled'
  } catch (err) {
    console.error('Kit enrollment failed (signup is still saved in Netlify Forms):', err)
    return 'error'
  }
}

export type Guide = { path: string; filename: string; title: string }

// Public free PDFs only. Keys are the Netlify form name, or `source` on the
// shared crypto-checklist form. Paths must stay in /public.
const GUIDES_BY_FORM: Record<string, Guide> = {
  'caregiver-checklist': {
    path: '/pdfs/caregiver-tax-checklist.pdf',
    filename: 'caregiver-tax-checklist.pdf',
    title: 'Your Caregiver Tax Checklist',
  },
  'crypto-security-checklist': {
    path: '/downloads/Crypto_Security_Lead_Magnet.pdf',
    filename: 'Crypto_Security_Lead_Magnet.pdf',
    title: 'Your Crypto Security Checklist',
  },
  'usda-checklist': {
    path: '/downloads/usda-502-document-checklist.pdf',
    filename: 'usda-502-document-checklist.pdf',
    title: 'Your USDA 502 Document Checklist',
  },
}

const GUIDES_BY_CRYPTO_SOURCE: Record<string, Guide> = {
  lookalike: {
    path: '/downloads/Lookalike-Address-Checklist.pdf',
    filename: 'Lookalike-Address-Checklist.pdf',
    title: 'Your Lookalike Address Checklist',
  },
  keys: {
    path: '/downloads/Family-Crypto-Letter-Template.pdf',
    filename: 'Family-Crypto-Letter-Template.pdf',
    title: 'Your Family Crypto Letter',
  },
  recovery: {
    path: '/downloads/Recovery-Scam-Red-Flags-Checklist.pdf',
    filename: 'Recovery-Scam-Red-Flags-Checklist.pdf',
    title: 'Your Recovery Scam Red Flags Checklist',
  },
  routine: {
    path: '/downloads/Wallet-Security-Self-Custody-Checklist.pdf',
    filename: 'Wallet-Security-Self-Custody-Checklist.pdf',
    title: 'Your Wallet Security Checklist',
  },
}

export function guideFor(payload: FormPayload): Guide | null {
  const form = payload.form_name
  if (!form) return null
  if (form === 'crypto-checklist') {
    const source = payload.data?.source?.trim()
    return source ? (GUIDES_BY_CRYPTO_SOURCE[source] ?? null) : null
  }
  return GUIDES_BY_FORM[form] ?? null
}

export type GuideEmailResult = 'skipped' | 'not-configured' | 'sent' | 'error'

export async function sendGuide(
  payload: FormPayload,
  env: Record<string, string | undefined> = process.env,
  fetchImpl: typeof fetch = fetch,
  siteUrl = '',
): Promise<GuideEmailResult> {
  if (payload.data?.['bot-field']?.trim()) return 'skipped'
  const guide = guideFor(payload)
  const email = payload.data?.email?.trim()
  if (!guide || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'skipped'

  const apiKey = env.RESEND_API_KEY?.trim()
  const from = env.GUIDE_FROM_EMAIL?.trim()
  if (!apiKey || !from) {
    console.warn(
      `Guide email not configured (RESEND_API_KEY / GUIDE_FROM_EMAIL missing). ` +
        `${payload.form_name} signup is still saved in Netlify Forms. Kit enrollment is unchanged.`,
    )
    return 'not-configured'
  }

  const base = siteUrl.replace(/\/$/, '')
  if (!base) {
    console.error(`No site URL available to load ${guide.path}. Guide email skipped.`)
    return 'error'
  }

  let attachment: string
  try {
    const pdfRes = await fetchImpl(`${base}${guide.path}`)
    if (!pdfRes.ok) throw new Error(`PDF fetch returned ${pdfRes.status}`)
    attachment = Buffer.from(await pdfRes.arrayBuffer()).toString('base64')
  } catch (err) {
    console.error(`Could not load PDF for "${payload.form_name}":`, err)
    return 'error'
  }

  const downloadUrl = `${base}${guide.path}`
  const html = `
    <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color: #0f172a;">
      <h2 style="margin: 0 0 12px;">${guide.title}</h2>
      <p style="margin: 0 0 16px; line-height: 1.6; color: #334155;">
        Thanks for signing up with Sentinel Enterprises. Your guide is attached to this email as a PDF.
      </p>
      <p style="margin: 0 0 16px; line-height: 1.6; color: #334155;">
        You can also download it here:
        <a href="${downloadUrl}" style="color: #b45309; font-weight: 600;">${guide.filename}</a>
      </p>
      <p style="margin: 24px 0 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
        Sentinel Enterprises LLC provides education and consulting only. We are not attorneys,
        financial advisors, or fiduciaries.
      </p>
    </div>`

  try {
    const res = await fetchImpl('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: email,
        subject: guide.title,
        html,
        attachments: [{ filename: guide.filename, content: attachment }],
      }),
    })
    if (!res.ok) {
      console.error('Resend email failed:', res.status, (await res.text()).slice(0, 300))
      return 'error'
    }
  } catch (err) {
    console.error('Resend request error:', err)
    return 'error'
  }

  console.log(`Emailed "${guide.filename}" for form ${payload.form_name}.`)
  return 'sent'
}

export async function handleSubmission(
  payload: FormPayload,
  env: Record<string, string | undefined> = process.env,
  fetchImpl: typeof fetch = fetch,
  siteUrl = '',
): Promise<{ kit: string; email: GuideEmailResult }> {
  const kit = await enroll(payload, env, fetchImpl)
  let email: GuideEmailResult = 'skipped'
  try {
    email = await sendGuide(payload, env, fetchImpl, siteUrl)
  } catch (err) {
    console.error('Guide email failed (Kit enrollment already ran):', err)
    email = 'error'
  }
  return { kit, email }
}

function runtimeEnv(): Record<string, string | undefined> {
  const keys = ['KIT_API_KEY', 'KIT_SEQUENCE_ID', 'KIT_TAG_ID', 'RESEND_API_KEY', 'GUIDE_FROM_EMAIL'] as const
  const netlifyEnv = (globalThis as { Netlify?: { env?: { get?: (name: string) => string | undefined } } }).Netlify?.env
  const env: Record<string, string | undefined> = {}
  for (const key of keys) env[key] = netlifyEnv?.get?.(key) || process.env[key]
  return env
}

export default async (req: Request, context?: { site?: { url?: string } }) => {
  let payload: FormPayload = {}
  try {
    payload = ((await req.json()) as { payload?: FormPayload }).payload ?? {}
  } catch {
    return new Response('Bad payload.', { status: 200 })
  }
  const result = await handleSubmission(payload, runtimeEnv(), fetch, context?.site?.url || '')
  return new Response(JSON.stringify(result), { status: 200 })
}
