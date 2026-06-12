import { useState } from 'react'
import type { ProductId } from './products'

/*
 * <CheckoutButton> — drops a customer into Stripe Checkout for a given product.
 *
 * On click it asks the create-checkout function for a one-time Stripe Checkout
 * Session, then redirects the browser to Stripe's secure hosted payment page.
 * Pricing and product details come from src/lib/products.ts (one source of
 * truth), so this button only ever needs the product id.
 */
export function CheckoutButton({
  productId,
  className,
  children,
}: {
  productId: ProductId
  className?: string
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      })
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string }
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Could not start checkout. Please try again.')
      }
      // Hand off to Stripe's hosted checkout page.
      window.location.href = data.url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <>
      <button type="button" onClick={handleClick} disabled={loading} className={className} aria-busy={loading}>
        {loading ? 'Redirecting to checkout…' : children}
      </button>
      {error && (
        <p className="mt-2 text-rose-400 text-xs leading-relaxed" role="alert">
          {error}
        </p>
      )}
    </>
  )
}
