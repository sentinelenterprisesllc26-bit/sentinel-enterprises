import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { BuyCard, BUY_PRODUCTS } from '../lib/buy-cards'

const CHECKLIST_PDF = '/downloads/Wallet-Security-Self-Custody-Checklist.pdf'

export const Route = createFileRoute('/lookalike')({
  head: () => ({
    meta: [
      { title: 'Lookalike Address Check: Stop Address Poisoning | Sentinel Enterprises' },
      {
        name: 'description',
        content:
          'The free 4-step check that stops address poisoning, clipboard swaps, and zero-dollar transfer scams before you hit send. Educational only, not financial advice.',
      },
    ],
  }),
  component: LookalikePage,
})

function LookalikePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const bundle = BUY_PRODUCTS.find((x) => x.key === 'bundle')!

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const formData = new FormData(e.currentTarget)
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      })
      // Only claim success when Netlify actually saved the submission.
      if (!res.ok) throw new Error(`Form save failed: ${res.status}`)
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  const checks = [
    {
      step: '01',
      title: 'Never copy an address from your history',
      description:
        'Scammers send tiny or zero-dollar transfers from an address that starts and ends like one you use, so it shows up in your recent activity. Always copy from a saved contact or the person directly.',
    },
    {
      step: '02',
      title: 'Check the whole address, not just the ends',
      description:
        'Lookalike addresses copy the first and last few characters. Compare the middle too, in chunks of four, before every send.',
    },
    {
      step: '03',
      title: 'Confirm on the wallet’s own screen',
      description:
        'Clipboard malware can swap what you pasted. A hardware wallet shows the real destination on its own screen, so read the address there before you approve.',
    },
    {
      step: '04',
      title: 'A test send is not a safety check',
      description:
        'A small test going through proves nothing if you paste the big send from history afterward. Re-verify the full address every single time.',
    },
  ]

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-6">
            From the Short: &ldquo;She pasted the lookalike&rdquo;
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">The Lookalike Address Check</h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            4 checks that stop address poisoning, clipboard swaps, and zero-dollar transfer scams before you hit send.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-8 mb-14">
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              Crypto sends can&apos;t be reversed.{' '}
              <strong className="text-white">If you paste the wrong address, the coins are usually gone for good.</strong>
            </p>
            <p className="text-slate-400 leading-relaxed">
              Lookalike addresses are built to pass a quick glance. These four habits take about ten seconds per send.
            </p>
          </div>

          <div className="space-y-4 mb-16">
            {checks.map((s) => (
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

          <div className="bg-gradient-to-br from-amber-500/15 to-slate-800/80 border border-amber-500/40 rounded-3xl p-8 sm:p-10 mb-10 max-w-2xl mx-auto">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">Lock down the rest of your setup</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
              One wrong paste is all it takes
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              The Complete Protection Bundle walks you through safe sending, seed backups, beneficiary access, and
              inheritance checklists, step by step, for less than the cost of one mistake.
            </p>
            <div className="mb-4">
              <BuyCard p={bundle} compact />
            </div>
            <p className="text-slate-500 text-xs text-center">Educational only. Not financial advice.</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/40 rounded-2xl p-6 mb-10 max-w-2xl mx-auto text-center">
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              Want a screen you can trust for check #3? An air-gapped hardware wallet shows the real destination before
              you sign.
            </p>
            <a
              href="https://www.ellipal.com/?rfsn=8708468.a45049"
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 text-sm font-semibold"
            >
              See the ELLIPAL wallet we use (#ad) →
            </a>
            <p className="mt-2 text-slate-500 text-xs">#ad: affiliate link. We may earn a commission at no extra cost to you.</p>
          </div>

          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-3xl p-10 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-3">Get the Free Crypto Safety Checklist</h2>
            <p className="text-slate-400 mb-6">Enter your email and we&apos;ll send it to you.</p>

            {status === 'success' ? (
              <div className="space-y-6 text-left">
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-green-400 text-center">
                  <p className="font-semibold text-lg mb-1">You&apos;re on the list!</p>
                  <p className="text-sm">Check your inbox (and spam folder, just in case).</p>
                  <p className="text-sm mt-3">
                    Can&apos;t wait?{' '}
                    <a
                      href={CHECKLIST_PDF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-semibold text-green-300 hover:text-green-200"
                    >
                      Download the checklist now
                    </a>
                  </p>
                </div>
                <div className="bg-slate-900/60 border border-amber-500/30 rounded-2xl p-6">
                  <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2 text-center">
                    While you&apos;re here
                  </p>
                  <h3 className="text-white font-bold text-xl mb-2 text-center leading-tight">
                    Grab the Complete Protection Bundle for $17.99
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 text-center">
                    Same-day PDF guides for safe sending, seed backups, beneficiary access, and inheritance — the
                    checklists that go with the 4 steps above.
                  </p>
                  <BuyCard p={bundle} compact />
                  <p className="mt-3 text-slate-500 text-xs text-center">Educational only. Not financial advice.</p>
                </div>
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
                <input type="hidden" name="source" value="lookalike" />
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
              <p className="mt-3 text-red-400 text-sm" role="alert">
                That didn&apos;t go through, so you&apos;re not on the list yet. Please try again, or email{' '}
                <a href="mailto:sentinelenterprisesllc26@gmail.com" className="underline">
                  sentinelenterprisesllc26@gmail.com
                </a>
                .
              </p>
            )}

            <p className="mt-4 text-slate-500 text-xs">We respect your privacy. No spam, ever.</p>
          </div>

          <div className="text-center mt-10 space-y-2">
            <p>
              <Link to="/guides" className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors">
                See all guides &amp; products →
              </Link>
            </p>
            <p className="text-slate-500 text-xs">Educational only. Not financial advice.</p>
          </div>
        </div>
      </section>
    </>
  )
}
