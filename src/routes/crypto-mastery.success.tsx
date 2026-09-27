import { createFileRoute, redirect } from '@tanstack/react-router'

// Crypto Mastery is retired — see src/routes/crypto-mastery.tsx.
export const Route = createFileRoute('/crypto-mastery/success')({
  beforeLoad: () => {
    throw redirect({ to: '/guides', statusCode: 301 })
  },
})
