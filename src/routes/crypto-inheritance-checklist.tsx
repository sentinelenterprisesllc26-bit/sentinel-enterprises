import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { BuyCard, BUY_PRODUCTS } from '../lib/buy-cards'

export const Route = createFileRoute('/crypto-inheritance-checklist')({
  component: CryptoChecklistPage,
})

function CryptoChecklistPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const bundle = BUY_PRODUCTS.find((x) => x.key === 'bundle')!

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

  const steps = [
    {
      step: '01',
      title: 'Document Your Holdings',
      description:
        'Create a complete inventory of what you own, where it\'s stored, and how to access it. Include exchange accounts, wallet addresses, and hardware device locations.',
    },
    {
      step: '02',
      title: 'Choose the Right Storage',
      description:
        'Understand the difference between exchange custody, hot wallets, and cold storage — and why it matters for inheritance. Not all storage methods are inheritable.',
    },
    {
      step: '03',
      title: 'Create a Beneficiary Access Plan',
      description:
        'Design a system where your heirs can access your holdings without compromising your security today. This requires careful planning — not just writing down passwords.',
    },
    {
      step: '04',
      title: 'Fund Your Trust with Digital Assets',
      description:
        'If you have (or need) a trust, learn how to properly include digital assets in the trust structure. Generic estate planning language doesn\'t cover crypto.',
    },
    {
      step: '05',
      title: 'Test Your Plan',
      description:
        'Walk a trusted person through your access plan — without actually giving them access. If they can\'t follow it, your heirs won\'t be able to either.',
    },
  ]

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-6">
            Free Resource
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">The Crypto Inheritance Checklist</h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            5 Essential Steps to Ensure Your Heirs Can Access Your Digital Assets
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-8 mb-14">
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              If you hold Bitcoin, Ethereum, or other digital assets, here's a hard truth:{' '}
              <strong className="text-white">your heirs probably can't access them if something happens to you.</strong>
            </p>
            <p className="text-slate-400 leading-relaxed">
              Exchanges freeze accounts. Seed phrases get lost. Passwords die with their owners. This free checklist
              covers the 5 non-negotiable steps every crypto holder needs.
            </p>
          </div>

          <div className="space-y-4 mb-16">
            {steps.map((s) => (
              <div
                key={s.step}
                className="flex gap-6 bg-slate-800/50 border border-slate-700/40 rounded-xl p-6 items-start"
              >
                <div className="text-3xl font-black text-amber-500/30 font-mono leading-none flex-shrink-0 mt-0.5">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message-matched Bundle CTA (Shorts → protect) */}
          <div className="bg-gradient-to-br from-amber-500/15 to-slate-800/80 border border-amber-500/40 rounded-3xl p-8 sm:p-10 mb-10 max-w-2xl mx-auto">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">When the phone is found — and the seed isn&apos;t</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
              Don&apos;t leave your family guessing where the keys are
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Same problem as the Short: a phone, an exchange app, and no workable backup plan.
              The Complete Protection Bundle walks you through seed backups, beneficiary access, and inheritance checklists — step by step.
            </p>
            <div className="mb-4">
              <BuyCard p={bundle} compact />
            </div>
            <p className="text-slate-500 text-xs text-center">Educational only. Not financial advice.</p>
          </div>

          {/* Email Signup */}
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-3xl p-10 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-3">Get the Full Checklist</h2>
            <p className="text-slate-400 mb-6">Enter your email and we'll send it instantly.</p>

            {status === 'success' ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-green-400">
                <p className="font-semibold text-lg mb-1">Checklist sent!</p>
                <p className="text-sm">Check your inbox (and spam folder, just in case).</p>
              </div>
            ) : (
              <form
                name="crypto-checklist"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input type="hidden" name="form-name" value="crypto-checklist" />
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
                  {status === 'submitting' ? 'Sending…' : 'Send Me the Crypto Checklist'}
                </button>
              </form>
            )}

            {status === 'error' && (
              <p className="mt-3 text-red-400 text-sm">Something went wrong. Please try again.</p>
            )}

            <p className="mt-4 text-slate-500 text-xs">We respect your privacy. No spam, ever.</p>
          </div>

          <div className="text-center mt-10 space-y-2">
            <p>
              <Link to="/guides" className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors">
                See all guides &amp; products →
              </Link>
            </p>
            <p>
              <Link to="/services" className="text-slate-500 hover:text-slate-400 text-xs transition-colors">
                Or explore Digital Asset Guidance services
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
