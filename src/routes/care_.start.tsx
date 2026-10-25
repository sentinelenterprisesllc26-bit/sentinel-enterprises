import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/care_/start')({
  head: () => ({ meta: [{ title: 'Start Sentinel Care | Sentinel Enterprises' }, { name: 'robots', content: 'noindex' }] }),
  component: CareStart,
})

const Q: Array<[string, string, boolean]> = [
  ['family_name', 'Family last name (for your organizer title)', false],
  ['loved_one_first_name', "Your loved one's first name", false],
  ['people_involved', 'Who is involved? (family members who help or pay)', true],
  ['caregivers', 'Caregiver name(s) and their usual days', true],
  ['what_to_track', 'What should we track? (visits, receipts, schedules, anything else)', true],
  ['update_emails', 'Email(s) for the weekly update, separated by commas', false],
]

function CareStart() {
  const [state, setState] = useState<'form' | 'sending' | 'done' | 'error'>('form')
  const [err, setErr] = useState('')
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('sending')
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    data.session_id = new URLSearchParams(window.location.search).get('session_id') ?? ''
    const res = await fetch('/api/care-intake', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    const body = await res.json().catch(() => ({}))
    if (res.ok && body.ok) setState('done')
    else {
      setErr(body.error ?? 'Something went wrong. Please email Sentinelenterprisesllc26@gmail.com.')
      setState('error')
    }
  }
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold">Welcome to Sentinel Care 🎉</h1>
      {state === 'done' ? (
        <p className="mt-6 text-lg">Thank you! Your family organizer is being set up. Watch your inbox for your links in the next few minutes.</p>
      ) : (
        <form onSubmit={submit} className="mt-6 space-y-5">
          <p>Two minutes of questions and we'll set up your family's organizer: visit log, receipts, caregiver schedule, and a weekly plain-language update.</p>
          {Q.map(([name, label, long]) => (
            <label key={name} className="block">
              <span className="font-semibold">{label}</span>
              {long ? (
                <textarea name={name} rows={3} className="mt-1 w-full rounded border p-2" />
              ) : (
                <input name={name} type="text" required={name === 'update_emails'} className="mt-1 w-full rounded border p-2" />
              )}
            </label>
          ))}
          <p className="text-sm text-gray-600">Paperwork and organization only. Not medical, legal, tax, or financial advice.</p>
          {state === 'error' && <p className="text-red-700">{err}</p>}
          <button disabled={state === 'sending'} className="rounded bg-blue-900 px-6 py-3 font-semibold text-white">
            {state === 'sending' ? 'Sending…' : 'Set up my organizer'}
          </button>
        </form>
      )}
    </main>
  )
}
