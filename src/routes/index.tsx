import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBarSection />
      <FreeLearningSection />
      <ValueLadderSection />
      <PaidProductsSection />
      <AffiliateToolsSection />
      <SentinelSquadTeaser />
      <BuiltForYouSection />
      <EmailSignupSection />
    </>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
            Free Education. Practical Protection. Smarter Decisions.
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Learn How Money Is Changing.
            <span className="text-amber-400"> Protect What You Build.</span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed mb-6 max-w-2xl">
            Sentinel Enterprises helps working families and crypto holders understand the changing financial system, protect their digital assets, and make smarter money decisions.
          </p>
          <p className="text-base text-amber-400/80 font-medium mb-10 max-w-2xl">
            Start free. Go deeper if you want more. Use better tools. Protect what you build.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
                          href="/crypto-inheritance-checklist"
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
            >
                            Get the Free Crypto Checklist
            </a>
            <Link
              to="/guides"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-lg rounded-xl border border-white/20 transition-all"
            >
                            See Guides & Bundle →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustBarSection() {
  const pillars = ['Free Education First', 'No Hype or Fear Tactics', 'Beginner-Friendly', 'Practical and Ethical', 'Business-Focused Brand']
  return (
    <section className="bg-slate-950 border-y border-slate-800 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {pillars.map((p) => (
            <div key={p} className="flex items-center gap-2 text-slate-400 text-sm">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FreeLearningSection() {
  const topics = [
    { icon: 'book', title: 'How Money Is Changing', description: 'Understand ISO 20022, XRP, and what the shift to the new financial system means for everyday people in plain English.', link: '/blog', linkText: 'Read Free Articles' },
    { icon: 'lock', title: 'Crypto and Digital Asset Safety', description: 'Learn self-custody basics, wallet security, seed phrase protection, and how to pass digital assets to heirs without losing them.', link: '/blog', linkText: 'Explore Crypto Guides' },
    { icon: 'shield', title: 'Asset and Wealth Protection', description: 'Discover how trusts, titling strategies, and basic legal structures protect what you own even on a working-family budget.', link: '/services', linkText: 'Learn Asset Protection' },
    { icon: 'money', title: 'Caregiver Tax Basics', description: 'Most family caregivers overpay taxes without knowing it. We break down the deductions and credits you may be missing.', link: '/crypto-inheritance-checklist', linkText: 'Get the Free Checklist' },
    { icon: 'video', title: 'Video Walkthroughs', description: 'Step-by-step video guides for setting up hardware wallets, understanding XRP, and protecting your crypto all free to watch.', link: '/videos', linkText: 'Watch Free Videos' },
    { icon: 'download', title: 'Free Downloads and Checklists', description: 'Practical PDFs you can use today including crypto inheritance checklists, caregiver tax guides, and more. No payment required.', link: '/downloads', linkText: 'Browse Free Downloads' },
  ]
  return (
    <section id="free-learning" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Free for Everyone</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
            Start Here - Real Education, No Cost
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Everything below is free. We believe the best way to earn your trust is to give you something genuinely useful before asking for anything in return.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((t) => (
            <div key={t.title} className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-7 flex flex-col hover:border-amber-500/50 transition-colors">
              <h3 className="text-lg font-bold text-white mb-3">{t.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{t.description}</p>
              <Link to={t.link as '/blog'} className="text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors">
                {t.linkText} &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ValueLadderSection() {
  const steps = [
    { step: '01', label: 'Free', title: 'Learn for Free', description: 'Articles, guides, videos, and checklists all free. Build your foundation here.', cta: 'Browse Free Resources', link: '/downloads', highlight: false },
    { step: '02', label: 'Beginner', title: 'Starter Guides and Bundles', description: 'Affordable PDFs and workbooks that give you a clear actionable plan to follow.', cta: 'See Beginner Products', link: '/guides', highlight: true },
    { step: '03', label: 'Advanced', title: 'Deep-Dive Premium Guides', description: 'Detailed strategy for crypto IRAs, XRP, ISO 20022, and advanced asset protection.', cta: 'Explore Premium Guides', link: '/guides', highlight: false },
    { step: '04', label: 'Tools', title: 'Trusted Affiliate Tools', description: 'Vetted platforms we recommend including wallets, exchanges, and IRAs that fit the lessons you are learning.', cta: 'See Recommended Tools', link: '/partners', highlight: false },
  ]
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">How It Works</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">Your Path from Free to Protected</h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">Start wherever you are. Go as deep as you want. There is no pressure, only a clear path forward.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.step} className={'rounded-2xl p-7 flex flex-col transition-colors ' + (s.highlight ? 'bg-amber-500/10 border-2 border-amber-500/50' : 'bg-slate-800/60 border border-slate-700/50 hover:border-amber-500/30')}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-amber-400 font-black text-2xl">{s.step}</span>
                <span className={'text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ' + (s.highlight ? 'bg-amber-500 text-slate-900' : 'bg-slate-700 text-slate-400')}>{s.label}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{s.description}</p>
              <Link to={s.link as '/guides'} className="text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors">{s.cta} &rarr;</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const BUNDLE_CHECKOUT_URL = 'https://buy.stripe.com/5kQ00jaXfb7U8fz2XfdIA06'

function PaidProductsSection() {
  const included = ['Crypto Inheritance Checklist', 'Crypto Inheritance Fillable Workbook', 'Beneficiary Access Template', 'Caregiver Tax Savings Guide', 'Caregiver Deduction Checklist', 'Asset Protection Starter Guide', 'Trust and Titling Starter Checklist']
  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Go Deeper</span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">The Complete Protection Bundle</h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto leading-relaxed">Ready to go beyond the free content? This bundle gives you every guide, workbook, checklist, and template - the complete follow-along system for protecting your assets, your crypto, and your caregiver tax savings.</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/30 rounded-3xl p-8 sm:p-10 lg:p-12">
          <p className="text-white font-semibold text-xs uppercase tracking-wider mb-6 text-center">All 7 Resources Included - One Price, Lifetime Access</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3">
                <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-slate-200 text-sm font-medium leading-snug">{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-white">$17.99</span>
              <span className="text-slate-400 text-sm">one-time, lifetime access</span>
            </div>
            <a href={BUNDLE_CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-10 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40">
              Get the Complete Bundle - $17.99
            </a>
            <p className="text-slate-500 text-xs">Secure checkout via Stripe. One-time payment. No subscription.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function AffiliateToolsSection() {
  const tools = [
    { name: 'iTrustCapital', category: 'Crypto IRA and Retirement', description: 'Hold crypto inside a tax-advantaged IRA. A smart move for long-term holders who want to grow wealth with fewer tax surprises.', cta: 'Start a Crypto IRA', href: 'https://www.itrustcapital.com/?referral_id=UOHKD3', code: 'UOHKD3' },
    { name: 'Uphold', category: 'Exchange and Multi-Asset Wallet', description: 'A beginner-friendly exchange to buy, sell, and swap crypto, metals, and more. A solid on-ramp before moving to cold storage.', cta: 'Join Uphold', href: 'https://wallet.uphold.com/signup?referral=bfb826d80a&campaign=uw_p_d_w_acq_raf&utm_source=raf&utm_medium=referafriend', code: undefined },
    { name: 'Tangem', category: 'Tap-to-Sign Card Wallet', description: 'A hardware wallet the size of a credit card. Tap it to your phone to sign - no cables, no charging, no seed phrase to lose.', cta: 'Get Tangem', href: 'https://tangem.com/en/pricing/?promocode=FUSB6E', code: 'FUSB6E' },
  ]
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Trusted Tools</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">Tools We Recommend and Actually Use</h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">These affiliate partners are vetted for security, simplicity, and genuine usefulness. We only recommend tools that support what we teach.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {tools.map((t) => (
            <div key={t.name} className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-7 flex flex-col hover:border-amber-500/50 transition-colors">
              <h3 className="text-xl font-bold text-white">{t.name}</h3>
              <p className="text-amber-400 text-sm font-medium mb-4">{t.category}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{t.description}</p>
              {t.code && (
                <div className="inline-flex items-center gap-2 self-start mb-5 px-3 py-1.5 bg-slate-900/80 border border-slate-700 rounded-lg">
                  <span className="text-slate-500 text-xs uppercase tracking-wider">Code</span>
                  <span className="text-amber-400 font-mono font-semibold text-sm">{t.code}</span>
                </div>
              )}
              <a href={t.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm rounded-xl transition-colors">{t.cta} &rarr;</a>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/partners" className="text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors">See all recommended tools and partners &rarr;</Link>
          <p className="mt-2 text-slate-600 text-xs">Some links are affiliate links. We may earn a commission at no extra cost to you.</p>
        </div>
      </div>
    </section>
  )
}

function SentinelSquadTeaser() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-3xl p-8 sm:p-10 lg:p-12 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
            New Animated Series - Coming Soon
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Meet the <span className="text-amber-400">Sentinel Squad</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">A family-friendly animated series that turns asset protection, crypto self-custody, and caregiver tax savings into stories the whole household can enjoy.</p>
          <Link to="/sentinel-squad" className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40">
            Meet the Squad &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}

function BuiltForYouSection() {
  const bullets = [
    'You are a working family with assets to protect but no eight-figure trust budget',
    'You are a caregiver who has been overpaying taxes for years and did not know it',
    'You hold crypto and want your heirs to inherit it, not lose it forever',
    'You want to understand XRP, ISO 20022, and the changing financial system without the jargon',
    'You want practical guidance in plain English, not legalese or hype',
  ]
  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Who This Is For</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white leading-tight">Sentinel Is Built for You If</h2>
            <p className="mt-4 text-slate-400 leading-relaxed">You do not need to be wealthy to protect what you have built. You just need the right guidance, clear, practical, and honest.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="#free-learning" className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-colors text-sm">Start Learning Free</a>
              <Link to="/guides" className="inline-flex items-center justify-center px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-colors text-sm">Browse Paid Guides</Link>
            </div>
          </div>
          <div className="space-y-4">
            {bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-4 bg-slate-800/40 border border-slate-700/40 rounded-xl p-4">
                <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function EmailSignupSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const formData = new FormData(e.currentTarget)
      await fetch('/__forms.html', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(formData as any).toString() })
      setStatus('success')
      setEmail('')
    } catch { setStatus('error') }
  }
  return (
    <section id="email-signup" className="py-24 bg-slate-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-3xl p-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">Free Resource</span>
          <h2 className="text-3xl font-bold text-white mb-3">Get the Free Caregiver Tax Checklist</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">7 deductions and credits most family caregivers miss, delivered instantly to your inbox. No spam. Unsubscribe anytime.</p>
          {status === 'success' ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-green-400">
              <p className="font-semibold text-lg mb-1">Checklist sent!</p>
              <p className="text-sm">Check your inbox (and spam folder, just in case).</p>
              <Link to="/crypto-inheritance-checklist" className="inline-flex items-center gap-1 mt-3 text-amber-400 hover:text-amber-300 text-sm font-medium">Explore our crypto inheritance guide &rarr;</Link>
            </div>
          ) : (
            <form name="caregiver-checklist" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input type="hidden" name="form-name" value="caregiver-checklist" />
              <p className="hidden"><label>Do not fill this: <input name="bot-field" /></label></p>
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
              <button type="submit" disabled={status === 'submitting'} className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap">{status === 'submitting' ? 'Sending' : 'Send My Checklist'}</button>
            </form>
          )}
          {status === 'error' && <p className="mt-3 text-red-400 text-sm">Something went wrong. Please try again.</p>}
          <p className="mt-4 text-slate-500 text-xs">We respect your privacy. No spam, ever. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  )
      }
