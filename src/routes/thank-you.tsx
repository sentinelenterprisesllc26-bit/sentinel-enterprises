import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/thank-you')({
  head: () => ({ meta: [{ title: 'Your downloads | Sentinel Enterprises' }, { name: 'robots', content: 'noindex' }] }),
  component: ThankYouPage,
})

/*
 * ============================================================================
 *  THANK-YOU / DOWNLOAD PAGE  —  POST-PURCHASE DELIVERY (session-aware)
 * ============================================================================
 *  Stripe Payment Links redirect here with ?session_id={CHECKOUT_SESSION_ID}.
 *  The page calls /api/verify-purchase, which checks the Checkout Session is
 *  paid and returns only the files that product includes. Each download goes
 *  through /api/download (same check) — the PDFs are never public.
 *  Access rules: src/lib/purchase-access.ts
 * ============================================================================
 */

type VerifiedFile = { key: string; title: string; description: string }
type Verified = { ok: true; kinds: Array<'bundle' | 'book' | 'pack'>; products: string[]; files: VerifiedFile[] }
type State = { phase: 'loading' } | { phase: 'denied' } | { phase: 'unavailable' } | { phase: 'ok'; data: Verified; sessionId: string }

const SUPPORT_EMAIL = 'Sentinelenterprisesllc26@gmail.com'

function headlineFor(kinds: Verified['kinds']) {
  if (kinds.includes('pack')) {
    return {
      title: 'Your Complete Protection + Ripple Book Pack is ready! 🎉',
      sub: 'All five Complete Protection guides plus The Ripple Effect book are below.',
    }
  }
  if (kinds.includes('bundle') && kinds.includes('book')) {
    return { title: 'Your Bundle and Ripple Effect book are ready! 🎉', sub: 'Your downloads are listed below.' }
  }
  if (kinds.includes('book')) {
    return { title: 'Your copy of The Ripple Effect is ready! 🎉', sub: 'Download your digital book below.' }
  }
  return { title: 'Your Complete Protection Bundle is ready! 🎉', sub: 'Your downloads are listed below.' }
}

function ThankYouPage() {
  const [state, setState] = useState<State>({ phase: 'loading' })

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get('session_id')
    if (!sessionId) {
      setState({ phase: 'denied' })
      return
    }
    let cancelled = false
    fetch(`/api/verify-purchase?session_id=${encodeURIComponent(sessionId)}`, { cache: 'no-store' })
      .then(async (res) => {
        const body = await res.json().catch(() => null)
        if (cancelled) return
        if (res.ok && body?.ok) setState({ phase: 'ok', data: body as Verified, sessionId })
        else if (res.status >= 500) setState({ phase: 'unavailable' })
        else setState({ phase: 'denied' })
      })
      .catch(() => !cancelled && setState({ phase: 'unavailable' }))
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {state.phase === 'loading' && (
          <div className="text-center py-16" data-state="loading">
            <div className="w-12 h-12 mx-auto border-4 border-amber-500/30 border-t-amber-400 rounded-full animate-spin mb-6" />
            <p className="text-slate-300 text-lg">Verifying your purchase…</p>
          </div>
        )}

        {(state.phase === 'denied' || state.phase === 'unavailable') && (
          <div className="text-center py-10" data-state={state.phase}>
            <div className="w-16 h-16 mx-auto bg-amber-500/15 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 mb-6 text-3xl">
              !
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">We couldn&apos;t verify this purchase</h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-3">
              We couldn&apos;t verify this purchase — email{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-amber-400 hover:text-amber-300 font-semibold">
                {SUPPORT_EMAIL}
              </a>{' '}
              with your receipt.
            </p>
            {state.phase === 'unavailable' && (
              <p className="text-slate-500 text-sm">Our verification service is temporarily unavailable. We&apos;ll send your files by email.</p>
            )}
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/guides" className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl">
                Browse guides
              </Link>
              <Link to="/" className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20">
                Back to Home
              </Link>
            </div>
          </div>
        )}

        {state.phase === 'ok' && <Downloads data={state.data} sessionId={state.sessionId} />}
      </div>
    </section>
  )
}

function Downloads({ data, sessionId }: { data: Verified; sessionId: string }) {
  const h = headlineFor(data.kinds)
  const hasBundle = data.kinds.includes('bundle') || data.kinds.includes('pack')
  return (
    <div data-state="verified">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto bg-amber-500/15 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Payment Confirmed</span>
        <h1 className="mt-2 text-4xl sm:text-5xl font-black text-white leading-tight mb-4">{h.title}</h1>
        <p className="text-xl text-slate-400 leading-relaxed mb-12 max-w-2xl mx-auto">{h.sub}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {data.files.map((d) => (
          <div key={d.key} className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 flex flex-col hover:border-amber-500/50 transition-colors">
            <h3 className="text-lg font-bold text-white mb-2">{d.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{d.description}</p>
            <a
              href={`/api/download?session_id=${encodeURIComponent(sessionId)}&file=${encodeURIComponent(d.key)}`}
              className="inline-flex w-full items-center justify-center gap-2 px-4 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm rounded-xl transition-colors"
            >
              Download PDF
            </a>
          </div>
        ))}
      </div>

      {hasBundle && (
        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">Your Masterclass Video</h2>
          <div className="bg-slate-800/60 border border-dashed border-slate-600 rounded-2xl p-10 text-center">
            <p className="text-slate-300 leading-relaxed max-w-xl mx-auto">
              Video coming soon — check back here or email us at{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-amber-400 hover:text-amber-300 font-semibold">
                {SUPPORT_EMAIL}
              </a>
            </p>
          </div>
        </div>
      )}

      <p className="mt-12 text-slate-400 text-sm leading-relaxed text-center max-w-2xl mx-auto">
        Your receipt was emailed to you by Stripe. Bookmark this page (including the link in your address bar) to return to
        your downloads anytime.
      </p>
      <div className="mt-10 text-center">
        <Link to="/" className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
