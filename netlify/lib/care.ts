/*
 * Sentinel Care automation (STAGED). Everything here is a no-op unless
 * CARE_AUTOMATION_ENABLED === 'true'. Google work (copy template, share, email,
 * weekly summaries) runs in the Apps Script at apps-script/care.gs; these
 * functions only verify Stripe and forward a JSON event (with a shared secret) to it.
 * Env: CARE_AUTOMATION_ENABLED, STRIPE_CARE_WEBHOOK_SECRET, CARE_APPS_SCRIPT_URL,
 *      CARE_SHARED_SECRET, STRIPE_DELIVERY_SECRET_KEY (existing).
 */
export const CARE_PRODUCT_ID = 'prod_VVUOjRJ3HBEBe1'
export const careEnabled = (env: Record<string, string | undefined> = process.env) => env.CARE_AUTOMATION_ENABLED === 'true'

export type CareEvent =
  | { type: 'purchase'; email: string; name?: string; customer?: string; subscription?: string; session: string; livemode: boolean }
  | { type: 'intake'; session: string; email: string; fields: Record<string, string> }
  | { type: 'cancel'; customer?: string; subscription: string }

export async function forwardToAppsScript(
  ev: CareEvent,
  env: Record<string, string | undefined> = process.env,
  f: typeof fetch = fetch,
): Promise<string> {
  if (!careEnabled(env)) {
    console.log(`[care] disabled; would forward ${ev.type}`)
    return 'disabled'
  }
  const url = env.CARE_APPS_SCRIPT_URL
  const secret = env.CARE_SHARED_SECRET
  if (!url || !secret) {
    console.warn('[care] CARE_APPS_SCRIPT_URL / CARE_SHARED_SECRET missing')
    return 'not-configured'
  }
  const res = await f(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret, event: ev }), redirect: 'follow' })
  const text = await res.text()
  if (!res.ok) throw new Error(`Apps Script ${res.status}: ${text.slice(0, 200)}`)
  return text
}

type PriceLike = { product?: string | { id: string } | null } | null | undefined
export const productId = (p: PriceLike) => (typeof p?.product === 'string' ? p.product : (p?.product?.id ?? null))
