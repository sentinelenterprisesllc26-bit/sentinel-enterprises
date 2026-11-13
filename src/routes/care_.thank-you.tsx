import { createFileRoute, Link } from '@tanstack/react-router'
import { trackCheckoutClick } from '../lib/offer-clicks'

const TITLE = "Thanks — you're in Sentinel Care | Sentinel Enterprises LLC"
const DESC =
  'Your Sentinel Care paperwork setup starts now. What happens next, and how to reach us on WhatsApp.'
const CANONICAL = 'https://sentinelenterprisesllc.com/care/thank-you'
const BUNDLE_URL = 'https://buy.stripe.com/5kQ4gzc1j6RE2VfapHdIA0b'
const WHATSAPP_URL = 'https://wa.me/12533206431'
const WHATSAPP_LABEL = 'WhatsApp 253-320-6431'

export const Route = createFileRoute('/care_/thank-you')({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: DESC },
      { name: 'robots', content: 'noindex' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESC },
      { property: 'og:url', content: CANONICAL },
    ],
    links: [{ rel: 'canonical', href: CANONICAL }],
  }),
  component: CareThankYouPage,
})

function CareThankYouPage() {
  return (
    <div className="bg-[#faf8f5] text-[#1f2933] min-h-[calc(100vh-4rem)]">
      <div className="max-w-[640px] mx-auto px-[18px] pt-7 pb-12">
        <header className="mb-7">
          <div className="font-sans text-[0.85rem] tracking-[0.04em] uppercase text-[#52606d] mb-[18px]">
            Sentinel Enterprises LLC
          </div>
          <h1 className="font-serif text-[clamp(1.9rem,6vw,2.4rem)] leading-[1.15] font-bold m-0 mb-3 text-[#1f2933]">
            Welcome to Sentinel Care
          </h1>
          <p className="font-sans text-[1.15rem] text-[#1f2933] font-semibold m-0 mb-2 leading-snug">
            Your paperwork setup starts now. Here&apos;s exactly what happens next.
          </p>
          <p className="font-sans text-[0.95rem] text-[#52606d] m-0 leading-relaxed">
            Thanks for starting Sentinel Care.
          </p>
        </header>

        <Card title="Important" accent>
          <p className="font-sans text-[0.95rem] text-[#52606d] m-0">
            Sentinel Care is paperwork and organization help only. It is not medical care, not legal
            advice, and not financial advice. We help you keep visit logs, paid receipts, caregiver
            schedules, and a simple weekly family update in one place.
          </p>
        </Card>

        <Card title="What happens next">
          <ol className="m-0 pl-[1.15rem] list-decimal space-y-3 text-[#1f2933] font-sans text-[0.95rem]">
            <li>
              <span className="font-semibold">Intake form</span>
              <br />
              Fill in what you&apos;re tracking now — visits, receipts, schedules, or all three — and
              how many caregivers are involved.
            </li>
            <li>
              <span className="font-semibold">Templates set up</span>
              <br />
              Once the intake is back, we set up your paperwork templates so logs and receipts land
              in a consistent place.
            </li>
            <li>
              <span className="font-semibold">Weekly update</span>
              <br />
              Each week you&apos;ll get a simple one-page family update ready to share with the people
              you choose. Reply with the names and emails who should receive it when you&apos;re ready.
            </li>
          </ol>
        </Card>

        <Link
          to="/care/start"
          className="mb-4 block rounded-full bg-[#2f6f5e] px-[18px] py-3.5 text-center font-sans text-base font-semibold text-white transition hover:brightness-95"
        >
          Open intake form
        </Link>

        <Card title="Questions">
          <p className="font-sans text-[0.95rem] text-[#52606d] m-0">
            <a href={WHATSAPP_URL} className="text-[#2f6f5e] font-semibold hover:underline">
              {WHATSAPP_LABEL}
            </a>
          </p>
        </Card>

        <Card title="Want the guides too?">
          <p className="font-sans text-[0.95rem] text-[#52606d] m-0 mb-4">
            Add the Complete Protection Bundle for $17.99 — educational crypto security /
            inheritance-planning guides (not financial, legal, or medical advice).
          </p>
          <a
            href={BUNDLE_URL}
            onClick={(e) => trackCheckoutClick(e.currentTarget.href)}
            className="block rounded-full bg-[#2f6f5e] px-[18px] py-3.5 text-center font-sans text-base font-semibold text-white transition hover:brightness-95"
          >
            Get the Bundle — $17.99
          </a>
        </Card>

        <Card title="Reminder" accent>
          <p className="font-sans text-[0.95rem] text-[#52606d] m-0">
            Paperwork and organization only — no medical, legal, or financial advice.
          </p>
        </Card>

        <p className="mt-6 text-center font-sans text-[0.85rem] text-[#52606d]">
          Sentinel Enterprises LLC · Online only
          <br />
          <Link to="/care" className="text-[#2f6f5e] hover:underline">
            sentinelenterprisesllc.com/care
          </Link>
          <br />
          <a href={WHATSAPP_URL} className="text-[#2f6f5e] hover:underline">
            {WHATSAPP_LABEL}
          </a>
        </p>
      </div>
    </div>
  )
}

function Card({
  title,
  children,
  accent = false,
}: {
  title: string
  children: React.ReactNode
  accent?: boolean
}) {
  return (
    <section
      className={
        'rounded-[14px] border px-[18px] py-5 mb-4 ' +
        (accent ? 'bg-[#e6f2ee] border-[#c5ddd4]' : 'bg-white border-[#e4e7eb]')
      }
    >
      <h2 className="font-sans text-[0.95rem] tracking-[0.03em] uppercase text-[#2f6f5e] m-0 mb-3">
        {title}
      </h2>
      {children}
    </section>
  )
}
