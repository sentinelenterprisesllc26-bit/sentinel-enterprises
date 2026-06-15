import { Link, createFileRoute } from '@tanstack/react-router'
import { formatPrice, PRODUCTS, type ProductId } from '../lib/products'

export const Route = createFileRoute('/guides')({
  component: GuidesPage,
})

/*
 * ============================================================================
 *  PAID GUIDES & VIDEO BUNDLES  —  HOW IT WORKS
 * ============================================================================
 *
 *  The "Buy Now" button links directly to Stripe's secure hosted payment page
 *  (a Stripe Payment Link), opened in a new tab. To change the destination,
 *  edit the href on the buy button below.
 *
 *  PRICES live in src/lib/products.ts (edit `amountCents` to change the price
 *  shown on this page).
 *
 *  DELIVERY AFTER PAYMENT  ➜  Stripe redirects buyers to /thank-you
 *    (src/routes/thank-you.tsx), which has the "Watch Video" + "Download PDF"
 *    buttons you connect to the real files. Upload deliverables to
 *    /public/pdfs/ (PDFs) and host any videos privately.
 * ============================================================================
 */

type Product = {
  // Maps to the catalog in src/lib/products.ts (drives price + Stripe charge).
  id: ProductId
  badge?: string
  title: string
  tagline: string
  description: string
  includes: string[]
  buttonText: string
  featured?: boolean
}

const products: Product[] = [
  {
    id: 'crypto-inheritance-bundle',
    badge: 'Best Value',
    featured: true,
    title: 'Complete Protection Bundle',
    tagline: 'Everything we offer — crypto inheritance, caregiver taxes, and asset protection.',
    description:
      'Our entire library in one bundle: pass on your digital assets without lost seed phrases or frozen accounts, stop overpaying on caregiver-related taxes, and learn the practical first steps to shield what you own — all taught in plain English, step by step.',
    includes: [
      'Crypto Inheritance: PDF checklist + fillable workbook + beneficiary access template',
      'Caregiver Tax Savings: PDF guide + deduction checklist',
      'Asset Protection: PDF guide + trust & titling starter checklist',
    ],
    buttonText: 'Buy Now',
  },
]

function GuidesPage() {
  return (
    <>
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">
              Paid Guides &amp; Video Bundles
            </span>
            <h1 className="mt-2 text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
              Go Deeper with Step-by-Step Guides
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Our free resources get you started. These paid guides and video bundles give you the complete, follow-along
              system — workbooks, checklists, and training you can act on today.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            {products.map((p) => (
              <ProductCard key={p.title} {...p} />
            ))}
          </div>

          <p className="mt-10 text-slate-500 text-xs leading-relaxed border-t border-slate-800 pt-8 max-w-3xl">
            These materials are provided for educational purposes only. Sentinel Enterprises LLC is not a licensed
            attorney, financial advisor, or fiduciary. Nothing in these guides constitutes legal, tax, or financial
            advice. All sales are processed securely by Stripe.
          </p>

          <div className="mt-10 text-center">
            <Link
              to="/downloads"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
            >
              Prefer to start free? Browse our free downloads →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function ProductCard({ id, badge, title, tagline, description, includes, buttonText, featured }: Product) {
  return (
    <div
      className={
        'rounded-2xl p-7 flex flex-col transition-colors ' +
        (featured
          ? 'bg-slate-800/80 border-2 border-amber-500/60 shadow-lg shadow-amber-500/10'
          : 'bg-slate-800/60 border border-slate-700/50 hover:border-amber-500/50')
      }
    >
      {badge && (
        <span className="self-start mb-4 px-2.5 py-0.5 bg-amber-500/15 border border-amber-500/30 rounded-full text-amber-400 text-xs font-semibold uppercase tracking-wider">
          {badge}
        </span>
      )}
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-amber-400 text-sm font-medium mt-1 mb-4">{tagline}</p>
      <p className="text-slate-400 text-sm leading-relaxed mb-6">{description}</p>

      <div className="mb-6">
        <p className="text-white font-semibold text-xs uppercase tracking-wider mb-3">What&apos;s included</p>
        <ul className="space-y-2.5">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed">
              <svg
                className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-3xl font-black text-white">{formatPrice(PRODUCTS[id].amountCents)}</span>
          <span className="text-slate-500 text-sm">one-time</span>
        </div>
        {/* Opens Stripe's hosted payment page directly in a new tab. */}
        <a
          href="https://buy.stripe.com/14A7sL3uN5NA53nbtLdIA01"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 px-4 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm rounded-xl transition-colors"
        >
          {buttonText}
        </a>
        {/* Reassurance note shown under every paid button */}
        <p className="mt-3 flex items-center justify-center gap-1.5 text-slate-500 text-xs">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          Secure checkout powered by Stripe
        </p>
      </div>
    </div>
  )
}
