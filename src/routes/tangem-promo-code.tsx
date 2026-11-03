import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

const CODE = 'FUSB6E'
const TANGEM_URL = 'https://tangem.com/en/pricing/?promocode=FUSB6E'

export const Route = createFileRoute('/tangem-promo-code')({
  head: () => ({
    meta: [
      { title: 'Tangem Promo Code FUSB6E | Sentinel Enterprises' },
      {
        name: 'description',
        content:
          'Tangem promo code FUSB6E: how to apply it at checkout, what the Tangem card wallet is, and a free setup guide. #ad. Educational only, not financial advice.',
      },
    ],
  }),
  component: TangemPromoPage,
})

function CopyCode() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CODE)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border-2 border-dashed border-amber-500 bg-slate-900 text-amber-400 text-3xl font-black tracking-widest hover:bg-slate-800"
      aria-label="Copy promo code FUSB6E"
    >
      {CODE}
      <span className="text-sm font-semibold tracking-normal text-slate-300">{copied ? 'Copied!' : 'Tap to copy'}</span>
    </button>
  )
}

function TangemPromoPage() {
  const steps = [
    { n: '1', t: 'Open Tangem with the code', d: 'Tap the button below. It opens Tangem’s pricing page with code FUSB6E already in the link.' },
    { n: '2', t: 'Pick your wallet', d: 'Choose the Tangem Wallet pack you want on Tangem’s page.' },
    { n: '3', t: 'Check the code in the order form', d: 'If the code isn’t filled in, choose “I have a promo code” and enter FUSB6E. Tangem applies the discount to your order total before checkout.' },
  ]

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-6">
            Promo code · #ad
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Tangem Promo Code: FUSB6E</h1>
          <p className="text-lg text-slate-400 leading-relaxed mb-8">
            Enter <strong className="text-white">FUSB6E</strong> on Tangem’s order form and the discount is applied to your order total before checkout.
          </p>
          <div className="mb-6">
            <CopyCode />
          </div>
          <a
            href={TANGEM_URL}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block px-8 py-4 rounded-xl bg-amber-500 text-slate-950 font-bold text-lg hover:bg-amber-400"
          >
            Open Tangem with code FUSB6E #ad
          </a>
          <p className="text-xs text-slate-500 mt-4">
            Tangem allows only one discount type per order, so if Tangem is running its own sale, its checkout shows which one applies.
          </p>
        </div>
      </section>

      <section className="py-14 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6">How to use the code</h2>
          <ol className="space-y-4">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-amber-500 font-black text-2xl">{s.n}</span>
                <div>
                  <p className="text-white font-semibold">{s.t}</p>
                  <p className="text-slate-400 text-sm">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Exchange account vs. a Tangem card wallet</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border border-slate-800">
              <thead className="bg-slate-900 text-slate-300">
                <tr>
                  <th className="p-3"> </th>
                  <th className="p-3">Crypto left on an exchange</th>
                  <th className="p-3 text-amber-400">Tangem card wallet</th>
                </tr>
              </thead>
              <tbody className="text-slate-400">
                <tr className="border-t border-slate-800">
                  <td className="p-3 text-white">Who holds the keys</td>
                  <td className="p-3">The exchange</td>
                  <td className="p-3">You (self-custody)</td>
                </tr>
                <tr className="border-t border-slate-800">
                  <td className="p-3 text-white">How you sign</td>
                  <td className="p-3">Log in to the exchange</td>
                  <td className="p-3">Tap the card to your phone</td>
                </tr>
                <tr className="border-t border-slate-800">
                  <td className="p-3 text-white">Cables or charging</td>
                  <td className="p-3">Not applicable</td>
                  <td className="p-3">None needed</td>
                </tr>
                <tr className="border-t border-slate-800">
                  <td className="p-3 text-white">Backup</td>
                  <td className="p-3">Depends on the exchange</td>
                  <td className="p-3">Backup cards included</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-10 p-6 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <p className="text-white font-semibold mb-2">New to Tangem?</p>
            <p className="text-slate-400 text-sm mb-4">Grab the free beginner’s setup guide, then use the code when you’re ready.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/downloads/Tangem_Beginners_Guide.pdf" className="px-5 py-2 rounded-lg border border-amber-500 text-amber-400 font-semibold hover:bg-amber-500/10">
                Free Tangem setup guide (PDF)
              </a>
              <a href={TANGEM_URL} target="_blank" rel="noopener noreferrer sponsored" className="px-5 py-2 rounded-lg bg-amber-500 text-slate-950 font-semibold hover:bg-amber-400">
                Use code FUSB6E #ad
              </a>
            </div>
          </div>

          <p className="text-sm text-slate-400 mt-8">
            Want the full family plan for your crypto? See the{' '}
            <Link to="/crypto-inheritance-checklist" className="text-amber-400 underline">free crypto inheritance checklist</Link> or all{' '}
            <Link to="/partners" className="text-amber-400 underline">tools Sentinel recommends</Link>.
          </p>

          <p className="text-xs text-slate-500 mt-8 border-t border-slate-800 pt-4">
            #ad: This page contains an affiliate promo code and links. Educational only, not financial advice. Tangem sets its own prices, offers and terms; check them on Tangem’s site before you buy.
          </p>
        </div>
      </section>
    </>
  )
}
