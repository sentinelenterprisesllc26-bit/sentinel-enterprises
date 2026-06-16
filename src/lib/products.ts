/*
 * ============================================================================
 *  PRODUCT CATALOG  —  the ONE place prices live
 * ============================================================================
 *  This is the single source of truth for every paid product on the site.
 *  Both the storefront (guides / videos pages) and the Stripe checkout
 *  function (netlify/functions/create-checkout.mts) read from this list, so
 *  the amount a customer is charged can never drift from the price they see.
 *
 *  TO CHANGE A PRICE: edit `amountCents` below (e.g. 4700 = $47.00). That's it.
 *  TO ADD A PRODUCT:  add an entry here, then drop a <CheckoutButton> with its
 *                     id onto any page.
 * ============================================================================
 */

export type ProductId =
  | 'crypto-inheritance-bundle'
  | 'caregiver-tax-guide'
  | 'asset-protection-guide'
  | 'crypto-inheritance-masterclass'

export type Product = {
  id: ProductId
  name: string
  description: string
  /** Charge amount in the smallest currency unit (cents). 4700 = $47.00 */
  amountCents: number
  currency: string
}

export const PRODUCTS: Record<ProductId, Product> = {
  'crypto-inheritance-bundle': {
    id: 'crypto-inheritance-bundle',
    name: 'Crypto Inheritance Protection Bundle',
    description: 'Training video + PDF checklist & workbook for passing on digital assets.',
    amountCents: 1799,
    currency: 'usd',
  },
  'caregiver-tax-guide': {
    id: 'caregiver-tax-guide',
    name: 'Caregiver Tax Savings Guide',
    description: 'Plain-English walkthrough of caregiver deductions, credits, and filing strategies.',
    amountCents: 2700,
    currency: 'usd',
  },
  'asset-protection-guide': {
    id: 'asset-protection-guide',
    name: 'Asset Protection Starter Guide',
    description: 'Practical first steps to shield assets from lawsuits, creditors, and inheritance erosion.',
    amountCents: 3700,
    currency: 'usd',
  },
  'crypto-inheritance-masterclass': {
    id: 'crypto-inheritance-masterclass',
    name: 'Crypto Inheritance Masterclass',
    description: 'Full masterclass video + companion PDF workbook and checklist.',
    amountCents: 1799,
    currency: 'usd',
  },
}

/** Format an amount for display, e.g. formatPrice(4700) -> "$47". */
export function formatPrice(amountCents: number, currency = 'usd'): string {
  const dollars = amountCents / 100
  const hasCents = amountCents % 100 !== 0
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(dollars)
}
