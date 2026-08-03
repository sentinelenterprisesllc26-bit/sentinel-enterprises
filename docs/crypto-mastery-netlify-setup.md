# Crypto Mastery checkout launch checklist

The public website repository contains the product page and secure Netlify
functions. The paid PDF is deliberately stored in the private
`sentinel-digital-assets` GitHub repository so it cannot be downloaded from
the public website source code.

## Add these variables in Netlify

Open the Sentinel Enterprises site in Netlify, then go to:

`Site configuration` → `Environment variables`

Add these variables for the **Production** deploy context:

| Variable | Value |
| --- | --- |
| `STRIPE_SECRET_KEY` | Your live Stripe secret API key from the Stripe Dashboard. It begins with `sk_live_`. |
| `STRIPE_PRICE_CRYPTO_MASTERY` | `price_1U0TMvEDoVpqpse2Sy2K2Y7I` |
| `GITHUB_ASSET_REPOSITORY` | `sentinelenterprisesllc26-bit/sentinel-digital-assets` |
| `GITHUB_ASSET_TOKEN` | A fine-grained GitHub token with **Contents: Read-only** permission for only the `sentinel-digital-assets` repository. |

Never put either secret in GitHub or in a front-end environment variable.

## Create the GitHub asset token

1. In GitHub, open `Settings` → `Developer settings` → `Personal access tokens` → `Fine-grained tokens`.
2. Create a token named `Netlify digital delivery`.
3. Set the resource owner to `sentinelenterprisesllc26-bit`.
4. Select **Only select repositories**, then choose `sentinel-digital-assets`.
5. Under repository permissions, set **Contents** to **Read-only**. Leave all other permissions off.
6. Generate the token and paste it only into Netlify as `GITHUB_ASSET_TOKEN`.

## Deploy and test

1. Push the public website repository to `main`. Netlify should automatically deploy the update.
2. In Netlify, trigger a fresh production deploy after adding the variables.
3. Visit `/crypto-mastery` and click the purchase button. Stripe Checkout should open and show the $17 Crypto Mastery product.
4. Complete a test purchase using the appropriate Stripe mode before promoting the checkout to customers. The confirmation page must show the download button, and the download must work only after a verified paid Checkout Session.

## Security design

- The browser never receives the Stripe secret key or GitHub token.
- The checkout function accepts only the `crypto-mastery` product ID and uses a server-side Stripe Price ID.
- The download function verifies `payment_status = paid` and checks the purchase metadata before requesting the private PDF.
- The delivery response uses `Cache-Control: private, no-store`.

This is purchase-gated delivery, not DRM. A customer can still save or share a downloaded PDF.
