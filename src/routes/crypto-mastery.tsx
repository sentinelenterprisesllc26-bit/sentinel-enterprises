import { createFileRoute, redirect } from '@tanstack/react-router'

// Crypto Mastery ($17) is retired. This URL (and /crypto-mastery/success)
// permanently redirects to /guides. Netlify also 301s these paths
// (see netlify.toml and public/_redirects).
export const Route = createFileRoute('/crypto-mastery')({
  beforeLoad: () => {
    throw redirect({ to: '/guides', statusCode: 301 })
  },
})
