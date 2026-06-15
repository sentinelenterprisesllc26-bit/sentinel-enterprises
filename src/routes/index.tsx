import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PaidProductsSection />
      <SentinelSquadTeaser />
      <BuiltForYouSection />
      <EmailSignupSection />
    </>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-900">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
            Practical Wealth Protection for Working Families
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Protect Your Assets &amp; Crypto —{' '}
            <span className="text-amber-400">Without the Elite-Level Trust Budget</span>
          </h1>

          <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl">
            Sentinel Enterprises helps working families and crypto holders build practical wealth protection plans,
            understand self-custody, and stop overpaying on caregiver taxes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#email-signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
            >
              Get Your Free Caregiver Tax Checklist
            </a>
            <Link
              to="/crypto-inheritance-checklist"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-lg rounded-xl border border-white/20 transition-all"
            >
              Download the Crypto Inheritance Checklist →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const services = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 01.75 12c0 .902.108 1.78.308 2.625M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 01.75 12c0 .902.108 1.78.308 2.625M9 12.75L11.25 15 15 9.75"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3"
          />
        </svg>
      ),
      title: 'Asset Protection Planning',
      tagline: 'For working families who think estate planning is only for the wealthy.',
      description:
        "We'll help you understand what a properly drafted trust can actually do — protecting what you've built from lawsuits, creditor claims, divorce, and inheritance tax erosion. Then we connect you with qualified attorneys who can draft it.",
      callout: "You don't need an eight-figure net worth to plan like the wealthy.",
      cta: 'Learn About Asset Protection →',
      link: '/services',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75"
          />
        </svg>
      ),
      title: 'Digital Asset & Crypto Guidance',
      tagline: 'For crypto holders who want to pass holdings to heirs — without lost seed phrases.',
      description:
        'We guide you through cold storage setup, beneficiary access planning, and trust funding for digital assets. Because "my cousin knows where my Bitcoin is" is not an estate plan.',
      callout: 'Build the structure before you need it.',
      cta: 'Explore Crypto Protection →',
      link: '/services',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75"
          />
        </svg>
      ),
      title: 'Caregiver Tax Savings',
      tagline: "For family caregivers who suspect they've been overpaying taxes for years.",
      description:
        'We break down the deductions, credits, and filing strategies most caregivers miss — in plain English, not tax code. Get our free checklist to see what you might be leaving on the table.',
      callout: "Keep more of what you've earned.",
      cta: 'Get the Free Caregiver Tax Checklist →',
      link: '#email-signup',
    },
  ]

  return (
    <section id="services" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">What We Do</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
            Practical Protection for Real Families
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Three focused areas where we help you stop leaving money and assets unprotected.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-8 flex flex-col hover:border-amber-500/50 transition-colors"
            >
              <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 mb-6">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
              <p className="text-amber-400 text-sm font-medium mb-4">{s.tagline}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{s.description}</p>
              <p className="text-white font-semibold text-sm italic mb-6 border-l-2 border-amber-500 pl-3">
                {s.callout}
              </p>
              <Link
                to={s.link as '/services'}
                className="text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors"
              >
                {s.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Homepage paid offer: a single all-in-one bundle. Every paid deliverable is
// sold together for one price via the Stripe checkout link below.
const BUNDLE_CHECKOUT_URL = 'https://buy.stripe.com/14A7sL3uN5NA53nbtLdIA01'

function PaidProductsSection() {
  const included = [
    'Crypto Inheritance Checklist',
    'Crypto Inheritance Fillable Workbook',
    'Beneficiary Access Template',
    'Caregiver Tax Savings Guide',
    'Caregiver Deduction Checklist',
    'Asset Protection Starter Guide',
    'Trust & Titling Starter Checklist',
  ]

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">
            The Complete Protection Bundle
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Get Everything — One Bundle, One Price
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Skip the guesswork. The Complete Protection Bundle gives you every guide, workbook, checklist, and template
            we make — the full follow-along system for protecting your assets, your crypto, and your caregiver tax
            savings.
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/30 rounded-3xl p-8 sm:p-10 lg:p-12">
          <p className="text-white font-semibold text-xs uppercase tracking-wider mb-6 text-center">
            All 7 Resources Included
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {included.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3"
              >
                <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-3.5 h-3.5 text-amber-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-200 text-sm font-medium leading-snug">{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center gap-6">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-white">$17.99</span>
              <span className="text-slate-400 text-sm">one-time · lifetime access</span>
            </div>
            <a
              href={BUNDLE_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-10 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
            >
              Get the Complete Bundle — $17.99
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// Homepage teaser for the upcoming animated series. Full series hub —
// premise, cast, episodes, and launch signup — lives in
// src/routes/sentinel-squad.tsx. This section just drives visitors there.
function SentinelSquadTeaser() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-3xl p-8 sm:p-10 lg:p-12 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
            New Animated Series · Coming Soon
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Meet the <span className="text-amber-400">Sentinel Squad</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            A family-friendly animated series that turns asset protection, crypto self-custody, and caregiver tax
            savings into stories the whole household can enjoy. Episodes are on the way — be first to know when they
            drop.
          </p>
          <Link
            to="/sentinel-squad"
            className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
          >
            Meet the Squad →
          </Link>
        </div>
      </div>
    </section>
  )
}

function BuiltForYouSection() {
  const bullets = [
    "You're a working family with assets to protect — but no eight-figure trust budget",
    "You're a caregiver who's been overpaying taxes for years and didn't know it",
    'You hold crypto and want your heirs to inherit it, not lose it forever',
    "You're tired of being told you need to be wealthy to plan like the wealthy",
    'You want practical guidance from someone who speaks plain English, not legalese',
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Who This Is For</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white leading-tight">
              Sentinel Is Built for You If…
            </h2>
            <p className="mt-4 text-slate-400 leading-relaxed">
              You don't need to be wealthy to protect what you've built. You just need the right guidance.
            </p>
          </div>

          <div className="space-y-4">
            {bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-4 bg-slate-800/40 border border-slate-700/40 rounded-xl p-4">
                <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
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
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      })
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="email-signup" className="py-24 bg-slate-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-3xl p-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
            Free Resource
          </span>
          <h2 className="text-3xl font-bold text-white mb-3">Get the Free Caregiver Tax Checklist</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            7 deductions and credits most family caregivers miss — delivered instantly to your inbox. No spam. Unsubscribe
            anytime.
          </p>

          {status === 'success' ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-green-400">
              <p className="font-semibold text-lg mb-1">Checklist sent!</p>
              <p className="text-sm">Check your inbox (and spam folder, just in case).</p>
              <Link
                to="/crypto-inheritance-checklist"
                className="inline-flex items-center gap-1 mt-3 text-amber-400 hover:text-amber-300 text-sm font-medium"
              >
                Explore our crypto inheritance guide →
              </Link>
            </div>
          ) : (
            <form
              name="caregiver-checklist"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input type="hidden" name="form-name" value="caregiver-checklist" />
              <p className="hidden">
                <label>
                  Don't fill this: <input name="bot-field" />
                </label>
              </p>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'submitting' ? 'Sending…' : 'Send My Checklist'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 text-red-400 text-sm">Something went wrong. Please try again.</p>
          )}

          <p className="mt-4 text-slate-500 text-xs">
            We respect your privacy. No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
