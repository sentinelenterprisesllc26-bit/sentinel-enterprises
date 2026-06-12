import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <>
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Our Story</span>
            <h1 className="mt-2 text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
              About Sentinel Enterprises
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              We started Sentinel Enterprises because we watched too many working families and crypto holders make the
              same costly mistake — assuming protection was only for the wealthy.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">What We Believe</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Wealth protection isn't just for eight-figure estates. If you own a home, have a savings account,
                  or hold crypto — you have something worth protecting. And you deserve guidance that speaks plain
                  English, not legalese.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  We don't draft documents or give legal advice — we're educators, consultants, and guides. We help
                  you understand your options, then connect you with the qualified professionals who can execute.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">What We're Not</h2>
                <p className="text-slate-400 leading-relaxed">
                  We are not attorneys, financial advisors, tax professionals, or fiduciaries. Nothing we share is
                  legal, tax, or financial advice. We're educators who help you understand the landscape — so when
                  you do sit down with a professional, you know the right questions to ask.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Mission', value: 'Make practical wealth protection accessible to working families — not just the wealthy.' },
                { label: 'Focus Areas', value: 'Asset protection planning, digital asset inheritance, and caregiver tax education.' },
                { label: 'Approach', value: 'Education first. No pressure, no sales pitch — just honest guidance.' },
                { label: 'Location', value: 'Serving clients across the U.S.' },
              ].map((item) => (
                <div key={item.label} className="bg-slate-800/50 border border-slate-700/40 rounded-xl p-5">
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20"
            >
              Let's Have a Conversation
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
