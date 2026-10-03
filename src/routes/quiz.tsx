import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { BUNDLE_CHECKOUT_URL, RIPPLE_BOOK_CHECKOUT_URL } from '../lib/buy-cards'

export const Route = createFileRoute('/quiz')({
  head: () => ({
    meta: [
      { title: "What's your XRP custody level? — Free quiz | Sentinel Enterprises" },
      {
        name: 'description',
        content:
          'Four honest questions to find the right way to hold your XRP: regulated venue or ETF, Xaman self-custody, hardware wallet, or a split stack. Free, 60 seconds.',
      },
    ],
  }),
  component: QuizPage,
})

/*
 * Free lead-magnet quiz. Email capture goes to Netlify Forms → "xrp-custody-quiz"
 * (skeleton in public/__forms.html; POSTed to /__forms.html like every other form).
 * Scoring logic mirrors the brief's scoreQuiz() exactly.
 */

type Answers = Record<'q1' | 'q2' | 'q3' | 'q4', number | null>

const QUESTIONS: { name: keyof Answers; prompt: string; options: [string, string, string] }[] = [
  {
    name: 'q1',
    prompt: '1. Would you reliably hide a 24-word phrase for ten years?',
    options: [
      'No. I would lose it or screenshot it.',
      'Maybe, if someone walked me through it.',
      'Yes. I already do this for other coins.',
    ],
  },
  {
    name: 'q2',
    prompt: '2. What is the balance, honestly?',
    options: [
      'Small / money I can watch bounce.',
      'Meaningful. Losing it would sting for a year.',
      'Life-changing or part of an estate.',
    ],
  },
  {
    name: 'q3',
    prompt: '3. How do you use XRP?',
    options: [
      'Buy and mostly leave it. Maybe an ETF is fine.',
      'Occasional sends, I want my own wallet.',
      'Long-term vault plus some XRPL apps.',
    ],
  },
  {
    name: 'q4',
    prompt: '4. Who has to be able to find this if you cannot?',
    options: [
      'Just me. If I vanish, so do the coins.',
      'A partner should be able to recover with instructions.',
      'An executor / lawyer / family office must have a path.',
    ],
  },
]

function scoreQuiz(a: Answers): { title: string; body: string } | null {
  const get = (n: keyof Answers) => a[n]
  if ((['q1', 'q2', 'q3', 'q4'] as const).some((n) => get(n) === null)) return null
  const q1 = get('q1') as number
  const q2 = get('q2') as number
  const q3 = get('q3') as number
  const q4 = get('q4') as number
  const s = q1 + q2 + q3 + q4
  let title: string, body: string
  if (q1 === 0 || (q2 === 0 && q3 === 0)) {
    title = 'Level 1 — regulated venue or ETF'
    body =
      'Your honest answers say keys would be the weak point. Use a licensed exchange with allowlists or a spot XRP ETF. That is the safer adult choice, not a lesser one.'
  } else if (s <= 3) {
    title = 'Level 1 to low Level 2'
    body =
      'Start on a regulated venue. If you still want self-custody, install official Xaman and practice with a tiny amount for a month before sweeping size.'
  } else if (s <= 5) {
    title = 'Level 2 — Xaman self-custody'
    body =
      'You can handle an app wallet. Official Xaman, paper backup, test send. Keep trading size on the exchange if you still need it.'
  } else if (q2 === 2 || q4 === 2) {
    title = 'Level 4 thinking — split the stack'
    body =
      'The balance or the estate problem is bigger than a single gadget. Hardware vault for part, qualified custody or ETF for part, written recovery instructions for a human who is not you.'
  } else {
    title = 'Level 3 — hardware wallet'
    body =
      'Buy Ledger or Trezor from the manufacturer. Confirm addresses on the device. Steel backup in two places. Do not connect the vault to new sites.'
  }
  return { title, body }
}

function QuizPage() {
  const [answers, setAnswers] = useState<Answers>({ q1: null, q2: null, q3: null, q4: null })
  const [step, setStep] = useState<'questions' | 'gate' | 'result'>('questions')
  const [warn, setWarn] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const result = scoreQuiz(answers)
  const answersText = QUESTIONS.map((q) => `${q.name}=${answers[q.name] ?? ''}`).join(', ')

  const toGate = () => {
    if (!result) {
      setWarn('Answer all four questions first.')
      return
    }
    setWarn('')
    setStep('gate')
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!result) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const body = new URLSearchParams(new FormData(e.currentTarget) as unknown as Record<string, string>).toString()
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
      if (!res.ok) throw new Error(String(res.status))
      try {
        localStorage.setItem('xrp-fog-quiz', result.title)
      } catch {
        /* storage unavailable */
      }
      setStep('result')
    } catch {
      setSubmitError('Something went wrong sending your email. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="min-h-[80vh] bg-[#0b1f3a] py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8c86a] bg-[#c9a227]/10 border border-[#c9a227]/40 rounded-full px-3 py-1 mb-4">
            Free quiz · 60 seconds
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">What&apos;s your XRP custody level?</h1>
          <p className="text-slate-300 text-lg">
            Four honest questions. Get the custody setup that fits you — and what your family would need if you can&apos;t
            be there.
          </p>
        </div>

        <div className="rounded-3xl border-2 border-[#c9a227]/60 bg-[#0e2748] p-6 sm:p-10 shadow-2xl">
          {step === 'questions' && (
            <div id="quiz">
              {QUESTIONS.map((q) => (
                <fieldset key={q.name} className="mb-8">
                  <legend className="text-white font-bold text-lg mb-3">{q.prompt}</legend>
                  <div className="space-y-2">
                    {q.options.map((label, i) => (
                      <label
                        key={i}
                        className={`flex items-start gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-colors ${
                          answers[q.name] === i
                            ? 'border-[#e8c86a] bg-[#c9a227]/15 text-white'
                            : 'border-white/15 bg-white/5 text-slate-200 hover:border-[#c9a227]/60'
                        }`}
                      >
                        <input
                          type="radio"
                          name={q.name}
                          value={i}
                          checked={answers[q.name] === i}
                          onChange={() => setAnswers((a) => ({ ...a, [q.name]: i }))}
                          className="mt-1 accent-[#c9a227]"
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
              <button
                type="button"
                onClick={toGate}
                className="w-full bg-[#c9a227] hover:bg-[#e8c86a] text-[#0b1f3a] font-black text-lg py-4 rounded-xl transition-colors"
              >
                See my custody level →
              </button>
              {warn && (
                <div id="quizOut" role="alert" className="mt-4 rounded-xl border border-[#e8c86a]/60 bg-[#c9a227]/10 px-4 py-3 text-[#e8c86a] font-semibold">
                  {warn}
                </div>
              )}
            </div>
          )}

          {step === 'gate' && (
            <form
              name="xrp-custody-quiz"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={onSubmit}
            >
              <input type="hidden" name="form-name" value="xrp-custody-quiz" />
              <input type="hidden" name="result_level" value={result?.title ?? ''} />
              <input type="hidden" name="answers" value={answersText} />
              <p className="hidden">
                <label>
                  Don&apos;t fill this out: <input name="bot-field" />
                </label>
              </p>
              <h2 className="text-2xl font-black text-white mb-2">Your result is ready.</h2>
              <p className="text-slate-300 mb-6">Where should we send it? Enter your email to see your custody level.</p>
              <label htmlFor="quiz-email" className="block text-sm font-semibold text-[#e8c86a] mb-2">
                Email
              </label>
              <input
                id="quiz-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-[#e8c86a] mb-4"
              />
              <label className="flex items-start gap-3 text-sm text-slate-200 mb-2">
                <input
                  type="checkbox"
                  name="consent"
                  value="yes"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 accent-[#c9a227]"
                />
                <span>Send me my result and occasional Sentinel Enterprises emails. Unsubscribe anytime.</span>
              </label>
              <p className="text-xs text-slate-400 mb-6">Education only, not financial advice.</p>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#c9a227] hover:bg-[#e8c86a] disabled:opacity-60 text-[#0b1f3a] font-black text-lg py-4 rounded-xl transition-colors"
              >
                {submitting ? 'Sending…' : 'Show my result'}
              </button>
              {submitError && <p className="mt-3 text-red-300 text-sm">{submitError}</p>}
              <button type="button" onClick={() => setStep('questions')} className="mt-4 w-full text-sm text-slate-400 hover:text-white">
                ← Change my answers
              </button>
              <button
                type="button"
                onClick={() => result && setStep('result')}
                className="mt-3 w-full text-sm text-slate-300 hover:text-white underline underline-offset-4"
              >
                Skip email and see my result
              </button>
            </form>
          )}

          {step === 'result' && result && (
            <div>
              <div id="quizOut" className="rounded-2xl border border-[#e8c86a]/60 bg-[#c9a227]/10 p-6 mb-8" data-result={result.title}>
                <p className="text-xs uppercase tracking-widest text-[#e8c86a] font-bold mb-2">Your XRP custody level</p>
                <p className="text-2xl font-black text-white mb-3">
                  <b>{result.title}</b>
                </p>
                <p className="text-slate-200 leading-relaxed">{result.body}</p>
              </div>

              <div className="rounded-2xl bg-[#0b1f3a] border border-white/10 p-6 text-center">
                <img
                  src="/images/products/cover-complete-protection-bundle.png"
                  alt="Complete Protection Bundle cover"
                  width={1200}
                  height={1200}
                  className="w-40 h-40 mx-auto rounded-xl border border-[#c9a227]/50 mb-4"
                />
                <h3 className="text-xl font-black text-white mb-2">Whatever your level, your heirs need a written path.</h3>
                <p className="text-slate-300 text-sm mb-5">
                  The Complete Protection Bundle gives you the crypto inheritance checklist, printable workbook,
                  beneficiary access template, asset protection guide, and trust &amp; titling checklist.
                </p>
                <a
                  href={BUNDLE_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#c9a227] hover:bg-[#e8c86a] text-[#0b1f3a] font-black text-lg py-4 rounded-xl transition-colors"
                >
                  Get the Complete Protection Bundle — $17.99
                </a>
                <a
                  href={RIPPLE_BOOK_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-[#e8c86a] hover:text-white font-semibold underline underline-offset-4"
                >
                  Or start with The Ripple Effect book — $7.99
                </a>
              </div>

              <p className="mt-6 text-center text-xs text-slate-400">
                Education only, not financial advice. Sentinel Enterprises LLC is not a financial advisor or fiduciary.
              </p>
              <div className="mt-4 text-center">
                <Link to="/downloads" className="text-sm text-slate-300 hover:text-white">
                  Browse free downloads →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
