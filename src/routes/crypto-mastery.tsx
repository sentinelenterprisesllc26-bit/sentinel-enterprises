import { Link, Outlet, createFileRoute, useRouterState } from '@tanstack/react-router'
import { CheckoutButton } from '../lib/checkout'

export const Route = createFileRoute('/crypto-mastery')({
  component: CryptoMasteryPage,
  head: () => ({
    meta: [
      { title: "Crypto Mastery — Beginner's Guide to Cryptocurrency | Sentinel Enterprises" },
      {
        name: 'description',
        content:
          'A 39-page beginner-friendly cryptocurrency guide covering Bitcoin, blockchain, wallets, buying crypto, security, and more.',
      },
      { property: 'og:title', content: "Crypto Mastery — The Complete Beginner's Guide to Cryptocurrency" },
      {
        property: 'og:description',
        content: 'Master cryptocurrency in simple, everyday language. Instant PDF download after checkout.',
      },
      { property: 'og:image', content: 'https://sentinelenterprisesllc.com/crypto-mastery-cover.png' },
    ],
  }),
})

const topics = [
  ['What Cryptocurrency Is', 'How it works, explained like you are talking to a friend.'],
  ['Blockchain Made Simple', 'Understand what it is and why it matters without the jargon.'],
  ['Bitcoin & Ethereum', 'Mining, the halving, smart contracts, gas fees, and more.'],
  ['Crypto Wallets', 'Hot vs. cold wallets, keys, seed phrases, and essential security.'],
  ['Passive Income Basics', 'Staking, lending, and yield farming explained step by step.'],
  ['Buying Your First Crypto', 'Set up an exchange, deposit funds, and understand order types.'],
  ['Crypto Lingo Dictionary', 'More than 20 key terms decoded in plain English.'],
  ['Bonus: Estate Planning', 'Practical, educational steps for protecting digital assets for heirs.'],
]

const audience = [
  'Complete beginners who want to understand cryptocurrency but do not know where to start',
  'People who have heard about Bitcoin but feel intimidated by technical jargon',
  'Anyone who wants to understand risks before they start investing',
  'Crypto holders who want to learn more about wallets, security, and passive-income concepts',
]

function CheckIcon() {
  return (
    <svg className="w-5 h-5 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function CryptoMasteryPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  if (pathname === '/crypto-mastery/success') {
    return <Outlet />
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 sm:py-28">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute -top-20 right-1/4 w-96 h-96 rounded-full bg-cyan-500 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-amber-500 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          <div>
            <p className="text-cyan-300 font-semibold text-sm uppercase tracking-[0.16em] mb-5">Sentinel Enterprises LLC</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] mb-6">
              Master Cryptocurrency in <span className="text-amber-400">Simple, Everyday Language.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mb-8">
              Even if you are starting from zero. This 39-page guide takes you from “What is Bitcoin?” to understanding how people buy, store, and use cryptocurrency.
            </p>
            <CheckoutButton
              productId="crypto-mastery"
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-950 font-bold text-lg rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
            >
              Get Instant Access — $17
            </CheckoutButton>
            <p className="mt-3 text-sm text-slate-400">One-time payment. Secure checkout through Stripe. Instant PDF download after payment.</p>
            <div className="mt-8 grid sm:grid-cols-3 gap-3 text-sm text-slate-300">
              {['No prior knowledge needed', 'Step-by-step buying guide', 'Bonus estate-planning section'].map((item) => (
                <div key={item} className="flex items-start gap-2"><CheckIcon /> <span>{item}</span></div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src="/crypto-mastery-cover.png"
              alt="Crypto Mastery: The Complete Beginner's Guide to Cryptocurrency"
              className="w-full max-w-sm rounded-2xl border border-amber-400/40 shadow-2xl shadow-black/50"
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">What you will learn</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Inside This 39-Page Guide</h2>
            <p className="text-lg text-slate-400 leading-relaxed">Every key concept is broken into clear, easy-to-understand pieces. No technical background is required.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topics.map(([title, description]) => (
              <article key={title} className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5 hover:border-cyan-400/50 transition-colors">
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">Built for beginners</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-5">Who This Book Is For</h2>
            <ul className="space-y-4">
              {audience.map((item) => (
                <li key={item} className="flex gap-3 text-slate-300 leading-relaxed"><CheckIcon /><span>{item}</span></li>
              ))}
            </ul>
          </div>
          <aside className="rounded-2xl border-l-4 border-amber-400 bg-slate-900 p-7">
            <h3 className="text-xl font-bold text-white mb-3">What Makes It Different</h3>
            <p className="text-slate-400 leading-relaxed">
              Most crypto guides assume you already know the basics. <strong className="text-white">Crypto Mastery</strong> starts from absolute zero and builds knowledge step by step with everyday language and practical examples.
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-20">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-amber-400/40 bg-slate-800/70 p-8 sm:p-10 text-center shadow-xl">
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">Instant digital delivery</p>
            <h2 className="text-3xl font-black text-white">Get Crypto Mastery Today</h2>
            <div className="my-7">
              <span className="text-6xl font-black text-white">$17</span>
              <span className="ml-2 text-slate-400">one-time payment</span>
            </div>
            <ul className="mb-8 space-y-3 text-left text-sm text-slate-300">
              {['39 pages of beginner-friendly crypto education', 'Instant PDF download after payment', 'Read on your phone, tablet, or computer', '28-question quiz and complete answer key'].map((item) => (
                <li key={item} className="flex gap-3"><CheckIcon /><span>{item}</span></li>
              ))}
            </ul>
            <CheckoutButton
              productId="crypto-mastery"
              className="w-full inline-flex items-center justify-center px-8 py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-950 font-bold text-lg rounded-xl transition-all"
            >
              Buy Now — Instant Download
            </CheckoutButton>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">This guide is for educational purposes only and is not financial, investment, tax, or legal advice.</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <Faq question="What format is the e-book?">You receive a PDF you can read on a phone, tablet, laptop, or desktop computer.</Faq>
            <Faq question="Do I need prior crypto knowledge?">No. This guide was written for complete beginners and starts with the fundamentals.</Faq>
            <Faq question="Will it show me how to buy cryptocurrency?">Yes. It explains exchange accounts, depositing funds, first purchases, and common order types in educational, step-by-step language.</Faq>
            <Faq question="Is this financial advice?">No. This e-book is educational only. Always do your own research and speak with licensed professionals before making financial, tax, or legal decisions.</Faq>
          </div>
          <div className="mt-10 text-center">
            <Link to="/guides" className="text-amber-400 hover:text-amber-300 font-semibold">Explore other Sentinel guides →</Link>
          </div>
        </div>
      </section>
    </>
  )
}

function Faq({ question, children }: { question: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-xl border border-slate-700 bg-slate-900">
      <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-white flex items-center justify-between gap-4">
        {question}
        <span className="text-amber-400 text-xl group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
      </summary>
      <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">{children}</p>
    </details>
  )
}
