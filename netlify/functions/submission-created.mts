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
 *  Until KIT_API_KEY and KIT_SEQUENCE_ID are set, this logs a warning and does
 *  nothing else. It never throws, so it can never break a form submission.
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

export default async (req: Request) => {
  let payload: FormPayload = {}
  try {
    payload = ((await req.json()) as { payload?: FormPayload }).payload ?? {}
  } catch {
    return new Response('Bad payload.', { status: 200 })
  }
  const result = await enroll(payload)
  return new Response(result, { status: 200 })
}
