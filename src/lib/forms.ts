/**
 * Submit one of the registered Netlify forms through the SSR-safe endpoint.
 * A resolved fetch is not success: Netlify must explicitly return an OK status.
 */
const inFlightForms = new WeakSet<HTMLFormElement>()

export async function submitNetlifyForm(form: HTMLFormElement): Promise<void> {
  const formData = new FormData(form)
  const body = new URLSearchParams()

  for (const [key, value] of formData.entries()) {
    body.append(key, typeof value === 'string' ? value : value.name)
  }

  const response = await fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  if (!response.ok) {
    throw new Error(`Form submission failed (${response.status}).`)
  }
}

/**
 * Shared handler orchestration. The success callback runs exactly once after
 * an HTTP-success response. A second activation of the same form while its
 * request is in flight is ignored, and a failed request releases the guard so
 * the visitor can retry without losing their input.
 */
export async function submitNetlifyFormOnce(
  form: HTMLFormElement,
  onAccepted: () => void,
): Promise<boolean> {
  if (inFlightForms.has(form)) return false

  inFlightForms.add(form)
  try {
    await submitNetlifyForm(form)
    try {
      onAccepted()
    } catch {
      // Tracking callbacks must not turn an accepted form into an error.
    }
    return true
  } finally {
    inFlightForms.delete(form)
  }
}