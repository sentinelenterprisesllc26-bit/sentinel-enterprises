/*
 * ============================================================================
 *  PAID-FILE ACCESS RULES  —  which Stripe purchase unlocks which PDFs
 * ============================================================================
 *  Pure, dependency-free logic shared by:
 *    • netlify/functions/verify-purchase.mts  (/api/verify-purchase)
 *    • netlify/functions/download.mts         (/api/download)
 *    • tests/purchase-access.test.ts          (npm test)
 *
 *  The PDFs themselves live in netlify/private-assets/ (NOT public/) and are
 *  bundled into the download function via netlify.toml `included_files`.
 *  Stripe account: acct_1SyKpPEPXDHjPrap (live).
 * ============================================================================
 */

export type FileKey =
  | 'crypto-inheritance-checklist'
  | 'printable-workbook'
  | 'beneficiary-access-template'
  | 'asset-protection-guide'
  | 'trust-titling-checklist'
  | 'ripple-effect-book'

export type PaidFile = {
  key: FileKey
  title: string
  description: string
  /** File name inside netlify/private-assets/ */
  asset: string
  /** File name the buyer's browser saves */
  downloadName: string
}

export const PAID_FILES: Record<FileKey, PaidFile> = {
  'crypto-inheritance-checklist': {
    key: 'crypto-inheritance-checklist',
    title: 'Crypto Inheritance Checklist',
    description: 'A step-by-step checklist to make sure your heirs can actually find and inherit your crypto.',
    asset: 'crypto-inheritance-checklist.pdf',
    downloadName: 'Crypto-Inheritance-Checklist.pdf',
  },
  'printable-workbook': {
    key: 'printable-workbook',
    title: 'Crypto Inheritance Printable Workbook',
    description: 'A fill-in-the-blanks printable workbook to document wallets, access, and instructions in one place.',
    asset: 'your-purchased-workbook.pdf',
    downloadName: 'Crypto-Inheritance-Printable-Workbook.pdf',
  },
  'beneficiary-access-template': {
    key: 'beneficiary-access-template',
    title: 'Beneficiary Access Template',
    description: 'A ready-to-use template for securely passing access details to the people you trust.',
    asset: 'beneficiary-access-template.pdf',
    downloadName: 'Beneficiary-Access-Template.pdf',
  },
  'asset-protection-guide': {
    key: 'asset-protection-guide',
    title: 'Asset Protection Starter Guide',
    description: 'Practical first steps to shield what you’ve built — without an eight-figure trust budget.',
    asset: 'asset-protection-guide.pdf',
    downloadName: 'Asset-Protection-Starter-Guide.pdf',
  },
  'trust-titling-checklist': {
    key: 'trust-titling-checklist',
    title: 'Trust & Titling Starter Checklist',
    description: 'How to title accounts and assets correctly so your protection plan actually holds up.',
    asset: 'trust-titling-checklist.pdf',
    downloadName: 'Trust-and-Titling-Starter-Checklist.pdf',
  },
  'ripple-effect-book': {
    key: 'ripple-effect-book',
    title: 'The Ripple Effect (Digital Book)',
    description: 'How XRP is rewriting the rules of global money — the full digital book.',
    asset: 'XRP_Ripple_Book.pdf',
    downloadName: 'The-Ripple-Effect-Sentinel-Enterprises.pdf',
  },
}

const BUNDLE_FILES: FileKey[] = [
  'crypto-inheritance-checklist',
  'printable-workbook',
  'beneficiary-access-template',
  'asset-protection-guide',
  'trust-titling-checklist',
]

export type PurchaseKind = 'bundle' | 'book' | 'pack'

export type PaidProductRule = {
  kind: PurchaseKind
  name: string
  productId: string
  paymentLinkId: string
  sku: string
  files: FileKey[]
}

export const PAID_PRODUCT_RULES: PaidProductRule[] = [
  {
    kind: 'bundle',
    name: 'Complete Protection Bundle',
    productId: 'prod_VJ00IcCGTl5r9A',
    paymentLinkId: 'plink_1UIO0vEPXDHjPrapEBkR5XsY',
    sku: 'complete-protection-bundle',
    files: BUNDLE_FILES,
  },
  {
    kind: 'book',
    name: 'The Ripple Effect Book',
    productId: 'prod_VKdAlI53OWNprH',
    paymentLinkId: 'plink_1UJxuFEPXDHjPrapnCgHxjdU',
    sku: 'ripple-effect-book',
    files: ['ripple-effect-book'],
  },
  {
    kind: 'pack',
    name: 'Complete Protection + Ripple Book Pack',
    productId: 'prod_VKdArH9H940rLv',
    paymentLinkId: 'plink_1UJxuKEPXDHjPrapyoO9N0Wm',
    sku: 'protection-ripple-pack',
    files: [...BUNDLE_FILES, 'ripple-effect-book'],
  },
]

/** The minimal slice of a Stripe Checkout Session this logic needs. */
export type SessionLike = {
  id?: string
  status?: string | null
  payment_status?: string | null
  payment_link?: string | { id: string } | null
  metadata?: Record<string, string> | null
  line_items?: {
    data?: Array<{ price?: { product?: string | { id: string } | null } | null }>
  } | null
}

export type AccessResult =
  | { ok: true; kinds: PurchaseKind[]; productNames: string[]; files: FileKey[] }
  | { ok: false; status: 400 | 403; reason: string }

export function isCheckoutSessionId(id: unknown): id is string {
  return typeof id === 'string' && /^cs_(live|test)_[A-Za-z0-9]{10,200}$/.test(id)
}

export function isFileKey(key: unknown): key is FileKey {
  return typeof key === 'string' && Object.prototype.hasOwnProperty.call(PAID_FILES, key)
}

const idOf = (v: string | { id: string } | null | undefined) => (typeof v === 'string' ? v : v?.id ?? null)

/**
 * Decide what a Checkout Session unlocks.
 * Primary signal: purchased product id(s) from line_items.
 * Secondary: the payment link id, then metadata.sku (copied from the payment link).
 */
export function evaluateSession(session: SessionLike | null | undefined): AccessResult {
  if (!session) return { ok: false, status: 403, reason: 'Purchase not found.' }
  if (session.payment_status !== 'paid' || session.status !== 'complete') {
    return { ok: false, status: 403, reason: 'This purchase is not paid.' }
  }

  const productIds = new Set(
    (session.line_items?.data ?? []).map((li) => idOf(li.price?.product ?? null)).filter(Boolean) as string[],
  )
  let rules = PAID_PRODUCT_RULES.filter((r) => productIds.has(r.productId))

  if (rules.length === 0 && productIds.size === 0) {
    // No line items available — fall back to the payment link, then the sku.
    const link = idOf(session.payment_link ?? null)
    rules = PAID_PRODUCT_RULES.filter((r) => r.paymentLinkId === link)
    if (rules.length === 0 && session.metadata?.sku) {
      rules = PAID_PRODUCT_RULES.filter((r) => r.sku === session.metadata?.sku)
    }
  }

  if (rules.length === 0) {
    return { ok: false, status: 403, reason: 'This purchase does not include any Sentinel downloads.' }
  }

  const files: FileKey[] = []
  for (const r of rules) for (const f of r.files) if (!files.includes(f)) files.push(f)
  return { ok: true, kinds: rules.map((r) => r.kind), productNames: rules.map((r) => r.name), files }
}

/** Access check for a single file download. */
export function evaluateDownload(session: SessionLike | null | undefined, file: unknown): AccessResult {
  if (!isFileKey(file)) return { ok: false, status: 400, reason: 'Unknown file.' }
  const access = evaluateSession(session)
  if (!access.ok) return access
  if (!access.files.includes(file)) {
    return { ok: false, status: 403, reason: 'This purchase does not include that file.' }
  }
  return access
}
