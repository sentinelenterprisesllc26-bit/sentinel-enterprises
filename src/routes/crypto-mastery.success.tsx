import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/crypto-mastery/success')({
  validateSearch: (search: Record<string, unknown>) => ({
    session_id: typeof search.session_id === 'string' ? search.session_id : undefined,
  }),
  component: CryptoMasterySuccessPage,
})

type State = 'loading' | 'ready' | 'error'

function CryptoMasterySuccessPage() {
  const { session_id: sessionId } = Route.useSearch()
  const [state, setState] = useState<State>(sessionId ? 'loading' : 'error')
  const [error, setError] = useState('A valid purchase session is required to access this download.')

  useEffect(() => {
    if (!sessionId) return
    const controller = new AbortController()

    fetch(`/.netlify/functions/verify-crypto-mastery-download?session_id=${encodeURIComponent(sessionId)}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json().catch(() => ({})) as { error?: string }
          throw new Error(data.error || 'We could not verify your payment yet.')
        }
        setState('ready')
      })
      .catch((caught: unknown) => {
        if (controller.signal.aborted) return
        setError(caught instanceof Error ? caught.message : 'We could not verify your payment yet.')
        setState('error')
      })

    return () => controller.abort()
  }, [sessionId])

  const downloadUrl = sessionId
    ? `/.netlify/functions/download-crypto-mastery?session_id=${encodeURIComponent(sessionId)}`
    : '#'

  return (
    <section className="min-h-[70vh] py-24 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-700 bg-slate-800/70 p-8 sm:p-10 text-center shadow-xl">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">Payment received</p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">Your Crypto Mastery Guide Is Ready</h1>
          <p className="text-slate-400 leading-relaxed mb-8">
            Thank you for your purchase. Your personal download is unlocked below.
          </p>

          {state === 'loading' && <p className="text-slate-300">Verifying your payment securely…</p>}

          {state === 'ready' && (
            <a
              href={downloadUrl}
              className="inline-flex w-full justify-center items-center px-6 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-lg rounded-xl transition-colors"
              data-testid="link-download-crypto-mastery"
            >
              Download Your E-Book (PDF)
            </a>
          )}

          {state === 'error' && (
            <div className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
              {error} If you were just charged, wait a moment and refresh this page. For help, email{' '}
              <a className="underline font-semibold" href="mailto:sentinelenterprisesllc26@gmail.com">sentinelenterprisesllc26@gmail.com</a>.
            </div>
          )}
          <p className="mt-5 text-xs text-slate-500">Your Stripe receipt is sent to the email address used at checkout.</p>
        </div>
        <div className="mt-8 text-center">
          <Link to="/" className="text-amber-400 hover:text-amber-300 font-semibold">Back to Sentinel Enterprises</Link>
        </div>
      </div>
    </section>
  )
}
