import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services')({
  component: ServicesPage,
})

function PayPalButton({ className = '' }: { className?: string }) {
  return (
    <a
      href="https://paypal.me/JenaeWiley"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 px-6 py-3 bg-[#FFC439] hover:bg-[#FFB800] text-[#003087] font-bold rounded-xl transition-all shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/50 hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082h-2.19a2.162 2.162 0 0 0-2.134 1.839l-1.37 8.684H9.5a.641.641 0 0 0 .633-.74l.006-.04.736-4.667.047-.257a.641.641 0 0 1 .633-.547h.399c2.583 0 4.607-.514 5.72-2.006.904-1.215 1.185-2.755.548-4.061z"/>
      </svg>
      Pay with PayPal
    </a>
  )
}

function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Practical wealth protection guidance — built for working families, not Wall Street."
      />
      <ServiceDetails />
      <PayPalSection />
      <CTASection />
    </>
  )
}

function PageHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">{title}</h1>
        <p className="text-xl text-slate-400 leading-relaxed">{subtitle}</p>
      </div>
    </section>
  )
}

function ServiceDetails() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Service 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2">
            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-400 mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 01.75 12c0 .902.108 1.78.308 2.625M9 12.75L11.25 15 15 9.75" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Asset Protection Planning</h2>
            <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-full border border-amber-500/20">
              Families &amp; Small Business Owners
            </span>
          </div>
          <div className="lg:col-span-3">
            <p className="text-slate-300 leading-relaxed mb-4">
              For working families with homes, savings, or small businesses who think estate planning is only for the
              wealthy.
            </p>
            <p className="text-slate-400 leading-relaxed mb-4">
              We'll help you understand what a properly drafted trust can actually do — protecting what you've built
              from lawsuits, creditor claims, divorce, and inheritance tax erosion. Then we connect you with qualified
              attorneys who can draft it.
            </p>
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 mb-6">
              <p className="text-amber-300 font-semibold italic">
                "You don't need an eight-figure net worth to plan like the wealthy."
              </p>
            </div>
            <ul className="space-y-2 mb-6">
              {[
                'Trust structure education and guidance',
                'Asset inventory and protection gap analysis',
                'Attorney referral network for drafting',
                'Business entity structuring guidance',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                  <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                Learn About Asset Protection →
              </Link>
              <PayPalButton />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800" />

        {/* Service 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2">
            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-400 mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Digital Asset &amp; Crypto Guidance</h2>
            <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-full border border-amber-500/20">
              Crypto Holders &amp; Investors
            </span>
          </div>
          <div className="lg:col-span-3">
            <p className="text-slate-300 leading-relaxed mb-4">
              For crypto holders who want to pass holdings to heirs — without lost seed phrases, frozen exchange
              accounts, or family confusion.
            </p>
            <p className="text-slate-400 leading-relaxed mb-4">
              We guide you through cold storage setup, beneficiary access planning, and trust funding for digital
              assets. Because "my cousin knows where my Bitcoin is" is not an estate plan.
            </p>
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 mb-6">
              <p className="text-amber-300 font-semibold italic">"Build the structure before you need it."</p>
            </div>
            <ul className="space-y-2 mb-6">
              {[
                'Cold storage setup and education (Tangem, Ledger)',
                'Seed phrase and access documentation strategies',
                'Beneficiary access planning',
                'Trust funding with digital assets',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                  <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/crypto-inheritance-checklist" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                Download the Crypto Inheritance Checklist →
              </Link>
              <PayPalButton />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800" />

        {/* Service 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2">
            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-400 mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Caregiver Tax Savings</h2>
            <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-full border border-amber-500/20">
              Family Caregivers
            </span>
          </div>
          <div className="lg:col-span-3">
            <p className="text-slate-300 leading-relaxed mb-4">
              For family caregivers who suspect they've been overpaying taxes for years.
            </p>
            <p className="text-slate-400 leading-relaxed mb-4">
              We break down the deductions, credits, and filing strategies most caregivers miss — in plain English,
              not tax code. Get our free checklist to see what you might be leaving on the table.
            </p>
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 mb-6">
              <p className="text-amber-300 font-semibold italic">"Keep more of what you've earned."</p>
            </div>
            <ul className="space-y-2 mb-6">
              {[
                'Medical expense deduction maximization',
                'Dependent care credit guidance',
                'Filing status optimization (head of household, etc.)',
                'Free caregiver tax checklist — 7 commonly missed deductions',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                  <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-4">
              <a href="/#email-signup" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                Get the Free Caregiver Tax Checklist →
              </a>
              <PayPalButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PayPalSection() {
  return (
    <section className="py-14 bg-slate-950 border-t border-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-slate-400 text-sm uppercase tracking-widest font-semibold mb-3">Secure Payment</p>
        <h2 className="text-2xl font-bold text-white mb-3">Ready to Get Started?</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Pay securely via PayPal. After payment, reach out through our contact page to schedule your consultation.
        </p>
        <PayPalButton className="text-lg px-8 py-4" />
        <p className="mt-4 text-xs text-slate-600">
          Powered by PayPal — your payment is protected by PayPal Buyer Protection.
        </p>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Protect What You've Built?</h2>
        <p className="text-slate-400 mb-8">
          No pressure. No sales pitch. Just a conversation about where you are and what your next step might be.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20"
        >
          Let's Talk
        </Link>
      </div>
    </section>
  )
}
