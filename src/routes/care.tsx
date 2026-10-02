import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/care')({
  head: () => ({
    meta: [
      { title: 'Care paperwork, handled | Sentinel Enterprises LLC' },
      {
        name: 'description',
        content:
          'Monthly paperwork help for families managing home care and independent caregivers anywhere in the US. Remote support for visit logs, receipts, schedules, and weekly family updates.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Care paperwork, handled | Sentinel Enterprises LLC' },
      {
        property: 'og:description',
        content:
          'Monthly paperwork help for families managing home care and independent caregivers anywhere in the US. Remote support for visit logs, receipts, schedules, and weekly family updates.',
      },
      { property: 'og:url', content: 'https://sentinelenterprisesllc.com/care' },
    ],
    links: [{ rel: 'canonical', href: 'https://sentinelenterprisesllc.com/care' }],
  }),
  component: CarePage,
})

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

function CarePage() {
  return (
    <div className="bg-[#faf8f5] text-[#1f2933] min-h-[calc(100vh-4rem)]">
      <div className="max-w-[640px] mx-auto px-[18px] pt-7 pb-12">
        <header className="mb-7">
          <div className="font-sans text-[0.85rem] tracking-[0.04em] uppercase text-[#52606d] mb-[18px]">
            Sentinel Enterprises LLC
          </div>
          <h1 className="font-serif text-[clamp(1.9rem,6vw,2.4rem)] leading-[1.15] font-bold m-0 mb-3 text-[#1f2933]">
            Care paperwork, handled.
          </h1>
          <p className="font-sans text-[1.05rem] text-[#52606d] m-0 leading-relaxed">
            For families managing a loved one&apos;s home care — and for independent caregivers — anywhere in the US. Remote paperwork support, wherever you are.
          </p>
        </header>

        <Card title="Who it’s for">
          <ul className="m-0 pl-[1.15rem] list-disc space-y-2 text-[#1f2933]">
            <li>Families who want clear records without another full-time job</li>
            <li>Independent caregivers who need simple logs, receipts, and schedules in one place</li>
          </ul>
        </Card>

        <Card title="What’s included each month">
          <ul className="m-0 pl-[1.15rem] list-disc space-y-2 text-[#1f2933]">
            <li>Visit logs</li>
            <li>Paid receipts</li>
            <li>Caregiver schedules</li>
            <li>A weekly family update</li>
          </ul>
        </Card>

        <Card title="Price">
          <p className="text-[1.35rem] font-bold m-0 mb-1.5 text-[#1f2933]">$99 per month per family</p>
          <p className="font-sans text-[0.95rem] text-[#52606d] m-0">Cancel anytime.</p>
          <p className="mt-3 rounded-lg bg-[#fff7e6] px-3 py-2 font-sans text-[0.95rem] text-[#7a4b00]">
            First month $75 through October 31, 2026 — use code <strong>OCT75</strong> at checkout.
          </p>
        </Card>

        <a
          href="https://buy.stripe.com/8x214n8P75NAgM555ndIA07"
          className="mb-4 block rounded-full bg-[#2f6f5e] px-[18px] py-3.5 text-center font-sans text-base font-semibold text-white transition hover:brightness-95"
        >
          Subscribe / Get started
        </a>

        <Card title="How it works">
          <ol className="m-0 pl-[1.15rem] list-decimal space-y-2 text-[#1f2933]">
            <li>Tell us who’s involved and what you need tracked.</li>
            <li>We set up your templates and schedule.</li>
            <li>You get a weekly family update — plain language, no jargon.</li>
          </ol>
        </Card>

        <Card title="Important" accent>
          <p className="font-sans text-[0.95rem] text-[#52606d] m-0">
            We handle paperwork and organization only. We do not give medical, legal, or financial advice.
          </p>
        </Card>

        <Card title="Contact">
          <p className="font-sans text-[0.95rem] text-[#52606d] m-0 mb-2">
            Email:{' '}
            <a
              href="mailto:Sentinelenterprisesllc26@gmail.com"
              className="text-[#2f6f5e] hover:underline"
            >
              Sentinelenterprisesllc26@gmail.com
            </a>
          </p>
          <CareContactForm />
        </Card>

        <p className="mt-6 text-center font-sans text-[0.85rem] text-[#52606d]">
          Sentinel Enterprises LLC · Serving families and independent caregivers across the US · Cancel anytime
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
        (accent
          ? 'bg-[#e6f2ee] border-[#c5ddd4]'
          : 'bg-white border-[#e4e7eb]')
      }
    >
      <h2 className="font-sans text-[0.95rem] tracking-[0.03em] uppercase text-[#2f6f5e] m-0 mb-3">
        {title}
      </h2>
      {children}
    </section>
  )
}

function CareContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')

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
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="mt-3 rounded-xl border border-[#c5ddd4] bg-[#e6f2ee] p-5 text-center">
        <p className="font-sans font-semibold text-[#1f2933] m-0 mb-1">Message received</p>
        <p className="font-sans text-sm text-[#52606d] m-0">
          Thanks — we&apos;ll follow up by email soon.
        </p>
      </div>
    )
  }

  return (
    <form
      name="care-contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="mt-1"
    >
      <input type="hidden" name="form-name" value="care-contact" />
      <p className="hidden">
        <label>
          Don’t fill this: <input name="bot-field" />
        </label>
      </p>

      <label htmlFor="care-name" className="block font-sans text-[0.9rem] mt-3 mb-1.5 text-[#1f2933]">
        Name
      </label>
      <input
        id="care-name"
        name="name"
        type="text"
        required
        autoComplete="name"
        className="w-full px-3 py-3 border border-[#e4e7eb] rounded-[10px] bg-white text-[#1f2933] font-sans focus:outline-none focus:border-[#2f6f5e] focus:ring-1 focus:ring-[#2f6f5e]"
      />

      <label htmlFor="care-email" className="block font-sans text-[0.9rem] mt-3 mb-1.5 text-[#1f2933]">
        Email
      </label>
      <input
        id="care-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        className="w-full px-3 py-3 border border-[#e4e7eb] rounded-[10px] bg-white text-[#1f2933] font-sans focus:outline-none focus:border-[#2f6f5e] focus:ring-1 focus:ring-[#2f6f5e]"
      />

      <label htmlFor="care-phone" className="block font-sans text-[0.9rem] mt-3 mb-1.5 text-[#1f2933]">
        Phone <span className="text-[#829ab1]">(optional)</span>
      </label>
      <input
        id="care-phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        className="w-full px-3 py-3 border border-[#e4e7eb] rounded-[10px] bg-white text-[#1f2933] font-sans focus:outline-none focus:border-[#2f6f5e] focus:ring-1 focus:ring-[#2f6f5e]"
      />

      <label htmlFor="care-note" className="block font-sans text-[0.9rem] mt-3 mb-1.5 text-[#1f2933]">
        Short note about your situation
      </label>
      <textarea
        id="care-note"
        name="note"
        required
        placeholder="Example: Looking for help keeping visit logs and a weekly update for family."
        className="w-full min-h-[110px] px-3 py-3 border border-[#e4e7eb] rounded-[10px] bg-white text-[#1f2933] font-sans resize-y focus:outline-none focus:border-[#2f6f5e] focus:ring-1 focus:ring-[#2f6f5e]"
      />

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-4 w-full rounded-full px-[18px] py-3.5 bg-[#2f6f5e] hover:brightness-95 text-white font-sans text-base font-semibold transition disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>

      {status === 'error' && (
        <p className="mt-3 font-sans text-sm text-red-700">Something went wrong. Please try again or email us directly.</p>
      )}
    </form>
  )
}
