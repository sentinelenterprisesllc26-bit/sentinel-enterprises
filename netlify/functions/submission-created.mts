import type { Context } from '@netlify/functions'

/*
 * ============================================================================
 *  SUBMISSION-CREATED  —  emails the customer their free PDF on signup
 * ============================================================================
 *  Netlify fires this event function automatically every time one of the site's
 *  forms is submitted (the filename `submission-created` is the trigger). When a
 *  visitor enters their email on a lead-capture form, we look up the matching
 *  guide, attach the PDF, and email it straight to them — so "add your email"
 *  actually delivers the document.
 *
 *  GOING LIVE — the only thing left to do:
 *    Add a RESEND_API_KEY environment variable in the Netlify UI
 *    (Site settings → Environment variables) from https://resend.com, and
 *    verify the sending domain there. Optionally set GUIDE_FROM_EMAIL to the
 *    "from" address you verified. No code changes are needed.
 *
 *  Until the key is set, submissions are still captured by Netlify Forms — the
 *  function just logs that it could not email the PDF (it never fails the
 *  submission), and the visitor still gets the instant download link on-page.
 * ============================================================================
 */

interface FormPayload {
  form_name: string
  data: Record<string, string>
}

// Which guide each lead-capture form delivers. Forms not listed here (e.g. the
// contact form or the series launch-notify form) simply don't trigger an email.
const GUIDES: Record<string, { path: string; filename: string; title: string }> = {
  'caregiver-checklist': {
    path: '/pdfs/caregiver-tax-checklist.pdf',
    filename: 'Caregiver-Tax-Savings-Checklist.pdf',
    title: 'Your Caregiver Tax Savings Checklist',
  },
  'crypto-checklist': {
    path: '/downloads/crypto-inheritance-checklist.pdf',
    filename: 'Crypto-Inheritance-Checklist.pdf',
    title: 'Your Crypto Inheritance Checklist',
  },
}

export default async (req: Request, context: Context) => {
  const { payload } = (await req.json()) as { payload: FormPayload }
  const guide = GUIDES[payload.form_name]
  const email = payload.data?.email?.trim()

  // Nothing to deliver for this form, or no address to send to.
  if (!guide || !email) return new Response('No guide to send.', { status: 200 })

  const apiKey = Netlify.env.get('RESEND_API_KEY')
  if (!apiKey) {
    console.warn(
      `RESEND_API_KEY is not set — captured ${email} for "${payload.form_name}" but could not ` +
        'email the PDF. Add RESEND_API_KEY in Site settings → Environment variables to enable delivery.',
    )
    return new Response('Email delivery not configured.', { status: 200 })
  }

  const from =
    Netlify.env.get('GUIDE_FROM_EMAIL') || 'Sentinel Enterprises <noreply@sentinel-enterprises.com>'
  const siteUrl = context.site.url || new URL(req.url).origin

  // Pull the PDF from the deployed site and attach it as base64.
  let attachment: string
  try {
    const pdfRes = await fetch(`${siteUrl}${guide.path}`)
    if (!pdfRes.ok) throw new Error(`PDF fetch returned ${pdfRes.status}`)
    attachment = Buffer.from(await pdfRes.arrayBuffer()).toString('base64')
  } catch (err) {
    console.error(`Could not load PDF for "${payload.form_name}":`, err)
    return new Response('Could not load PDF.', { status: 200 })
  }

  const html = `
    <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color: #0f172a;">
      <h2 style="margin: 0 0 12px;">${guide.title}</h2>
      <p style="margin: 0 0 16px; line-height: 1.6; color: #334155;">
        Thanks for signing up with Sentinel Enterprises. Your guide is attached to this email as a PDF —
        just open the attachment to get started.
      </p>
      <p style="margin: 0 0 16px; line-height: 1.6; color: #334155;">
        You can also download it any time here:
        <a href="${siteUrl}${guide.path}" style="color: #b45309; font-weight: 600;">${guide.filename}</a>
      </p>
      <p style="margin: 24px 0 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
        Sentinel Enterprises LLC provides education and consulting only — we are not attorneys,
        financial advisors, or fiduciaries.
      </p>
    </div>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: email,
        subject: guide.title,
        html,
        attachments: [{ filename: guide.filename, content: attachment }],
      }),
    })
    if (!res.ok) {
      console.error('Resend email failed:', res.status, await res.text())
      return new Response('Email send failed.', { status: 200 })
    }
  } catch (err) {
    console.error('Resend request error:', err)
    return new Response('Email send failed.', { status: 200 })
  }

  console.log(`Emailed "${guide.filename}" to ${email}.`)
  return new Response('Sent.', { status: 200 })
}
