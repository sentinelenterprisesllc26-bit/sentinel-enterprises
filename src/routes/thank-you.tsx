import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/thank-you')({
  component: ThankYouPage,
})

/*
 * ============================================================================
 *  THANK-YOU / DOWNLOAD PAGE  —  POST-PURCHASE DELIVERY
 * ============================================================================
 *
 *  This is where customers land AFTER a successful Stripe payment. Stripe
 *  Checkout redirects here with a ?session_id=... query param identifying the
 *  completed order.
 *
 *  HOW TO CONNECT IT:
 *  1. Payment + redirect are already wired up — the create-checkout function
 *     (netlify/functions/create-checkout.mts) sends buyers here automatically.
 *  2. Upload the purchased files to  /public/pdfs/  (PDFs) and host the
 *     training videos (unlisted YouTube/Vimeo, or a Stripe-gated link).
 *  3. REPLACE the two placeholder hrefs below:
 *        WATCH_VIDEO_URL  — the private/unlisted training video link
 *        DOWNLOAD_PDF_URL — the deliverable PDF/workbook in /public/pdfs/
 *
 *  NOTE ON SECURITY: a public redirect page like this is the simplest setup.
 *  For gated delivery that can't be shared, add a Netlify Function that reads
 *  the ?session_id, verifies it with Stripe, and only then reveals the links.
 *  That can be wired in later without changing the rest of the site.
 * ============================================================================
 */

// 🔵 REPLACE: the private training-video link delivered after purchase.
const WATCH_VIDEO_URL = 'https://www.youtube.com/watch?v=REPLACE_WITH_PRIVATE_VIDEO'
// 🔵 REPLACE: the deliverable PDF (upload it to /public/pdfs/ first).
const DOWNLOAD_PDF_URL = '/pdfs/your-purchased-workbook.pdf'

function ThankYouPage() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 min-h-[70vh] flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 mx-auto bg-amber-500/15 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Payment Confirmed</span>
        <h1 className="mt-2 text-4xl sm:text-5xl font-black text-white leading-tight mb-4">Thank You!</h1>
        <p className="text-xl text-slate-400 leading-relaxed mb-10">
          Your purchase is complete. Your training video and downloadable materials are ready below.
        </p>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-8 flex flex-col sm:flex-row gap-4 justify-center">
          {/* 🔵 REPLACE `WATCH_VIDEO_URL` above with your real private video link. */}
          <a
            href={WATCH_VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Video
          </a>
          {/* 🔵 REPLACE `DOWNLOAD_PDF_URL` above with your real PDF in /public/pdfs/. */}
          <a
            href={DOWNLOAD_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Download PDF
          </a>
        </div>

        <p className="mt-8 text-slate-500 text-sm">
          Having trouble accessing your purchase?{' '}
          <a href="mailto:Sentinelenterprisesllc26@gmail.com" className="text-amber-400 hover:text-amber-300 font-semibold">
            Email us
          </a>{' '}
          and we&apos;ll sort it out right away.
        </p>

        <div className="mt-10">
          <Link to="/" className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </section>
  )
}
