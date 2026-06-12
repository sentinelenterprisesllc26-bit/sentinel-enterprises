import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/partners')({
  component: PartnersPage,
})

type Resource = {
  label: string
  href: string
  primary?: boolean
  pdf?: boolean
}

type Platform = {
  name: string
  category: string
  description: string
  code?: { label: string; value: string }
  links: Resource[]
}

const platforms: Platform[] = [
  {
    name: 'ELLIPAL',
    category: 'Air-gapped hardware wallet',
    description:
      'A fully air-gapped cold wallet — no USB, no Bluetooth, no Wi-Fi. Sign transactions by QR code so your private keys never touch an online device. The starting point Sentinel recommends for serious self-custody.',
    links: [
      { label: 'Shop ELLIPAL', href: 'https://www.ellipal.com/?rfsn=8708468.a45049', primary: true },
      { label: 'Setup guide', href: '/downloads/ELLIPAL_Setup_Guide.pdf', pdf: true },
    ],
  },
  {
    name: 'Tangem',
    category: 'Tap-to-sign card wallet',
    description:
      'A hardware wallet the size of a credit card. Tap it to your phone to sign — no cables, no charging, no seed phrase to lose. Use the code below for a discount at checkout.',
    code: { label: 'Promo code', value: 'FUSB6E' },
    links: [
      { label: 'Get Tangem', href: 'https://tangem.com/en/pricing/?promocode=FUSB6E', primary: true },
      { label: 'Setup guide', href: '/downloads/Tangem_Beginners_Guide.pdf', pdf: true },
    ],
  },
  {
    name: 'Caleb & Brown',
    category: 'Personal crypto brokerage',
    description:
      'A full-service brokerage with a dedicated human broker for every client — ideal for larger buys, OTC trades, and guided portfolio building. Apply the referral code at sign-up.',
    code: { label: 'Referral code', value: 'CU073620' },
    links: [
      { label: 'Open an account', href: 'https://app.calebandbrown.com/signup?referral=CU073620', primary: true },
    ],
  },
  {
    name: 'iTrustCapital',
    category: 'Crypto IRA & retirement',
    description:
      "Buy and hold crypto inside a tax-advantaged IRA. Sentinel's Crypto IRA Playbook walks you through opening and funding an account step by step. Use the referral code to claim your bonus.",
    code: { label: 'Referral code', value: 'UOHKD3' },
    links: [
      { label: 'Start an IRA', href: 'https://www.itrustcapital.com/?referral_id=UOHKD3', primary: true },
      { label: 'Crypto IRA Playbook', href: '/downloads/crypto_ira_playbook.pdf', pdf: true },
    ],
  },
  {
    name: 'Uphold',
    category: 'Exchange & multi-asset wallet',
    description:
      'A beginner-friendly exchange to buy, sell, and swap crypto, metals, and more from one balance. A convenient on-ramp before moving funds to cold storage. Sign up through the link below.',
    links: [
      {
        label: 'Join Uphold',
        href: 'https://wallet.uphold.com/signup?referral=bfb826d80a&campaign=uw_p_d_w_acq_raf&utm_source=raf&utm_medium=referafriend',
        primary: true,
      },
    ],
  },
]

const guides = [
  {
    title: 'XRP Illustrated Guide',
    blurb: 'A plain-English visual primer',
    href: '/downloads/xrp_illustrated_guide.pdf',
  },
  {
    title: 'The XRP & Ripple Book',
    blurb: 'The deeper-dive reference read',
    href: '/downloads/XRP_Ripple_Book.pdf',
  },
]

/*
 * ============================================================================
 *  RECOMMENDED TOOLS  —  AFFILIATE LINK PLACEHOLDERS
 * ============================================================================
 *  Swap each `href` below for your real affiliate URL when you have it.
 *  The placeholders intentionally read  https://affiliate-link-here.com/...
 *  so they are easy to find-and-replace.
 * ============================================================================
 */
type RecommendedTool = {
  name: string
  benefit: string
  // 🔵 REPLACE with your real affiliate link.
  href: string
}

const recommendedTools: RecommendedTool[] = [
  {
    name: 'Tangem Wallet',
    benefit: 'Tap-to-sign card wallet — the simplest way to move crypto into cold storage.',
    href: 'https://tangem.com/en/pricing/?promocode=FUSB6E',
  },
  {
    name: 'ELLIPAL Wallet',
    benefit: 'Fully air-gapped hardware wallet — no USB, no Bluetooth, no online attack surface.',
    href: 'https://www.ellipal.com/?rfsn=8708468.a45049',
  },
  {
    name: 'Crypto Security Toolkit',
    benefit: 'A trusted resource for seed-phrase backups and hardened self-custody.',
    // 🔵 REPLACE with your real affiliate link (no URL on file yet).
    href: 'https://affiliate-link-here.com/security-tool',
  },
]

function PartnersPage() {
  return (
    <>
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Trusted by Sentinel</span>
            <h1 className="mt-2 text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
              Crypto Tools &amp; Guides You Can <span className="text-amber-400">Actually</span> Trust
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-6">
              Explore step-by-step PDFs, video walkthroughs, and referral links for the wallets and platforms Sentinel
              Enterprises recommends — vetted for security, simplicity, and self-custody.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed border-l-2 border-amber-500/40 pl-4">
              Some links below are affiliate links, which means Sentinel Enterprises may earn a commission at no extra
              cost to you. Codes are pre-filled or listed where applicable.
            </p>
          </div>
        </div>
      </section>

      {/* ===== AFFILIATE: Recommended Tools (placeholder links) ===== */}
      <section className="py-20 bg-slate-950 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Recommended Tools</span>
            <h2 className="mt-2 text-3xl font-bold text-white">Start Here for Self-Custody</h2>
            <p className="mt-3 text-slate-400 leading-relaxed">
              The hardware and resources we recommend first. These are affiliate links — we may earn a commission at no
              extra cost to you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedTools.map((tool) => (
              <div
                key={tool.name}
                className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 flex flex-col hover:border-amber-500/50 transition-colors"
              >
                <h3 className="text-lg font-bold text-white mb-2">{tool.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{tool.benefit}</p>
                {/* 🔵 REPLACE `tool.href` (in recommendedTools above) with your affiliate link. */}
                <a
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm rounded-xl transition-colors"
                >
                  View Tool
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="text-3xl font-bold text-white">Recommended platforms</h2>
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">
              {String(platforms.length).padStart(2, '0')} partners
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {platforms.map((p) => (
              <PlatformCard key={p.name} {...p} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="text-3xl font-bold text-white">Free illustrated guides</h2>
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Download · PDF</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((g) => (
              <a
                key={g.title}
                href={g.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 flex items-center gap-5 hover:border-amber-500/50 transition-colors"
              >
                <div className="w-12 h-14 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center text-amber-400 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {g.title}
                  </h3>
                  <p className="text-slate-400 text-sm">{g.blurb}</p>
                </div>
                <span className="text-amber-400 text-sm font-semibold whitespace-nowrap">Download →</span>
              </a>
            ))}
          </div>

          <p className="mt-6 text-slate-500 text-sm">
            Looking for the full library?{' '}
            <Link to="/downloads" className="text-amber-400 hover:text-amber-300 font-semibold">
              Browse all free downloads →
            </Link>
          </p>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-3xl p-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
              Video Walkthroughs
            </span>
            <h2 className="text-3xl font-bold text-white mb-3">Prefer to follow along on screen?</h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Every setup guide above has a companion walkthrough on the Sentinel Enterprises YouTube channel. Subscribe
              to catch new wallet reviews and step-by-step tutorials.
            </p>
            <a
              href="https://www.youtube.com/@JenaeSentinel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Subscribe on YouTube
            </a>
            <p className="mt-4 text-slate-500 text-sm">youtube.com/@JenaeSentinel</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-slate-500 text-xs leading-relaxed">
            <strong className="text-slate-400">Disclosure:</strong> Some links on this page are affiliate or referral
            links. Sentinel Enterprises may earn a commission at no additional cost to you. This page is for educational
            purposes and is not financial advice — always do your own research before buying crypto or choosing a wallet.
          </p>
        </div>
      </section>
    </>
  )
}

function PlatformCard({ name, category, description, code, links }: Platform) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-7 flex flex-col hover:border-amber-500/50 transition-colors">
      <h3 className="text-xl font-bold text-white">{name}</h3>
      <p className="text-amber-400 text-sm font-medium mb-4">{category}</p>
      <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{description}</p>

      {code && (
        <div className="inline-flex items-center gap-2 self-start mb-5 px-3 py-1.5 bg-slate-900/80 border border-slate-700 rounded-lg">
          <span className="text-slate-500 text-xs uppercase tracking-wider">{code.label}</span>
          <span className="text-amber-400 font-mono font-semibold text-sm tracking-wide">{code.value}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className={
              l.primary
                ? 'inline-flex items-center px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm rounded-xl transition-colors'
                : 'inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm rounded-xl border border-white/10 transition-colors'
            }
          >
            {l.pdf && (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            )}
            {l.label}
            {l.pdf ? ' (PDF)' : ''}
          </a>
        ))}
      </div>
    </div>
  )
}
