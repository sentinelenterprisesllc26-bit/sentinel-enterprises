import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/thank-you')({
  component: ThankYouPage,
})

/*
 * ============================================================================
 *  THANK-YOU / DOWNLOAD PAGE  —  POST-PURCHASE DELIVERY
 * ============================================================================
 *
 *  This is where customers land AFTER a successful Stripe payment. It lists
 *  every file in the paid bundle as a direct download link. The same files
 *  are also emailed to the buyer by Stripe along with their receipt.
 *
 *  The PDFs live in /public/downloads/ — to swap in a real deliverable, just
 *  replace the matching file there (keep the filename) and the link below
 *  keeps working.
 * ============================================================================
 */

type Download = {
  title: string
  file: string
}

// Each entry links to /downloads/<file> served from /public/downloads/.
const DOWNLOADS: Download[] = [
  { title: 'Crypto Inheritance Checklist', file: 'crypto-inheritance-checklist.pdf' },
  { title: 'Crypto Inheritance Fillable Workbook', file: 'crypto-inheritance-fillable-workbook.pdf' },
  { title: 'Beneficiary Access Template', file: 'beneficiary-access-template.pdf' },
  { title: 'Caregiver Tax Savings Guide', file: 'caregiver-tax-savings-guide.pdf' },
  { title: 'Caregiver Deduction Checklist', file: 'caregiver-deduction-checklist.pdf' },
  { title: 'Asset Protection Starter Guide', file: 'asset-protection-starter-guide.pdf' },
  { title: 'Trust & Titling Starter Checklist', file: 'trust-titling-starter-checklist.pdf' },
]

function ThankYouPage() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 min-h-[70vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 mx-auto bg-amber-500/15 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Payment Confirmed</span>
        <h1 className="mt-2 text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
          Thank You for Your Purchase!
        </h1>
        <p className="text-xl text-slate-400 leading-relaxed mb-10">
          Your downloads are ready below. We&apos;ve also emailed copies to you, so you&apos;ll always have them
          on hand.
        </p>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 sm:p-8 text-left">
          <p className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Your downloads</p>
          <ul className="space-y-2.5">
            {DOWNLOADS.map((d) => (
              <li key={d.file}>
                <a
                  href={`/downloads/${d.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-amber-400 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                  <span className="flex-1">{d.title}</span>
                  <span className="text-slate-500 text-xs uppercase tracking-wider">PDF</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-slate-400 text-sm leading-relaxed">
          Your receipt has been emailed to you by Stripe. If you have any questions email{' '}
          <a
            href="mailto:Sentinelenterprisesllc26@gmail.com"
            className="text-amber-400 hover:text-amber-300 font-semibold"
          >
            Sentinelenterprisesllc26@gmail.com
          </a>
          .
        </p>

        <p className="mt-4 text-slate-500 text-sm leading-relaxed">
          Tip: bookmark this page so you can return to your downloads anytime.
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
