import { createFileRoute } from '@tanstack/react-router'
import { formatPrice, PRODUCTS } from '../lib/products'

export const Route = createFileRoute('/videos')({
  component: VideosPage,
})

const CHANNEL_URL = 'https://www.youtube.com/@JenaeSentinel'

/*
 * ============================================================================
 *  PAID VIDEO OFFER  +  AFFILIATE TOOLS  (this file)
 * ============================================================================
 *  • The "Crypto Inheritance Masterclass" section below is the PAID VIDEO
 *    OFFER. Its "Buy" button opens Stripe Checkout via the create-checkout
 *    function — no payment link to paste. (Its price lives in
 *    src/lib/products.ts under `crypto-inheritance-masterclass`.)
 *      - 🔵 Upload the companion workbook to /public/pdfs/ and point the
 *        delivery at /thank-you (see src/routes/thank-you.tsx).
 *  • The "Recommended Tools" cards are AFFILIATE links.
 *      - 🔵 REPLACE each `href` in RECOMMENDED_TOOLS with your real affiliate
 *        URL. The placeholders read https://affiliate-link-here.com/...
 * ============================================================================
 */

const MASTERCLASS = {
  // Maps to the catalog in src/lib/products.ts (drives price + Stripe charge).
  productId: 'crypto-inheritance-masterclass' as const,
  title: 'Crypto Inheritance Masterclass',
  // The recommended hardware wallet shown inside the offer (affiliate link).
  walletAffiliateUrl: 'https://tangem.com/en/pricing/?promocode=FUSB6E',
  learn: [
    'Build an inheritance-ready plan for Bitcoin, XRP, and other digital assets',
    'Set up cold storage your heirs can actually access — without lost seed phrases',
    'Create a beneficiary access plan that keeps you secure today',
    'Properly fund a trust with digital assets (generic estate language won\'t cut it)',
    'Test your plan so it works when your family needs it most',
  ],
}

type Tool = {
  name: string
  benefit: string
  // 🔵 REPLACE each href with your real affiliate link.
  href: string
}

const RECOMMENDED_TOOLS: Tool[] = [
  {
    name: 'Tangem Wallet',
    benefit: 'A tap-to-sign card wallet — cold storage as simple as tapping your phone.',
    href: 'https://tangem.com/en/pricing/?promocode=FUSB6E',
  },
  {
    name: 'ELLIPAL Wallet',
    benefit: 'A fully air-gapped wallet with no USB or Bluetooth — keys never touch the internet.',
    href: 'https://www.ellipal.com/?rfsn=8708468.a45049',
  },
  {
    name: 'Crypto Security Toolkit',
    benefit: 'A trusted resource for seed-phrase backups and hardened self-custody.',
    // 🔵 REPLACE with your real affiliate link (no URL on file yet).
    href: 'https://affiliate-link-here.com/security-tool',
  },
]

type Video = {
  id: string
  title: string
  description: string
}

type VideoGroup = {
  icon: string
  label: string
  items: Video[]
}

const groups: VideoGroup[] = [
  {
    icon: '₿',
    label: 'XRP & The New Financial Order',
    items: [
      {
        id: 'RHKZVhSMWkE',
        title: 'SBI CEO: XRP & Regulatory Clarity',
        description:
          'A look at how regulatory clarity and institutional adoption — including comments from SBI’s CEO — are shaping the future of XRP.',
      },
      {
        id: 'hc4XJktTf68',
        title: 'The New Financial Order — Audiobook Presentation',
        description:
          'An audiobook-style presentation on the shifting global financial system and what it means for everyday holders.',
      },
      {
        id: 'gruxCAPQWgw',
        title: 'The New Financial Order — Take Control',
        description:
          'Why self-custody and a plan of your own matter as the financial system changes around us.',
      },
      {
        id: 'BH8TsbOeM1E',
        title: 'XRP — The Global Payment',
        description:
          'How XRP is positioned for fast, low-cost cross-border payments and global settlement.',
      },
      {
        id: 'f0NAbB9YjMQ',
        title: 'XRP — Global Standard',
        description:
          'The case for XRP as a global standard for value transfer and what holders should understand.',
      },
    ],
  },
  {
    icon: '🔒',
    label: 'Self-Custody & Hardware Wallets',
    items: [
      {
        id: 'WNlgRXtUtK4',
        title: 'Tangem Wallet — The Complete Step-by-Step Guide',
        description:
          'A full walkthrough of setting up and using the Tangem card wallet for simple, secure cold storage.',
      },
      {
        id: '3ziWQgjFwKQ',
        title: 'The Sentinel Guide to Tangem Setup',
        description:
          'A quick-start guide to getting your Tangem wallet up and running and your keys under your control.',
      },
      {
        id: 'VGUBgFpx-0U',
        title: 'Ellipal Steel — Protect Your Crypto Wealth',
        description:
          'Using the air-gapped ELLIPAL hardware wallet and steel backup to protect crypto wealth offline.',
      },
      {
        id: '1MB84vFCDds',
        title: 'How to Update ELLIPAL Firmware',
        description:
          'Step-by-step instructions for safely updating the firmware on your ELLIPAL hardware wallet.',
      },
      {
        id: '2CFabC1XVj4',
        title: 'Protect Your Seed Phrase: The 12 Words',
        description:
          'Why your recovery phrase is everything, and how to store those words so your assets stay yours.',
      },
    ],
  },
]

function VideosPage() {
  return (
    <>
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">
              Watch & Learn
            </span>
            <h1 className="mt-2 text-4xl sm:text-5xl font-black text-white leading-tight mb-6">Video Library</h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Short, practical videos on XRP, self-custody, and protecting your crypto with hardware wallets — straight
              from the Sentinel Enterprises YouTube channel.
            </p>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
              </svg>
              Visit our YouTube channel
            </a>
          </div>
        </div>
      </section>

      {/* ===== PAID VIDEO OFFER: Crypto Inheritance Masterclass ===== */}
      <MasterclassSection />

      <section className="pb-24 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-white">Free Videos</h2>
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">From YouTube</span>
          </div>

          {groups.map((group) => (
            <div key={group.label}>
              <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
                <span aria-hidden="true">{group.icon}</span>
                {group.label}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {group.items.map((item) => (
                  <VideoCard key={item.id} {...item} />
                ))}
              </div>
            </div>
          ))}

          <p className="text-slate-500 text-xs leading-relaxed border-t border-slate-800 pt-8">
            These videos are provided for educational purposes only. Sentinel Enterprises LLC is not a licensed attorney,
            financial advisor, or fiduciary. Nothing in these videos constitutes legal, tax, or financial advice.
          </p>
        </div>
      </section>

      {/* ===== AFFILIATE: Recommended Tools ===== */}
      <RecommendedToolsSection />
    </>
  )
}

function MasterclassSection() {
  return (
    <section className="py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-2 border-amber-500/40 rounded-3xl p-8 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Sales copy + CTA */}
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
                Premium Masterclass
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                The {MASTERCLASS.title}
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                Most crypto is lost forever when its owner passes — not stolen, just inaccessible. This masterclass walks
                you through the exact plan that lets your family inherit your digital assets with confidence.
              </p>

              <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-5 mb-6">
                <p className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Your premium bundle</p>
                <ul className="space-y-2.5">
                  {[
                    '1 paid training video (full masterclass)',
                    '1 companion PDF workbook + checklist',
                    '1 recommended hardware wallet (affiliate)',
                  ].map((item) => (
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

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-black text-white">{formatPrice(PRODUCTS[MASTERCLASS.productId].amountCents)}</span>
                <span className="text-slate-400 text-sm">one-time · lifetime access</span>
              </div>

              {/* Opens Stripe's hosted payment page directly in a new tab. */}
              <a
                href="https://buy.stripe.com/28E3cvghzcbY67r2XfdIA05"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
              >
                Buy the Masterclass
              </a>
              <p className="mt-3 flex items-center gap-1.5 text-slate-500 text-xs">
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

            {/* What you'll learn */}
            <div className="bg-slate-900/40 border border-slate-700/50 rounded-2xl p-7">
              <h3 className="text-xl font-bold text-white mb-5">What You&apos;ll Learn</h3>
              <ul className="space-y-4">
                {MASTERCLASS.learn.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                    <span className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              {/* Recommended hardware wallet — affiliate link bundled with the offer */}
              <div className="mt-7 pt-6 border-t border-slate-700/50">
                <p className="text-white font-semibold text-xs uppercase tracking-wider mb-2">
                  Recommended hardware wallet
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">
                  Pair the masterclass with the cold-storage device we use and recommend.
                </p>
                {/* 🔵 REPLACE `MASTERCLASS.walletAffiliateUrl` (top of file) with your affiliate link. */}
                <a
                  href={MASTERCLASS.walletAffiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm rounded-xl border border-white/10 transition-colors"
                >
                  View Recommended Wallet →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function RecommendedToolsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Recommended Tools</span>
          <h2 className="mt-2 text-3xl font-bold text-white">Gear We Trust for Self-Custody</h2>
          <p className="mt-3 text-slate-400 leading-relaxed">
            The hardware and resources we point clients to first. Some links are affiliate links — we may earn a
            commission at no extra cost to you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RECOMMENDED_TOOLS.map((tool) => (
            <div
              key={tool.name}
              className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 flex flex-col hover:border-amber-500/50 transition-colors"
            >
              <h3 className="text-lg font-bold text-white mb-2">{tool.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{tool.benefit}</p>
              {/* 🔵 REPLACE `tool.href` (in RECOMMENDED_TOOLS at top of file) with your affiliate link. */}
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
  )
}

function VideoCard({ id, title, description }: Video) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden flex flex-col hover:border-amber-500/50 transition-colors">
      <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
