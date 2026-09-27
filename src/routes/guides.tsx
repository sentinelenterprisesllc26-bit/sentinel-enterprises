import { Link, createFileRoute } from '@tanstack/react-router'
import { type ProductId } from '../lib/products'
import { BUNDLE_CHECKOUT_URL, BuyCardsGrid } from '../lib/buy-cards'

export const Route = createFileRoute('/guides')({
  component: GuidesPage,
})

/*
 * Stripe Payment Links (Bundle $17.99, Ripple book $7.99, Pack $19.99) live in
 * src/lib/buy-cards.tsx. The guides below are sold only as part of the
 * Complete Protection Bundle — there are no separate per-guide checkouts.
 */

type Product = {
  id: ProductId
  badge?: string
  title: string
  tagline: string
  description: string
  includes: string[]
  buttonText: string
  featured?: boolean
}

const bundleProduct: Product = {
  id: 'complete-bundle',
  badge: 'Complete Bundle',
  featured: true,
  title: 'Complete Protection Bundle — All 3 Guides',
  tagline: 'Every guide, workbook, checklist, and template. One price, lifetime access.',
  description:
    'Get everything Sentinel offers in one bundle: crypto inheritance planning, asset protection basics, and the full masterclass with companion workbook. Buy once, keep forever.',
  includes: [
    'Crypto Inheritance Protection Bundle (PDF checklist + printable workbook + beneficiary template)',
        'Asset Protection Starter Guide (PDF guide + trust & titling checklist)',
    'Crypto Inheritance Masterclass (full video + companion PDF workbook and checklist)',
  ],
  buttonText: 'Get the Complete Bundle — $17.99',
}

const individualProducts: Product[] = [
  {
    id: 'crypto-inheritance-bundle',
    title: 'Crypto Inheritance Protection Bundle',
    tagline: 'Make sure your crypto reaches your heirs, not a frozen wallet.',
    description:
      'Step-by-step PDF checklist, printable workbook, and beneficiary access template for passing on digital assets without lost seed phrases or locked accounts.',
    includes: [
      'Crypto Inheritance PDF Checklist',
      'Printable Workbook for organizing your holdings',
      'Beneficiary Access Template',
    ],
    buttonText: 'Get it in the Bundle — $17.99',
  },
{
    id: 'asset-protection-guide',
    title: 'Asset Protection Starter Guide',
    tagline: 'Protect what you own from lawsuits, creditors, and inheritance erosion.',
    description:
      'Practical first steps to shield your assets using trusts, titling strategies, and basic legal structures — explained clearly without legal jargon.',
    includes: [
      'Asset Protection PDF Guide',
      'Trust & Titling Starter Checklist',
      'Plain-English explanations of protective structures',
    ],
    buttonText: 'Get it in the Bundle — $17.99',
  },
  {
    id: 'crypto-inheritance-masterclass',
    title: 'Crypto Inheritance Masterclass',
    tagline: 'The complete deep-dive on protecting and passing on your crypto.',
    description:
      'Full masterclass video plus a companion PDF workbook and checklist. The most thorough resource Sentinel offers for crypto inheritance planning.',
    includes: [
      'Full Masterclass Video',
      'Companion PDF Workbook',
      'Crypto Inheritance Checklist',
    ],
    buttonText: 'Get it in the Bundle — $17.99',
  },
]

function GuidesPage() {
  return (
    <>
      <section className="bg-slate-900 border-b border-slate-700/50 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full px-3 py-1 mb-4">
            Paid Guides &amp; Video Bundles
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            Go Deeper with Step-by-Step Guides
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Our free resources get you started. These paid guides and video bundles give you the complete,
            follow-along system — workbooks, checklists, and training you can act on today.
          </p>
        </div>
      </section>

      {/* === BUY: Bundle, Ripple book, Pack === */}
      <section id="buy" className="bg-slate-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm text-amber-400 font-semibold uppercase tracking-widest mb-2">PDF files emailed shortly after purchase</p>
          <h2 className="text-3xl font-black text-white text-center mb-8">Choose your guide</h2>
          <BuyCardsGrid />
        </div>
      </section>

      {/* === WHAT'S IN THE BUNDLE === */}
      <section className="bg-slate-950 py-12 px-4">
        <div className="max-w-3xl mx-auto mb-10">
          <ProductCard {...bundleProduct} checkoutUrl={BUNDLE_CHECKOUT_URL} />
        </div>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-2">What’s inside the Complete Protection Bundle</h2>
          <p className="text-slate-400 text-center mb-10">
            Each guide below is included in the $17.99 Complete Protection Bundle (and in the $19.99 Pack) — they aren’t sold separately.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {individualProducts.map((p) => (
              <ProductCard key={p.id} {...p} checkoutUrl={BUNDLE_CHECKOUT_URL} includedLabel />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-8 px-4 border-t border-slate-700/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-slate-400 text-sm mb-3">
            These materials are provided for educational purposes only. Sentinel Enterprises LLC is not a
            licensed attorney, financial advisor, or fiduciary. Nothing in these guides constitutes legal,
            tax, or financial advice. All sales are processed securely by Stripe.
          </p>
          <Link to="/downloads" className="text-amber-400 hover:text-amber-300 text-sm font-medium">
            Prefer to start free? Browse our free downloads →
          </Link>
        </div>
      </section>
    </>
  )
}

function ProductCard({
  badge,
  title,
  tagline,
  description,
  includes,
  buttonText,
  featured,
  checkoutUrl,
  includedLabel,
}: Product & { checkoutUrl: string; includedLabel?: boolean }) {
  return (
    <div
      className={`rounded-2xl border p-8 ${
        featured
          ? 'bg-gradient-to-br from-amber-500/10 to-slate-800 border-amber-500/40'
          : 'bg-slate-800 border-slate-700'
      }`}
    >
      {badge && (
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-full px-3 py-1 mb-4">
          {badge}
        </span>
      )}
      <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
      <p className="text-amber-400 text-sm font-medium mb-3">{tagline}</p>
      <p className="text-slate-300 text-sm mb-5">{description}</p>

      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">What's included</p>
      <ul className="space-y-2 mb-6">
        {includes.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
            <span className="text-amber-400 mt-0.5">✓</span>
            {item}
          </li>
        ))}
      </ul>

      {includedLabel ? (
        <p className="text-sm font-semibold text-amber-300 mb-4">Included in the $17.99 Complete Protection Bundle</p>
      ) : (
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-black text-white">$17.99</span>
          <span className="text-slate-400 text-sm">one-time, lifetime access</span>
        </div>
      )}

      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-6 rounded-xl transition-colors"
      >
        {buttonText}
      </a>
      <p className="text-center text-xs text-slate-500 mt-3">Secure checkout powered by Stripe</p>
    </div>
  )
}
