# AGENTS.md — Sentinel Enterprises

This document provides an overview of the project for developers and AI agents.

## Project Overview

Marketing website for Sentinel Enterprises LLC — a consulting firm helping working families and crypto holders with asset protection, digital asset inheritance planning, and caregiver tax education.

**Domain:** sentinel-enterprises.com

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start (React SSR) |
| Frontend | React 19, TanStack Router v1 |
| Styling | Tailwind CSS v4 |
| Forms | Netlify Forms (AJAX) |
| Build | Vite 7 |
| Language | TypeScript 5 |
| Deployment | Netlify |

## Directory Structure

```
src/
  routes/
    __root.tsx                        # Root layout: NavBar + Footer
    index.tsx                         # Homepage (hero, social proof, services, email signup)
    services.tsx                      # Services detail page
    about.tsx                         # About page
    contact.tsx                       # Contact form
    blog/
      index.tsx                       # Blog listing
      $slug.tsx                       # Blog post detail (content inline as JSX)
    crypto-inheritance-checklist.tsx  # Lead magnet page with email form
  styles.css                          # Tailwind import + blog prose CSS
  router.tsx                          # TanStack Router config
public/
  sentinel-logo.png                   # Company logo
  __forms.html                        # Static Netlify Forms skeleton
  favicon.ico
```

## Coding Conventions

- **Styling:** All Tailwind utility classes inline in JSX. Dark theme: `slate-950`/`slate-900` backgrounds, `amber-500` accent.
- **Blog posts:** Stored inline in `src/routes/blog/$slug.tsx` as a `Record<string, PostData>` map. Add a key to `posts` to create a new post.
- **No components directory:** Components are colocated in route files as local functions.

## Forms Architecture

All forms use AJAX submission to `/__forms.html` — not `/`. This is critical:
- TanStack Start's SSR catch-all intercepts `POST /` before Netlify's form middleware.
- `POST /__forms.html` bypasses SSR and hits Netlify's CDN `formsHandler` directly.
- `public/__forms.html` is the static skeleton that Netlify's build bot reads to register forms at deploy time.
- Every field submitted from React must be listed in the skeleton, or Netlify will reject it.

Three forms are registered: `caregiver-checklist`, `crypto-checklist`, `contact`.

## Business Information

- **Email:** Sentinelenterprisesllc26@gmail.com
- **Phone:** (309) 643-3335
- **Disclaimer:** Not attorneys, financial advisors, or fiduciaries. Education/consulting only.
