import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

const TITLE = "Set up your family's Sentinel Care organizer | Sentinel Enterprises LLC"
const DESC =
  "Tell us who's involved in your loved one's care and when visits happen, and we'll set up your Sentinel Care organizer within 1 business day."

export const Route = createFileRoute('/care_/start')({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: DESC },
      { name: 'robots', content: 'noindex' },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESC },
      { property: 'og:url', content: 'https://sentinelenterprisesllc.com/care/start' },
    ],
    links: [{ rel: 'canonical', href: 'https://sentinelenterprisesllc.com/care/start' }],
  }),
  component: CareStartPage,
})

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const inputCls =
  'w-full px-3 py-3 border border-[#e4e7eb] rounded-[10px] bg-white text-[#1f2933] font-sans focus:outline-none focus:border-[#2f6f5e] focus:ring-1 focus:ring-[#2f6f5e]'
const areaCls = inputCls + ' min-h-[110px] resize-y'
const labelCls = 'block font-sans text-[0.9rem] mt-3 mb-1.5 text-[#1f2933]'
const opt = <span className="text-[#829ab1]">(optional)</span>

function CareStartPage() {
  const [status, setStatus] = useState<FormStatus>('idle')

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
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="bg-[#faf8f5] text-[#1f2933] min-h-[calc(100vh-4rem)]">
      <div className="max-w-[640px] mx-auto px-[18px] pt-7 pb-12">
        <header className="mb-7">
          <div className="font-sans text-[0.85rem] tracking-[0.04em] uppercase text-[#52606d] mb-[18px]">
            Sentinel Care · Getting started
          </div>
          <h1 className="font-serif text-[clamp(1.9rem,6vw,2.4rem)] leading-[1.15] font-bold m-0 mb-3 text-[#1f2933]">
            Let&apos;s set up your family&apos;s organizer.
          </h1>
          <p className="font-sans text-[1.05rem] text-[#52606d] m-0 leading-relaxed">
            A few details about who&apos;s involved and when visits happen. Takes about 3 minutes. Short answers are fine.
          </p>
        </header>

        {status === 'success' ? (
          <section className="rounded-[14px] border px-[18px] py-6 mb-4 bg-[#e6f2ee] border-[#c5ddd4] text-center">
            <h2 className="font-serif text-2xl font-bold m-0 mb-2 text-[#1f2933]">Thank you, we&apos;ve got it.</h2>
            <p className="font-sans text-[#52606d] m-0 mb-3">
              We&apos;ll set up your organizer within 1 business day and email you when it&apos;s ready.
            </p>
            <Link to="/care" className="font-sans text-[#2f6f5e] font-semibold underline">
              Back to Sentinel Care
            </Link>
          </section>
        ) : (
          <form
            name="care-intake"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="care-intake" />
            <p className="hidden">
              <label>
                Don&apos;t fill this: <input name="bot-field" />
              </label>
            </p>

            <Card title="You (main contact)">
              <label htmlFor="ci-contact-name" className={labelCls}>Your name</label>
              <input id="ci-contact-name" name="contact_name" type="text" autoComplete="name" className={inputCls} />
              <label htmlFor="ci-contact-email" className={labelCls}>Your email</label>
              <input id="ci-contact-email" name="contact_email" type="email" required autoComplete="email" className={inputCls} />
            </Card>

            <Card title="Who's receiving care">
              <label htmlFor="ci-client" className={labelCls}>Care recipient&apos;s name</label>
              <input id="ci-client" name="client_name" type="text" placeholder="Example: Mom (Linda)" className={inputCls} />
              <label htmlFor="ci-caregiver" className={labelCls}>Caregiver&apos;s name {opt}</label>
              <input id="ci-caregiver" name="caregiver_name" type="text" className={inputCls} />
            </Card>

            <Card title="Family members to keep updated">
              <label htmlFor="ci-family" className={labelCls}>
                One per line: name and email (email {opt})
              </label>
              <textarea
                id="ci-family"
                name="family_members"
                placeholder={'Example:\nDarnell - darnell@example.com\nAunt Rose'}
                className={areaCls}
              />
            </Card>

            <Card title="Visit schedule">
              <label htmlFor="ci-schedule" className={labelCls}>Days and times</label>
              <textarea
                id="ci-schedule"
                name="visit_schedule"
                placeholder="Example: Mon, Wed, Fri 9am-1pm; Saturdays 10am-2pm"
                className={areaCls}
              />
            </Card>

            <Card title="Anything else">
              <label htmlFor="ci-notes" className={labelCls}>Notes {opt}</label>
              <textarea
                id="ci-notes"
                name="notes"
                placeholder="Anything that would help us set things up the way your family likes."
                className={areaCls}
              />
            </Card>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-2 w-full rounded-full px-[18px] py-3.5 bg-[#2f6f5e] hover:brightness-95 text-white font-sans text-base font-semibold transition disabled:opacity-50"
            >
              {status === 'submitting' ? 'Sending…' : 'Set up my organizer'}
            </button>
            {status === 'error' && (
              <p className="mt-3 font-sans text-sm text-red-700">
                Something went wrong. Please try again, or just reply to your welcome email with these details.
              </p>
            )}
          </form>
        )}

        <p className="mt-6 font-sans text-sm text-[#52606d] leading-relaxed">
          Prefer email? Reply to your &ldquo;Let&apos;s set up your family&apos;s Sentinel Care organizer&rdquo; email with the same details and we&apos;ll take it from there.
        </p>
        <p className="mt-3 font-sans text-xs text-[#829ab1] leading-relaxed">
          Sentinel Enterprises LLC provides paperwork and organization support only. We do not provide medical, legal, or financial advice.
        </p>
      </div>
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[14px] border px-[18px] py-5 mb-4 bg-white border-[#e4e7eb]">
      <h2 className="font-sans text-[0.95rem] tracking-[0.03em] uppercase text-[#2f6f5e] m-0 mb-1">{title}</h2>
      {children}
    </section>
  )
}
