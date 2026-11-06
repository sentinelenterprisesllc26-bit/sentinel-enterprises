# Bundle download unlock → acct_1TgyoVEDoVpqpse2 (2026-11-06)

## What broke
Site buy buttons already pointed at the **new** Payment Links on `acct_1TgyoVEDoVpqpse2`, but `/api/verify-purchase` and `/api/download` still matched product/plink IDs from retired `acct_1SyKpPEPXDHjPrap` and expected that account on `STRIPE_DELIVERY_SECRET_KEY`. Paid buyers on the new Bundle link would not unlock the 5 PDFs.

## Live IDs (verified from Payment Link bootstrap, no charge)

| Offer | URL | product | price | plink |
|-------|-----|---------|-------|-------|
| Complete Protection Bundle $17.99 | https://buy.stripe.com/5kQ4gzc1j6RE2VfapHdIA0b | `prod_VZU8EA165KqseT` | `price_1UYL9tEDoVpqpse2RpuOWFPh` | `plink_1UYLAKEDoVpqpse2usReSiVC` |
| Ripple Effect Book $7.99 | https://buy.stripe.com/7sY5kDaXf2Bo3Zj55ndIA0c | `prod_VZU9OwVGI1IzwD` | `price_1UYLAqEDoVpqpse2VcOw2Rjh` | `plink_1UYLB0EDoVpqpse2nzQ7O7e2` |
| Protection + Ripple Pack $19.99 | https://buy.stripe.com/dRmaEXghzfoa2VfgO5dIA09 | `prod_VVoXCqZU7KYqU6` | `price_1UUmuJEDoVpqpse2o6yssduT` | `plink_1UUmuKEDoVpqpse21auMfyG7` |

Account: **acct_1TgyoVEDoVpqpse2** (sign-in sentinelenterprisesllc26@gmail.com).

## Code patched (not deployed)
- `src/lib/purchase-access.ts` — product + paymentLink IDs
- `netlify/lib/stripe-purchase.ts` — `EXPECTED_STRIPE_ACCOUNT`
- `tests/purchase-access.test.ts`, `tests/functions.test.ts`
- `src/lib/buy-cards.tsx` comment, `AGENTS.md`, `.env.example`

## Netlify env (required before/with deploy)
1. `STRIPE_DELIVERY_SECRET_KEY` = restricted live key for **acct_1TgyoVEDoVpqpse2** with Checkout Sessions Read, Products Read, Prices Read.
2. **Or** clear `STRIPE_DELIVERY_SECRET_KEY` so the site falls back to `STRIPE_SECRET_KEY` (already the same live account for Crypto Mastery).
3. If `STRIPE_DELIVERY_SECRET_KEY` still belongs to `acct_1SyKpPEPXDHjPrap`, new Bundle sessions will 503 / fail unlock even after this code ships.

## Deploy remaining
Commit + Netlify deploy of the branch that contains these file changes. Do **not** post the Short until a paid (or Jenae-approved test) session on the new Bundle link unlocks all 5 files on `/thank-you`.

## Stripe MCP
Connectors currently only list `acct_1SyKpPEPXDHjPrap`. To manage the new account via MCP, Jenae must authorize it (Dashboard reconsent).
