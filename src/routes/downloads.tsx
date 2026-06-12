import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/downloads')({
  component: DownloadsPage,
})

/*
 * ============================================================================
 *  FREE DOWNLOADS  —  WHERE TO PUT YOUR PDF FILES
 * ============================================================================
 *
 *  Every card's `href` points to a file that must exist in the site's
 *  /public/ folder. Two locations are used:
 *
 *    • /public/downloads/   ← the existing library files (/downloads/*.pdf)
 *    • /public/pdfs/        ← the NEW placeholder files for the cards below
 *                             (create this folder and drop your PDFs in).
 *
 *  TO REPLACE A PLACEHOLDER: upload your real PDF to the matching path, e.g.
 *      /public/pdfs/caregiver-tax-checklist.pdf
 *  and the "Download PDF" button will serve it instantly — no code change
 *  needed beyond editing the `href` strings in the `groups` array below.
 *
 *  DELIVERY OPTIONS for a free PDF:
 *    (a) Instant download  — link straight to the file (what these cards do).
 *    (b) After email signup — point the button at /crypto-inheritance-checklist
 *        (or the homepage form) so the visitor subscribes first; the existing
 *        Netlify form then emails them the file. Use `emailGated: true` to
 *        show the "Get it by email" style button instead of a direct link.
 * ============================================================================
 */

type Download = {
  title: string
  description: string
  href: string
  badge?: string
  // When true, the button invites an email signup instead of an instant download.
  emailGated?: boolean
}

type DownloadGroup = {
  icon: string
  label: string
  items: Download[]
}

const groups: DownloadGroup[] = [
  {
    icon: '✅',
    label: 'Free Checklists',
    items: [
      {
        title: 'Caregiver Tax Checklist',
        description:
          'A one-page checklist of the deductions and credits family caregivers most often miss. Print it, check the boxes, and bring it to tax time.',
        // 🟢 REPLACE: upload your real file to /public/pdfs/caregiver-tax-checklist.pdf
        href: '/pdfs/caregiver-tax-checklist.pdf',
        badge: 'Free',
      },
      {
        title: 'Crypto Inheritance Checklist',
        description:
          'The 5 non-negotiable steps to make sure your heirs can actually access your digital assets. Delivered to your inbox when you sign up.',
        // To deliver this after email signup instead of an instant download,
        // it points at the existing lead-magnet page + Netlify form.
        href: '/crypto-inheritance-checklist',
        badge: 'Free',
        emailGated: true,
      },
    ],
  },
  {
    icon: '🛡️',
    label: 'Caregiver & Tax',
    items: [
      {
        title: 'Caregiver Tax Exemption Kit',
        description:
          'A comprehensive kit explaining how working families can legally reduce caregiver-related tax burdens. Includes checklists, filing tips, and strategy guides.',
        href: '/downloads/Caregiver_Tax_Exemption_Kit.pdf',
        badge: 'Popular',
      },
    ],
  },
  {
    icon: '₿',
    label: 'Crypto & XRP',
    items: [
      {
        title: 'Crypto IRA Playbook',
        description:
          'Step-by-step playbook for holding cryptocurrency inside a self-directed IRA. Covers setup, custodians, contribution limits, and estate planning considerations.',
        href: '/downloads/crypto_ira_playbook.pdf',
      },
      {
        title: 'XRP Essentials Guide',
        description:
          'An accessible introduction to XRP — how it works, why it matters for cross-border payments, and what crypto holders need to know before buying or holding.',
        href: '/downloads/XRP_Essentials_Guide.pdf',
      },
      {
        title: 'XRP Illustrated Guide',
        description:
          'A visually rich walkthrough of the XRP Ledger ecosystem, covering wallets, on-ledger DEX, trust lines, and practical use cases for everyday holders.',
        href: '/downloads/xrp_illustrated_guide.pdf',
      },
      {
        title: 'XRP Ripple Book',
        description:
          'An in-depth look at Ripple, the company behind XRP, its technology, regulatory history, and what the settlement means for long-term holders.',
        href: '/downloads/XRP_Ripple_Book.pdf',
      },
    ],
  },
  {
    icon: '🔒',
    label: 'Hardware Wallets',
    items: [
      {
        title: 'ELLIPAL Setup Guide',
        description:
          'Complete setup instructions for the ELLIPAL air-gapped hardware wallet — the safest way to store crypto offline with no USB or Bluetooth attack surface.',
        href: '/downloads/ELLIPAL_Setup_Guide.pdf',
      },
      {
        title: "Tangem Beginner's Guide",
        description:
          'Get started with the Tangem card wallet — a card-sized, chip-protected cold storage device perfect for beginners stepping into self-custody for the first time.',
        href: '/downloads/Tangem_Beginners_Guide.pdf',
      },
    ],
  },
]

function DownloadsPage() {
  return (
    <>
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">
              Free Educational Resources
            </span>
            <h1 className="mt-2 text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
              Free Guides &amp; Downloads
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Practical guides on crypto self-custody, XRP, hardware wallets, and caregiver tax savings — all free, no
              strings attached.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {groups.map((group) => (
            <div key={group.label}>
              <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
                <span aria-hidden="true">{group.icon}</span>
                {group.label}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {group.items.map((item) => (
                  <DownloadCard key={item.title} {...item} />
                ))}
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Want the complete, follow-along version?</h2>
            <p className="text-slate-400 leading-relaxed mb-6 max-w-xl mx-auto">
              Our paid guides and video bundles turn these checklists into a step-by-step system — workbooks, training
              videos, and templates you can act on today.
            </p>
            <Link
              to="/guides"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-colors"
            >
              Browse Paid Guides &amp; Bundles →
            </Link>
          </div>

          <p className="text-slate-500 text-xs leading-relaxed border-t border-slate-800 pt-8">
            These materials are provided for educational purposes only. Sentinel Enterprises LLC is not a licensed
            attorney, financial advisor, or fiduciary. Nothing in these guides constitutes legal, tax, or financial
            advice.
          </p>

          <div className="text-center">
            <Link
              to="/partners"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
            >
              See the tools &amp; platforms behind these guides →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function DownloadCard({ title, description, href, badge, emailGated }: Download) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 flex flex-col hover:border-amber-500/50 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        {badge && (
          <span className="flex-shrink-0 px-2.5 py-0.5 bg-amber-500/15 border border-amber-500/30 rounded-full text-amber-400 text-xs font-semibold uppercase tracking-wider">
            {badge}
          </span>
        )}
      </div>
      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{description}</p>
      {emailGated ? (
        // Email-gated delivery: send the visitor to the signup page; the
        // existing Netlify form emails them the PDF after they subscribe.
        <Link
          to={href}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
          Get It by Email
        </Link>
      ) : (
        <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm rounded-xl transition-colors"
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
      )}
    </div>
  )
}
