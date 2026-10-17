import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { BuyCard, BUY_PRODUCTS } from '../lib/buy-cards'

// Matched lead magnet for the KEYS Short (Dad's wallet, nobody had the keys):
// a pre-filled fill-in template. Pre-filled templates convert near checklists and attract higher-intent leads.
const CHECKLIST_PDF = '/downloads/Family-Crypto-Letter-Template.pdf'
const CHECKLIST_FILENAME = 'Family-Crypto-Letter-Template.pdf'

// Deliver the PDF instantly after opt-in (no second click needed).
function triggerChecklistDownload() {
  try {
    const a = document.createElement('a')
    a.href = CHECKLIST_PDF
    a.download = CHECKLIST_FILENAME
    a.rel = 'noopener'
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    a.remove()
  } catch {
    // Fallback link stays visible in the success message.
  }
}

export const Route = createFileRoute('/keys')({
  head: () => ({
    meta: [
      { title: 'Free Family Crypto Letter Template | Sentinel Enterprises' },
      {
        name: 'description',
        content:
          'Free pre-filled family crypto letter template: tell one trusted person where your wallet and backup are, never the recovery words. Fill in 8 lines in 10 minutes. Educational only, not financial advice.',
      },
    ],
  }),
  component: KeysPage,
})

function KeysPage() {
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
      triggerChecklistDownload()
    } catch {
      setStatus('error')
    }
  }

  const steps = [
    {
      step: '01',
      title: 'Say who the letter is for',
      description:
        'One trusted person. Write their name and how to reach them. One person who knows the plan beats five people guessing.',
    },
    {
      step: '02',
      title: 'Write WHERE things are, never the words',
      description:
        'Where the device is, where the recovery backup is stored, who holds the PIN hint. The letter never holds the 12 or 24 words, a photo of them, or a PIN.',
    },
    {
      step: '03',
      title: 'Warn them about fake “recovery” help',
      description:
        'Grieving families get targeted. Real help never asks for the recovery words. Anyone who calls or DMs offering to “recover” the wallet is the scam.',
    },
    {
      step: '04',
      title: 'Store it offline and re-check twice a year',
      description:
        'Paper, kept apart from the recovery backup. Tell your person it exists. Re-check it every six months or after any change.',
    },
  ]

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-6">
            From the Short: &ldquo;She found Dad&apos;s wallet. Nobody had the keys.&rdquo;
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Don&apos;t leave your family a locked wallet
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Free fill-in template: a one-page letter that tells one trusted person <strong className="text-white">where</strong>{' '}
            things are, never the recovery words. It&apos;s already filled in with an example, so you just swap in your
            details. About ten minutes.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-8 mb-14">
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              In the Short, the family had the device but nobody knew where the backup was, and three wrong PINs would wipe it.{' '}
              <strong className="text-white">A one-page letter written today fixes that.</strong>
            </p>
            <p className="text-slate-400 leading-relaxed">
              Four steps, plain language. Educational only. Not financial or legal advice.
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

          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-3xl p-10 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-3">Free family crypto letter template</h2>
            <p className="text-slate-400 mb-6">
              Get the printable PDF instantly. It&apos;s pre-filled with an example on every line, so you only swap in
              your own details.
            </p>

            {/* Visible lead-magnet preview: seeing the checklist lifts email opt-ins */}
            <div
              className="mb-8 mx-auto max-w-sm text-left rotate-[-1.5deg] shadow-2xl shadow-black/40"
              aria-hidden="true"
            >
              <div className="bg-white rounded-md border border-slate-200 overflow-hidden">
                <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">PDF preview</span>
                  <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    free · printable
                  </span>
                </div>
                <div className="px-5 py-4">
                  <p className="text-slate-900 font-black text-sm leading-tight mb-1">
                    Family Crypto Letter Template
                  </p>
                  <p className="text-slate-500 text-[11px] mb-3">Example already filled in · 8 lines</p>
                  <ul className="space-y-2">
                    {[
                      'Who it’s for: my sister Dana M.',
                      'Device: fireproof box, hall closet',
                      'Backup: safe-deposit box #214 (not the words)',
                      'PIN hint: ask my attorney. Do not guess.',
                      'Never trust “recovery” DMs or calls',
                    ].map((line) => (
                      <li key={line} className="flex items-start gap-2 text-slate-700 text-[12px] leading-snug">
                        <span className="mt-0.5 inline-block h-3.5 w-3.5 flex-shrink-0 rounded border-2 border-slate-400" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[9px] text-slate-400 border-t border-slate-100 pt-2">
                    Educational only · Not financial advice · Sentinel Enterprises LLC
                  </p>
                </div>
              </div>
            </div>

            {status === 'success' ? (
              <div className="space-y-6 text-left">
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-green-400 text-center">
                  <p className="font-semibold text-lg mb-1">Your letter template is downloading now.</p>
                  <p className="text-sm">We&apos;ll also email a copy (check spam, just in case).</p>
                  <p className="text-sm mt-3">
                    Download didn&apos;t start?{' '}
                    <a
                      href={CHECKLIST_PDF}
                      download={CHECKLIST_FILENAME}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-semibold text-green-300 hover:text-green-200"
                    >
                      Get the Family Crypto Letter Template (PDF)
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
                    The full inheritance and beneficiary-access checklists, plus safe-sending and seed-backup guides,
                    to go with the letter you just downloaded.
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
                <input type="hidden" name="source" value="keys" />
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
                  {status === 'submitting' ? 'Sending…' : 'Get the free template now'}
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

          <div className="bg-gradient-to-br from-amber-500/15 to-slate-800/80 border border-amber-500/40 rounded-3xl p-8 sm:p-10 mb-10 max-w-2xl mx-auto mt-10">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">After the free template</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
              Want the full kit for $17.99?
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              The Complete Protection Bundle adds the full inheritance and beneficiary-access checklists, seed backup
              steps, and safe-sending worksheets, all printable.
            </p>
            <div className="mb-4">
              <BuyCard p={bundle} compact />
            </div>
            <p className="text-slate-500 text-xs text-center">Educational only. Not financial advice.</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/40 rounded-2xl p-6 mb-10 max-w-2xl mx-auto text-center">
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              Want a device your family can find and recover from a written backup? An air-gapped hardware wallet keeps
              keys off the internet.
            </p>
            <a
              href="https://www.ellipal.com/?rfsn=8708468.a45049"
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 text-sm font-semibold"
            >
              See the ELLIPAL wallet we use #ad →
            </a>
            <p className="mt-2 text-slate-500 text-xs">#ad (affiliate)</p>
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
