# Sentinel Enterprises

Marketing website for **Sentinel Enterprises LLC** — a consulting and education firm that helps working families and crypto holders build practical wealth protection plans, understand self-custody, and stop overpaying on caregiver taxes.

**Live domain:** sentinel-enterprises.com

## Key Technologies

- **TanStack Start** (React SSR framework)
- **TanStack Router** (file-based routing)
- **Tailwind CSS v4** (styling)
- **Netlify Forms** (contact form, email lead capture)
- **Vite** (build tool)
- **TypeScript**

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, testimonials, services, email signup |
| `/services` | Detailed service descriptions |
| `/blog` | Resources/blog index |
| `/blog/:slug` | Individual blog post |
| `/crypto-inheritance-checklist` | Lead magnet page with email capture |
| `/about` | About Sentinel Enterprises |
| `/contact` | Contact form |

## Running Locally

```bash
npm install
netlify dev --port 8889
```

This starts the Netlify dev server with local emulation of all Netlify features (including Forms).

## Forms

Three Netlify Forms are registered:
- `caregiver-checklist` — homepage email capture
- `crypto-checklist` — crypto checklist page email capture
- `contact` — contact page form

The static form skeleton is at `public/__forms.html` for build-time detection.
