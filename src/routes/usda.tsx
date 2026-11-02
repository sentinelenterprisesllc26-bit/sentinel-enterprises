import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/usda')({
  head: () => ({
    meta: [
      { title: 'Free USDA Section 502 Direct Home Loan Checklist | Sentinel Enterprises' },
      {
        name: 'description',
        content:
          'Free, printable step-by-step checklist for the USDA Section 502 Direct Home Loan. Educational only, built from rd.usda.gov sources.',
      },
    ],
  }),
  component: UsdaPage,
})

const PROG =
  'https://www.rd.usda.gov/programs-services/single-family-housing-programs/single-family-housing-direct-home-loans'
const MD = 'https://www.rd.usda.gov/media/file/download/md-singlefamilyhousing-502application-21425.pdf'
const VTNH = 'https://www.rd.usda.gov/media/file/download/vtnh-502-application.pdf'
const ELIG = 'https://eligibility.sc.egov.usda.gov'
const PDF = '/downloads/usda-502-document-checklist.pdf'

const a = 'text-amber-500 underline hover:text-amber-400'

function UsdaPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

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
      if (!res.ok) throw new Error(String(res.status))
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const steps: [string, React.ReactNode][] = [
    [
      'Check the property area.',
      <>
        On the{' '}
        <a className={a} href={ELIG} rel="noopener" target="_blank">
          USDA Eligibility Site
        </a>
        , open Single Family Housing Direct, then the Property Eligibility tab, then enter the address. The map
        legend marks ineligible areas.
      </>,
    ],
    [
      'Check income and fit.',
      'Use the Income Limits tab and the Self-Assessment tab (Purchase a Single-Family Home) for a preliminary review. USDA says you can still submit a complete application for an official decision whatever the self-assessment shows.',
    ],
    [
      'Gather your documents.',
      "Use the checklist. Lists vary by state, so use your state's 502 package and confirm with your local Rural Development office.",
    ],
    [
      'Take homebuyer education.',
      'First-time buyers need a certificate from an Agency-approved provider. Fees and providers differ by state.',
    ],
    ['Submit a complete application', 'to your local RD office. Applications are accepted year round.'],
    [
      'Respond quickly.',
      'The example (Maryland) package says items not provided within 15 days of a request may lead to withdrawal.',
    ],
  ]

  return (
    <main className="bg-slate-950 text-slate-200 min-h-screen">
      <div className="max-w-3xl mx-auto px-5 py-10 leading-relaxed">
        <span className="inline-block text-xs uppercase tracking-widest text-amber-500 border border-amber-500/40 rounded-full px-3 py-1">
          Free printable checklist
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-3 leading-tight">
          USDA Section 502 Direct Home Loan: Step-by-Step Checklist
        </h1>
        <p className="text-lg text-slate-300">
          A one-page list of the documents and steps for USDA Rural Development&apos;s Section 502 Direct Loan, built
          from official rd.usda.gov sources. Get it free.
        </p>

        <div id="signup" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-6">
          {status === 'success' ? (
            <div>
              <h2 className="text-xl font-bold text-white">Thanks! Your checklist is ready.</h2>
              <a
                href={PDF}
                download
                className="inline-block mt-4 bg-amber-500 text-slate-950 font-bold px-5 py-3 rounded-lg hover:bg-amber-400"
              >
                Download the checklist (PDF)
              </a>
            </div>
          ) : (
            <form
              name="usda-checklist"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="usda-checklist" />
              <p className="hidden">
                <label>
                  Leave blank: <input name="bot-field" />
                </label>
              </p>
              <label htmlFor="usda-name" className="block text-sm mb-1">
                First name
              </label>
              <input
                id="usda-name"
                name="name"
                type="text"
                required
                autoComplete="given-name"
                className="w-full p-3 rounded-lg border border-slate-700 bg-slate-950 text-white"
              />
              <label htmlFor="usda-email" className="block text-sm mt-3 mb-1">
                Email
              </label>
              <input
                id="usda-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full p-3 rounded-lg border border-slate-700 bg-slate-950 text-white"
              />
              <div className="flex gap-3 items-start mt-4 text-sm text-slate-300">
                <input id="usda-consent" name="consent" type="checkbox" value="yes" required className="mt-1" />
                <label htmlFor="usda-consent">
                  Yes, send me the free USDA 502 checklist from Sentinel Enterprises LLC. I understand my email is used
                  only to deliver this checklist.
                </label>
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full mt-4 bg-amber-500 text-slate-950 font-bold py-3 rounded-lg hover:bg-amber-400 disabled:opacity-60"
              >
                {status === 'submitting' ? 'Sending…' : 'Get the free checklist'}
              </button>
              {status === 'error' && (
                <p className="mt-3 text-sm text-red-400">Something went wrong. Please try again.</p>
              )}
              <p className="mt-3 text-xs text-slate-400">
                Privacy: we use your name and email only to deliver this checklist. We don&apos;t add you to a mailing
                list, and we don&apos;t sell or share your information. See our{' '}
                <a className={a} href="/privacy">
                  privacy policy
                </a>
                .
              </p>
            </form>
          )}
        </div>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">What&apos;s inside</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Application forms: Form RD 410-4, RD 3550-1, RD 3550-4</li>
          <li>Identity, income and credit documents to gather before you apply</li>
          <li>Homebuyer education requirement for first-time buyers</li>
          <li>Source links to every rd.usda.gov page used</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">The steps at a glance</h2>
        <ol className="space-y-4">
          {steps.map(([t, d], i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-8 h-8 rounded-full bg-amber-500/15 text-amber-500 font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span>
                <strong className="text-white">{t}</strong> {d}
              </span>
            </li>
          ))}
        </ol>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">Key program facts</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>For low- and very-low-income applicants in eligible rural areas.</li>
          <li>No down payment is typically required.</li>
          <li>
            Payment assistance can lower the effective interest rate to as low as 1%. Borrowers may have to repay some
            or all of that subsidy later.
          </li>
          <li>Up to a 33-year term (38 years for very-low-income applicants who can&apos;t afford 33).</li>
        </ul>
        <p className="text-sm text-slate-400 mt-2">
          Rates and limits change. Check the{' '}
          <a className={a} href={PROG} rel="noopener" target="_blank">
            program page
          </a>{' '}
          for current numbers.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">Why we made this</h2>
        <p>
          Our founder is a first-time buyer who applied for a 502 Direct loan herself. She finished her homebuyer
          education course, and her application packet was confirmed complete and is now in review. This checklist is
          what she wishes she&apos;d had at the start.
        </p>
        <div className="mt-4 border-l-4 border-amber-500 bg-slate-900 p-4 rounded-r-lg text-sm">
          No one can promise approval. USDA Rural Development makes every decision based on verified information.
        </div>

        <a
          href="#signup"
          className="block text-center mt-8 bg-amber-500 text-slate-950 font-bold py-3 rounded-lg hover:bg-amber-400"
        >
          Get the free checklist
        </a>

        <div className="border-t border-slate-800 mt-12 pt-5 text-xs text-slate-400 space-y-2">
          <p>
            <strong>Sources:</strong>{' '}
            <a className={a} href={PROG} rel="noopener" target="_blank">USDA RD program page</a> ·{' '}
            <a className={a} href={MD} rel="noopener" target="_blank">502 application package, Maryland example</a> ·{' '}
            <a className={a} href={VTNH} rel="noopener" target="_blank">502 application, VT/NH</a> ·{' '}
            <a className={a} href={ELIG} rel="noopener" target="_blank">USDA Eligibility Site</a>
          </p>
          <p>
            Educational only, not legal or financial advice. Sentinel Enterprises LLC is an independent business, not
            affiliated with or endorsed by USDA. We don&apos;t take referral fees from lenders or real estate agents.
          </p>
        </div>
      </div>
    </main>
  )
}
