import type { Handler } from '@netlify/functions'
import Stripe from 'stripe'

const assetPath = 'Crypto_Mastery_Sentinel_Enterprises.pdf'

type GitHubContentsResponse = {
  content?: string
  encoding?: string
}

function json(statusCode: number, body: Record<string, string>) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') return json(405, { error: 'Method not allowed.' })
  if (!process.env.STRIPE_SECRET_KEY) return json(503, { error: 'Download service is not configured yet.' })
  if (!process.env.GITHUB_ASSET_TOKEN || !process.env.GITHUB_ASSET_REPOSITORY) {
    return json(503, { error: 'Download service is not configured yet.' })
  }

  const sessionId = event.queryStringParameters?.session_id
  if (!sessionId?.startsWith('cs_')) return json(400, { error: 'A valid purchase session is required.' })

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const isPurchasedCryptoMastery = session.payment_status === 'paid' && session.metadata?.productId === 'crypto-mastery'
    if (!isPurchasedCryptoMastery) {
      return json(403, { error: 'This purchase does not include the Crypto Mastery download.' })
    }

    const assetResponse = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_ASSET_REPOSITORY}/contents/${assetPath}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${process.env.GITHUB_ASSET_TOKEN}`,
          'User-Agent': 'Sentinel-Enterprises-Digital-Delivery',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    )

    if (!assetResponse.ok) {
      console.error('Unable to retrieve private e-book asset.', assetResponse.status)
      return json(502, { error: 'We could not prepare your download. Please contact support.' })
    }

    const asset = await assetResponse.json() as GitHubContentsResponse
    if (asset.encoding !== 'base64' || !asset.content) {
      console.error('Private e-book asset returned an unexpected format.')
      return json(502, { error: 'We could not prepare your download. Please contact support.' })
    }

    return {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Crypto_Mastery_Sentinel_Enterprises.pdf"',
        'Cache-Control': 'private, no-store',
      },
      body: asset.content.replace(/\n/g, ''),
    }
  } catch (error) {
    console.error('Unable to deliver e-book.', error)
    return json(500, { error: 'We could not prepare your download. Please contact support.' })
  }
}
