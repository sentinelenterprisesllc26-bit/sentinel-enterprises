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
 *  every file in the Complete Protection Bundle as a direct download card.
 *  Stripe also emails the buyer their receipt.
 *
 *  The PDFs live in /public/downloads/ — to swap in a real deliverable, just
 *  replace the matching file there (keep the filename) and the link below
 *  keeps working.
 * ============================================================================
 */

type Download = {
  title: string
  file: string
  description: string
}

// Each entry links to /downloads/<file> served from /public/downloads/.
const DOWNLOADS: Download[] = [
  {
    title: 'Crypto Inheritance Checklist',
    file: 'crypto-inheritance-checklist.pdf',
    description: 'A step-by-step checklist to make sure your heirs can actually find and inherit your crypto.',
  },
  {
    title: 'Crypto Inheritance Fillable Workbook',
    file: 'your-purchased-workbook.pdf',
    description: 'A fill-in-the-blanks workbook to document wallets, access, and instructions in one place.',
  },
  {
    title: 'Beneficiary Access Template',
    file: 'beneficiary-access-template.pdf',
    description: 'A ready-to-use template for securely passing access details to the people you trust.',
  },
  {
    title: 'Caregiver Tax Savings Guide',
    file: 'caregiver-tax-guide.pdf',
    description: 'The deductions, credits, and filing strategies most family caregivers miss — in plain English.',
  },
  {
    title: 'Caregiver Deduction Checklist',
    file: 'caregiver-deduction-checklist.pdf',
    description: 'A quick-reference checklist so you never leave a caregiver tax deduction on the table.',
  },
  {
    title: 'Asset Protection Starter Guide',
    file: 'asset-protection-guide.pdf',
    description: 'Practical first steps to shield what you’ve built — without an eight-figure trust budget.',
  },
  {
    title: 'Trust & Titling Starter Checklist',
    file: 'trust-titling-checklist.pdf',
    description: 'How to title accounts and assets correctly so your protection plan actually holds up.',
  },
]

function ThankYouPage() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-amber-500/15 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Payment Confirmed</span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            Thank You for Your Purchase! 🎉
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed mb-12 max-w-2xl mx-auto">
            Your Complete Protection Bundle is ready. All 7 guides are listed below.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {DOWNLOADS.map((d) => (
            <div
              key={d.file}
              className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 flex flex-col hover:border-amber-500/50 transition-colors"
            >
              <h3 className="text-lg font-bold text-white mb-2">{d.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{d.description}</p>
              <a
                href={`/downloads/${d.file}`}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex w-full items-center justify-center gap-2 px-4 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                Download PDF
              </a>
            </div>
          ))}
        </div>

        {/* Masterclass video — placeholder until the recording is published. */}
        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">Your Masterclass Video</h2>
          <div className="bg-slate-800/60 border border-dashed border-slate-600 rounded-2xl p-10 sm:p-14 text-center">
            <div className="w-16 h-16 mx-auto bg-amber-500/15 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 mb-5">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <p className="text-slate-300 leading-relaxed max-w-xl mx-auto">
              Video coming soon — check back here or email us at{' '}
              <a
                href="mailto:sentinel@sentinelenterprisesllc.com"
                className="text-amber-400 hover:text-amber-300 font-semibold"
              >
                sentinel@sentinelenterprisesllc.com
              </a>
            </p>
          </div>
        </div>

        <p className="mt-12 text-slate-400 text-sm leading-relaxed text-center max-w-2xl mx-auto">
          Your receipt was emailed to you by Stripe. Bookmark this page to return to your downloads anytime.
        </p>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}
