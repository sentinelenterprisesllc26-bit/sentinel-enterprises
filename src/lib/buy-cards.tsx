/*
 * ============================================================================
 *  PAID PRODUCTS (Stripe Payment Links) + shared buy cards
 * ============================================================================
 *  Stripe account acct_1SyKpPEPXDHjPrap (live). After checkout, Stripe shows
 *  its own confirmation page (no redirect back to this site). The PDF files
 *  are emailed to the buyer manually shortly after purchase.
 * ============================================================================
 */

export const BUNDLE_CHECKOUT_URL = 'https://buy.stripe.com/eVq14nebXgkx72Xf5M6Zy00'
export const RIPPLE_BOOK_CHECKOUT_URL = 'https://buy.stripe.com/00wcN55Fr9W93QL5vc6Zy01'
export const PACK_CHECKOUT_URL = 'https://buy.stripe.com/aFadR91pb3xL9b5f5M6Zy02'

export type BuyProduct = {
  key: 'bundle' | 'book' | 'pack'
  badge?: string
  title: string
  price: string
  blurb: string
  includes: string[]
  image: string
  imageAlt: string
  href: string
  cta: string
  featured?: boolean
}

export const BUY_PRODUCTS: BuyProduct[] = [
  {
    key: 'bundle',
    badge: 'Most popular',
    title: 'Complete Protection Bundle',
    price: '$17.99',
    blurb: 'Protect what you’ve built — and who inherits it.',
    includes: [
      'Crypto Inheritance Checklist',
      'Crypto Inheritance Printable Workbook',
      'Beneficiary Access Template',
      'Asset Protection Starter Guide',
      'Trust & Titling Starter Checklist',
    ],
    image: '/images/products/cover-complete-protection-bundle.png',
    imageAlt: 'Complete Protection Bundle cover',
    href: BUNDLE_CHECKOUT_URL,
    cta: 'Get the Bundle — $17.99',
    featured: true,
  },
  {
    key: 'book',
    title: 'The Ripple Effect (Digital Book)',
    price: '$7.99',
    blurb: 'How XRP is rewriting the rules of global money.',
    includes: ['The full Ripple Effect digital book (PDF)', 'Ripple, XRP, settlement tech & regulatory history'],
    image: '/images/products/cover-ripple-effect-book.png',
    imageAlt: 'The Ripple Effect book cover',
    href: RIPPLE_BOOK_CHECKOUT_URL,
    cta: 'Buy the Ripple Book — $7.99',
  },
  {
    key: 'pack',
    badge: 'Best value',
    title: 'Complete Protection + Ripple Book Pack',
    price: '$19.99',
    blurb: 'Everything in the Bundle plus The Ripple Effect book.',
    includes: ['All 5 Complete Protection Bundle PDFs', '+ The Ripple Effect digital book'],
    image: '/images/products/cover-protection-ripple-pack.png',
    imageAlt: 'Complete Protection + Ripple Book Pack cover',
    href: PACK_CHECKOUT_URL,
    cta: 'Get the Pack — $19.99',
  },
]

export function BuyCard({ p, compact = false }: { p: BuyProduct; compact?: boolean }) {
  return (
    <div
      className={`rounded-2xl border overflow-hidden flex flex-col ${
        p.featured ? 'bg-gradient-to-br from-amber-500/10 to-slate-800 border-amber-500/50' : 'bg-slate-800/70 border-slate-700'
      }`}
      data-product={p.key}
    >
      <img src={p.image} alt={p.imageAlt} width={1200} height={1200} loading="lazy" className="w-full aspect-square object-cover" />
      <div className="p-6 flex flex-col flex-1">
        {p.badge && (
          <span className="self-start text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-full px-3 py-1 mb-3">
            {p.badge}
          </span>
        )}
        <h3 className="text-lg font-bold text-white leading-snug">{p.title}</h3>
        <p className="text-amber-400 text-sm font-medium mt-1 mb-3">{p.blurb}</p>
        {!compact && (
          <ul className="space-y-1.5 mb-4">
            {p.includes.map((i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-amber-400">✓</span>
                {i}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-black text-white">{p.price}</span>
            <span className="text-slate-400 text-xs">one-time · PDFs emailed shortly after purchase</span>
          </div>
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-4 rounded-xl transition-colors"
          >
            {p.cta}
          </a>
          <p className="text-center text-xs text-slate-500 mt-2">Secure checkout powered by Stripe</p>
        </div>
      </div>
    </div>
  )
}

export function BuyCardsGrid({ only, compact }: { only?: BuyProduct['key'][]; compact?: boolean }) {
  const list = only ? BUY_PRODUCTS.filter((p) => only.includes(p.key)) : BUY_PRODUCTS
  return (
    <div className={`grid grid-cols-1 gap-6 ${list.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
      {list.map((p) => (
        <BuyCard key={p.key} p={p} compact={compact} />
      ))}
    </div>
  )
}
