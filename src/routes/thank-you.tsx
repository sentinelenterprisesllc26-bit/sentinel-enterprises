import { Link, createFileRoute } from '@tanstack/react-router'
import { trackEvent, type ResourceId } from '../lib/analytics'

export const Route = createFileRoute('/thank-you')({
  component: ThankYouPage,
})

/*
 * This public resource page does not authenticate a purchase or verify a
 * payment. Keep the links limited to readable files present in
 * /public/downloads/.
 */

type Download = {
  title: string
  file: string
  description: string
  resource: ResourceId
}

// Each entry links to /downloads/<file> served from /public/downloads/.
const DOWNLOADS: Download[] = [
  {
    title: 'Crypto Inheritance Checklist (6-page PDF)',
    file: 'crypto-inheritance-checklist.pdf',
    description: 'Beginner context, a 12-step checklist, and Crypto Access Letter prompts for documenting digital-asset access.',
    resource: 'crypto_inheritance_checklist',
  },
  {
    title: 'Crypto Inheritance Workbook (printable)',
    file: 'your-purchased-workbook.pdf',
    description: 'A 6-page workbook for documenting wallets, trusted people, instructions, and contacts. Print and complete it by hand; it is not fillable.',
    resource: 'crypto_inheritance_workbook',
  },
  {
    title: 'Beneficiary Access Template (6-page PDF)',
    file: 'beneficiary-access-template.pdf',
    description: 'A beneficiary access letter template with space for accounts, approximate values, instructions, and next steps.',
    resource: 'beneficiary_access_template',
  },
{
    title: 'Asset Protection Starter Guide (6-page PDF)',
    file: 'asset-protection-guide.pdf',
    description: 'Plain-English overview of five protection levels, trusts, and first actions for reviewing asset protection.',
    resource: 'asset_protection_guide',
  },
  {
    title: 'Trust & Titling Starter Checklist (7-page PDF)',
    file: 'trust-titling-checklist.pdf',
    description: 'A checklist for reviewing ownership documents and whether accounts and assets are titled consistently.',
    resource: 'trust_titling_checklist',
  },
]

function ThankYouPage() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-amber-500/15 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M5.25 21h13.5A2.25 2.25 0 0021 18.75V18H3v.75A2.25 2.25 0 005.25 21z" />
            </svg>
          </div>

          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Public resource page</span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            Crypto and Asset-Protection Resources
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed mb-12 max-w-2xl mx-auto">
            This page does not verify payment or confirm an order. The five public files below are available site resources for education and personal planning.
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
                onClick={() =>
                  trackEvent('resource_download_click', {
                    resource: d.resource,
                    placement: 'thank_you_delivery',
                  })
                }
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

        <p className="mt-12 text-slate-400 text-sm leading-relaxed text-center max-w-2xl mx-auto">
          These links are public and do not establish entitlement to a paid offer. If you are considering the $17.99
          checkout, <a href="mailto:Sentinelenterprisesllc26@gmail.com" className="text-amber-400 hover:text-amber-300 underline">contact us before paying</a> to confirm contents and delivery.
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
