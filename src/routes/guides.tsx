import { Link, createFileRoute } from '@tanstack/react-router'
import { formatPrice, PRODUCTS, type ProductId } from '../lib/products'
import { trackEvent } from '../lib/analytics'

export const Route = createFileRoute('/guides')({
  component: GuidesPage,
})

// Existing Stripe Payment Link. Its public checkout label is
// "Crypto Inheritance Protection Bundle" at $17.99; contents and delivery
// still require owner confirmation.
const BUNDLE_CHECKOUT_URL = 'https://buy.stripe.com/5kQ00jaXfb7U8fz2XfdIA06'

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
  id: 'crypto-inheritance-bundle',
  badge: 'Primary $17.99 offer',
  featured: true,
  title: 'Crypto Inheritance Protection Bundle',
  tagline: 'Plain-English education for crypto holders and families planning for access and inheritance.',
  description:
    'This offer is for people who want a practical starting point for documenting wallets, access instructions, beneficiary communications, and related asset-protection basics.',
  includes: [
    'Available site resource: Crypto Inheritance Checklist (6-page PDF with a 12-step checklist and Crypto Access Letter prompts)',
    'Available site resource: printable Crypto Inheritance Workbook (6 pages; complete by hand; not fillable)',
    'Available site resource: Beneficiary Access Template (6-page PDF with an access letter template and beneficiary steps)',
    'Related available site resources: Asset Protection Starter Guide (6 pages) and Trust & Titling Starter Checklist (7 pages)',
  ],
  buttonText: 'View checkout details — $17.99',
}

function GuidesPage() {
  return (
    <>
      <section className="bg-slate-900 border-b border-slate-700/50 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full px-3 py-1 mb-4">
             Crypto Education
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            Go Deeper with Step-by-Step Guides
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
             Start with free resources, then review one clearly identified crypto inheritance offer. The site
             also has a separate Crypto Mastery guide with its own $17 checkout path.
          </p>
        </div>
      </section>

      {/* === PRIMARY $17.99 OFFER === */}
      <section className="bg-slate-900 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-sm text-amber-400 font-semibold uppercase tracking-widest mb-6">
            Primary offer details
          </p>
          <ProductCard
            {...bundleProduct}
            checkoutUrl={BUNDLE_CHECKOUT_URL}
          />
        </div>
      </section>

      {/* === SECONDARY INDEPENDENT RESOURCE === */}
      <section className="bg-slate-950 py-12 px-4">
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-cyan-400/30 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
          <div className="grid md:grid-cols-[0.72fr_1.28fr] gap-0 items-center">
            <div className="p-8 sm:p-10 flex justify-center bg-slate-950/40">
              <img
                src="/crypto-mastery-cover.png"
                alt="Crypto Mastery beginner cryptocurrency guide"
                className="w-full max-w-[220px] rounded-xl border border-amber-400/40 shadow-xl"
              />
            </div>
            <div className="p-8 sm:p-10">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan-200 bg-cyan-400/10 border border-cyan-300/20 rounded-full px-3 py-1 mb-4">
                Independent resource
              </span>
              <h2 className="text-3xl font-black text-white leading-tight mb-3">Crypto Mastery</h2>
              <p className="text-amber-400 font-semibold mb-3">The Beginner’s Guide to Cryptocurrency</p>
              <p className="text-slate-300 leading-relaxed mb-6">
                Plain-English education about Bitcoin, blockchain, crypto wallets, security, buying crypto, and more.
                This separate resource keeps its own $17 checkout route.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to="/crypto-mastery"
                  className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-colors"
                >
                  View Crypto Mastery — $17
                </Link>
                <span className="text-xs text-slate-400">Independent $17 resource</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-8 px-4 border-t border-slate-700/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-slate-400 text-sm mb-3">
             These materials are provided for educational purposes only. Sentinel Enterprises LLC is not a
             licensed attorney, financial advisor, or fiduciary. Nothing in these guides constitutes legal,
             tax, or financial advice. The $17.99 checkout link opens Stripe; tax may calculate there.
             <strong className="text-amber-300">DO NOT PAY until the exact contents and delivery method are confirmed.</strong>
             Contact us before paying to confirm them.
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
  id,
  badge,
  title,
  tagline,
  description,
  includes,
  buttonText,
  featured,
  checkoutUrl,
}: Product & { checkoutUrl: string }) {
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

       <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Available site resources (not confirmed paid contents)</p>
      <ul className="space-y-2 mb-6">
        {includes.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
            <span className="text-amber-400 mt-0.5">✓</span>
            {item}
          </li>
        ))}
      </ul>

      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-2xl font-black text-white">{formatPrice(PRODUCTS[id].amountCents)}</span>
         <span className="text-slate-400 text-sm">tax may calculate at checkout</span>
      </div>
       <p className="text-amber-200 bg-amber-500/10 border border-amber-400/40 rounded-xl px-4 py-3 text-xs leading-relaxed mb-4" role="alert">
         <strong>DO NOT PAY until the exact contents and delivery method are confirmed.</strong>{' '}
         <a href="mailto:Sentinelenterprisesllc26@gmail.com" className="text-amber-300 hover:text-amber-200 underline">Contact us before paying</a> to confirm them.
       </p>

      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent('product_checkout_click', {
            product_id: id,
            placement: featured ? 'guides_featured_bundle' : 'guides_individual',
          })
        }
        className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-6 rounded-xl transition-colors"
      >
        {buttonText}
      </a>
       <p className="text-center text-xs text-slate-500 mt-3">View the existing Stripe checkout details</p>
    </div>
  )
}
