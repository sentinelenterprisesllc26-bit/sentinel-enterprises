# $17.99 offer audit

**Scope:** conservative website copy and call-to-action changes for Task #4.
Stripe products, prices, environment variables, checkout functions, and payment
behavior were not changed.

## Verified

- The public Stripe checkout screenshot shows the label **Crypto Inheritance
  Protection Bundle** and a price of **$17.99**. Tax may calculate at checkout.
- The existing checkout destination remains exactly
  `https://buy.stripe.com/5kQ00jaXfb7U8fz2XfdIA06`.
- The primary website checkout click is tracked with the existing
  `product_checkout_click` event and the `crypto-inheritance-bundle` product
  ID. This is a click signal, not an order or revenue signal.
- These readable public files exist under `public/downloads/` and are linked
  as available site resources:
  - `crypto-inheritance-checklist.pdf` — 6 pages; beginner context, a
    12-step checklist, and Crypto Access Letter prompts.
  - `your-purchased-workbook.pdf` — 6 pages; printable and intended to be
    completed by hand. It is **not fillable** despite its PDF title.
  - `beneficiary-access-template.pdf` — 6 pages; beneficiary access letter
    template and follow-up steps.
  - `asset-protection-guide.pdf` — 6 pages; plain-English overview of five
    protection levels, trusts, and first actions.
  - `trust-titling-checklist.pdf` — 7 pages; ownership and titling review
    checklist.
- `crypto-inheritance-fillable-workbook.pdf` is a one-page placeholder
  (“your full guide will be emailed”) and is excluded from offer/resource
  claims. Legacy pages previously advertised a masterclass/video deliverable;
  that claim is unverified and has been removed from the current offer path.
- The public downloads page links the free checklist to the verified local
  file path `/downloads/crypto-inheritance-checklist.pdf`. The homepage and
  guides page offer `/downloads` as the free alternative.
- Existing analytics names, IDs, allowlists, form architecture, and event
  placements remain in use. Resource and lead-form events do not contain
  sessions, payment identifiers, email addresses, or other PII.

## Unresolved

- The website cannot verify that the five available PDFs are the contents of
  the Stripe offer, or that any particular file is a purchased entitlement.
- Delivery timing, delivery channel, access controls, post-checkout
  destination, support process, and refund terms for the $17.99 offer have not
  been confirmed.
- The website previously advertised immediate email delivery and a 7-day
  money-back guarantee. Those advertised terms and any applicable customer
  rights are preserved; their current operational mapping to the $17.99 offer
  has not been verified. Visitors are told to contact Sentinel before paying,
  and existing purchasers are told to contact Sentinel about access or refund
  requests.
- There has been no real purchase or fulfillment test. A successful page load,
  checkout click, form response, or download click must not be treated as a
  sale, receipt, payment confirmation, delivery, or revenue.
- The `/thank-you` page is public and static. It does not authenticate a
  Stripe session, verify payment, collect PII, or prove an order.

## Launch hold

Keep the paid campaign and any fulfillment promise on hold until the owner
confirms, from the Stripe account and a controlled purchase test, the exact
contents, delivery method, success destination, support contact, and refund
terms. Until then, the website uses “View checkout details,” labels the files
as available site resources, and tells visitors to contact Sentinel before
paying.

## Repository and review status

This local import is the current analytics PR13 snapshot, not its own
standalone git repository. GitHub main remains
`751d9ba7f91048c846dacaa9a26380df18603d4f`; analytics PR13 is the open commit
`b17964d1dcfcfc5c938127e8c8d1b2240f1c1c5f`. These website changes are intended
for a separate stacked review PR after that analytics work. No git or remote
writes were performed here.
