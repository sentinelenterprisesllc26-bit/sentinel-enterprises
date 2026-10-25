import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { BuyCard, BUY_PRODUCTS } from '../lib/buy-cards'

export const Route = createFileRoute('/will')({
  head: () => ({
    meta: [
      { title: 'Free Will & Legacy Checklist | Sentinel Enterprises' },
      { name: 'description', content: "Don't leave your family a puzzle. A free, plain-language checklist for what to update after a new baby, marriage, divorce, move, or new assets, including crypto. Educational only." },
    ],
  }),
  component: WillChecklistPage,
})

function WillChecklistPage() {
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
    { step: '01', title: 'Update Your Will After Every Big Life Change', description: 'New baby, marriage, divorce, a death in the family, a move to another state, or new assets. An old will can leave out the people you meant to protect.' },
    { step: '02', title: 'Check Every Beneficiary Form', description: 'Life insurance, retirement accounts, and many bank accounts pass by beneficiary form, not by your will. Make sure the names on file are current.' },
    { step: '03', title: 'Name a Guardian for Minor Children', description: 'If you have kids under 18, decide who would raise them and put it in writing, with a backup choice.' },
    { step: '04', title: 'List What You Own and Where the Papers Are', description: 'Home, vehicles, accounts, policies, and digital assets like crypto. Your executor cannot protect what they cannot find.' },
    { step: '05', title: 'Make a Plan for Digital Assets and Passwords', description: 'Phones, email, online accounts, and crypto wallets need an access plan your family can actually follow, without handing out passwords today.' },
    { step: '06', title: 'Tell Your Executor Where Everything Is', description: 'One handwritten note in a drawer is not a plan. Keep one organized place, and make sure the right person knows how to find it.' },
    { step: '07', title: 'Ask Whether a Trust Fits Your Situation', description: 'A trust can help some families avoid probate and keep things private. A licensed estate attorney can tell you if it makes sense for you.' },
    { step: '08', title: 'Review It Every Few Years', description: 'Set a reminder. Laws, families, and assets change, and your plan should keep up.' },
  ]

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-6">
            Free Resource
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Don&apos;t Leave Your Family a Puzzle</h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            The free Will &amp; Legacy Checklist: what to update after a new baby, marriage, divorce, move, or new assets (including crypto)
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-8 mb-14">
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              Famous families have spent years in court over wills that were never updated, or never written.{' '}
              <strong className="text-white">The fix is usually simple, and it starts with a checklist.</strong>
            </p>
            <p className="text-slate-400 leading-relaxed">
              These 8 steps cover what most families forget. Go through them tonight, then get the full checklist sent to your inbox.
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
            <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">Ready to go further?</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
              Put the whole plan in one place
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              The Complete Protection Bundle walks you through beneficiary access, inheritance checklists, and digital-asset backups, step by step,
              so your family isn&apos;t left guessing.
            </p>
            <div className="mb-4">
              <BuyCard p={bundle} compact />
            </div>
            <p className="text-slate-500 text-xs text-center">Educational only. Not legal or financial advice.</p>
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
                  {status === 'submitting' ? 'Sending…' : 'Send Me the Checklist'}
                </button>
              </form>
            )}

            {status === 'error' && (
              <p className="mt-3 text-red-400 text-sm">Something went wrong. Please try again.</p>
            )}

            <p className="mt-4 text-slate-500 text-xs">We respect your privacy. No spam, ever.</p>
            <p className="mt-2 text-slate-500 text-xs">Educational only, not legal or financial advice.</p>
          </div>

          <div className="text-center mt-10 space-y-2">
            <p>
              <Link to="/guides" className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors">
                See all guides &amp; products →
              </Link>
            </p>
            <p>
              <Link to="/crypto-inheritance-checklist" className="text-slate-500 hover:text-slate-400 text-xs transition-colors">
                Hold crypto? See the Crypto Inheritance Checklist
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
