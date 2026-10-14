import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { BuyCard, BUY_PRODUCTS } from '../lib/buy-cards'

// Matched lead magnet: same 4 checks as the "She pasted the lookalike" Short and this page.
const CHECKLIST_PDF = '/downloads/Lookalike-Address-Checklist.pdf'
const CHECKLIST_FILENAME = 'Lookalike-Address-Checklist.pdf'

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

export const Route = createFileRoute('/lookalike')({
  head: () => ({
    meta: [
      { title: 'Lookalike Address Check: Stop Address Poisoning | Sentinel Enterprises' },
      {
        name: 'description',
        content:
          'Free 1-page lookalike checklist (about 30 seconds): 4 checks that stop address poisoning, clipboard swaps, and zero-dollar transfer scams before you hit send. Educational only, not financial advice.',
      },
    ],
  }),
  component: LookalikePage,
})

function LookalikePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [quizPick, setQuizPick] = useState<'A' | 'B' | null>(null)
  const bundle = BUY_PRODUCTS.find((x) => x.key === 'bundle')!

  // Demo-only fake addresses (not real wallets). Same start/end; middle differs — classic lookalike pattern.
  const demoSafe = 'rN7n7otQDd6FczFgLdkpqkqP4EXAMPLESAFE01'
  const demoLookalike = 'rN7n7otQDd6FczFgLdFAKEpqkqP4EXAMPLESAFE01'
  const quizCorrect: 'A' | 'B' = 'B' 

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
            Most people only glance at the first and last characters of a crypto address — and that&apos;s exactly what
            lookalike scams rely on. Free 1-page checklist: 4 checks that stop address poisoning, clipboard swaps, and
            zero-dollar transfer traps before you hit send.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800/60 border border-amber-500/30 rounded-3xl p-6 sm:p-8 mb-14">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2 text-center">10-second check</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 text-center">Can you spot the lookalike?</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 text-center max-w-xl mx-auto">
              Both addresses start and end the same. One is the trap. Tap which one you would <em className="not-italic text-slate-300">not</em> send to.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {(
                [
                  { id: 'A' as const, label: 'Address A', value: demoSafe },
                  { id: 'B' as const, label: 'Address B', value: demoLookalike },
                ] as const
              ).map((opt) => {
                const picked = quizPick === opt.id
                const isCorrect = opt.id === quizCorrect
                let border = 'border-slate-600 hover:border-amber-500/60'
                if (quizPick) {
                  if (isCorrect) border = 'border-green-500/70'
                  else if (picked) border = 'border-red-500/70'
                  else border = 'border-slate-700 opacity-60'
                }
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQuizPick(opt.id)}
                    aria-pressed={picked}
                    className={`text-left rounded-2xl border bg-slate-900/80 p-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${border}`}
                  >
                    <span className="block text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">{opt.label}</span>
                    <span className="block font-mono text-[11px] sm:text-xs text-slate-200 break-all leading-relaxed">{opt.value}</span>
                  </button>
                )
              })}
            </div>
            {quizPick && (
              <div
                className={`rounded-xl p-4 text-sm leading-relaxed ${
                  quizPick === quizCorrect
                    ? 'bg-green-500/10 border border-green-500/30 text-green-300'
                    : 'bg-red-500/10 border border-red-500/30 text-red-300'
                }`}
                role="status"
              >
                {quizPick === quizCorrect ? (
                  <p>
                    Nice catch. Address B sneaks <span className="font-mono text-white">FAKE</span> into the middle while
                    keeping the familiar start and end. That&apos;s address poisoning in one glance.
                  </p>
                ) : (
                  <p>
                    Easy to miss. Address B is the lookalike — the middle has <span className="font-mono text-white">FAKE</span>{' '}
                    while the start and end still match Address A. Scammers design for a quick glance.
                  </p>
                )}
                <p className="mt-2 text-slate-400">
                  Grab the free 1-page checklist below so this becomes a 10-second habit before every send.
                </p>
              </div>
            )}
          </div>

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

          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-3xl p-10 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-3">Free 1-page lookalike checklist</h2>
            <p className="text-slate-400 mb-6">
              Get the PDF instantly — and we&apos;ll email a copy too. Same 4 checks from the Short, printable.
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
                    1 page · free
                  </span>
                </div>
                <div className="px-5 py-4">
                  <p className="text-slate-900 font-black text-sm leading-tight mb-1">Lookalike Address Checklist</p>
                  <p className="text-slate-500 text-[11px] mb-3">4 checks before every crypto send</p>
                  <ul className="space-y-2">
                    {[
                      'Never copy an address from history',
                      'Check the whole address, not just the ends',
                      'Confirm on the wallet’s own screen',
                      'A test send is not a safety check',
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
                  <p className="font-semibold text-lg mb-1">Your checklist is downloading now.</p>
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
                      Get the Lookalike Address Checklist (PDF)
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
                  {status === 'submitting' ? 'Sending…' : 'Get the free checklist now'}
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

          <div className="bg-gradient-to-br from-amber-500/15 to-slate-800/80 border border-amber-500/40 rounded-3xl p-8 sm:p-10 mb-10 max-w-2xl mx-auto">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">After the free checklist</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
              Want the full kit for $17.99?
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              The Complete Protection Bundle adds safe-sending worksheets, seed backup steps, beneficiary access, and
              inheritance checklists — the printable pack that goes with the 4 checks above.
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
