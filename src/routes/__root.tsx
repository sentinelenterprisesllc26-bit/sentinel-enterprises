import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Sentinel Enterprises - Learn. Protect. Build.' },
      {
        name: 'description',
        content:
          'Sentinel Enterprises helps working families and crypto holders learn how money is changing, protect their digital assets, and make smarter financial decisions. Free education first.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Sentinel Enterprises' },
      { property: 'og:title', content: 'Sentinel Enterprises - Learn. Protect. Build.' },
      {
        property: 'og:description',
        content:
          'Sentinel Enterprises helps working families and crypto holders learn how money is changing, protect their digital assets, and make smarter financial decisions. Free education first.',
      },
      { property: 'og:url', content: 'https://sentinelenterprisesllc.com/' },
      { property: 'og:image', content: 'https://sentinelenterprisesllc.com/sentinel-logo.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Sentinel Enterprises - Learn. Protect. Build.' },
      {
        name: 'twitter:description',
        content:
          'Sentinel Enterprises helps working families and crypto holders learn how money is changing, protect their digital assets, and make smarter financial decisions. Free education first.',
      },
      { name: 'twitter:image', content: 'https://sentinelenterprisesllc.com/sentinel-logo.png' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'canonical', href: 'https://sentinelenterprisesllc.com/' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' as const },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Merriweather:wght@700;900&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src="/sentinel-logo.png" alt="Sentinel Enterprises" className="h-9 w-auto" />
            <span className="text-white font-bold text-lg hidden sm:block">Sentinel Enterprises</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/blog">Free Resources</NavLink>
            <NavLink to="/downloads">Downloads</NavLink>
            <NavLink to="/videos">Videos</NavLink>
            <NavLink to="/guides">Guides</NavLink>
            <NavLink to="/partners">Tools</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/sentinel-squad">Sentinel Squad</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          <Link
            to="/guides"
            className="hidden lg:inline-flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold text-sm rounded-lg transition-colors"
          >
            Get Started
          </Link>

          <MobileMenu />
        </div>
      </div>
    </nav>
  )
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="px-3 py-2 text-slate-300 hover:text-white text-sm font-medium rounded-md transition-colors"
      activeProps={{ className: 'px-3 py-2 text-amber-400 text-sm font-medium rounded-md' }}
    >
      {children}
    </Link>
  )
}

function MobileMenu() {
  return (
    <details className="lg:hidden group">
      <summary className="list-none cursor-pointer p-2 rounded-md text-slate-300 hover:text-white">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>
      <div className="absolute top-16 left-0 right-0 bg-slate-900 border-b border-slate-700 px-4 py-3 flex flex-col gap-1">
        <div className="pb-2 mb-2 border-b border-slate-800">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-wider px-3 py-1">Free Resources</p>
          <MobileNavLink to="/blog">Articles & Guides</MobileNavLink>
          <MobileNavLink to="/downloads">Free Downloads</MobileNavLink>
          <MobileNavLink to="/videos">Videos</MobileNavLink>
          <MobileNavLink to="/crypto-inheritance-checklist">Free Checklists</MobileNavLink>
        </div>
        <div className="pb-2 mb-2 border-b border-slate-800">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-wider px-3 py-1">Paid Products</p>
          <MobileNavLink to="/guides">Guides & Bundles</MobileNavLink>
          <MobileNavLink to="/partners">Trusted Tools</MobileNavLink>
          <MobileNavLink to="/services">Services</MobileNavLink>
        </div>
        <div>
          <p className="text-amber-400 text-xs font-bold uppercase tracking-wider px-3 py-1">More</p>
          <MobileNavLink to="/sentinel-squad">Sentinel Squad</MobileNavLink>
          <MobileNavLink to="/about">About</MobileNavLink>
          <MobileNavLink to="/contact">Contact</MobileNavLink>
        </div>
      </div>
    </details>
  )
}

function MobileNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="block px-3 py-2 text-slate-300 hover:text-white text-sm font-medium rounded-md transition-colors"
    >
      {children}
    </Link>
  )
}

function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/sentinel-logo.png" alt="Sentinel Enterprises" className="h-8 w-auto" />
              <span className="text-white font-bold text-lg">Sentinel Enterprises</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-4">
              Learn how money is changing. Protect your assets and digital wealth. Access beginner-friendly guides, tools, and deeper paid resources.
            </p>
            <p className="text-amber-400/70 text-xs font-medium italic mb-4">
              Learn for free. Go deeper if you want more. Protect what you build.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.youtube.com/@JenaeSentinel"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sentinel Enterprises on YouTube"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-800 hover:bg-amber-500 text-slate-300 hover:text-slate-900 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@jenae.wiley"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sentinel Enterprises on TikTok"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-800 hover:bg-amber-500 text-slate-300 hover:text-slate-900 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.27 1.36V7.3s-1.88.09-3.2-1.48z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61572035077818"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sentinel Enterprises on Facebook"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-800 hover:bg-amber-500 text-slate-300 hover:text-slate-900 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Free Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Articles & Guides</Link></li>
              <li><Link to="/downloads" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Free Downloads</Link></li>
              <li><Link to="/videos" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Video Library</Link></li>
              <li><Link to="/crypto-inheritance-checklist" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Free Checklists</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Go Deeper</h3>
            <ul className="space-y-2">
              <li><Link to="/guides" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Paid Guides & Bundles</Link></li>
              <li><Link to="/partners" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Trusted Tools & Partners</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Services</Link></li>
              <li><Link to="/sentinel-squad" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Sentinel Squad Series</Link></li>
              <li>
                <a href="mailto:Sentinelenterprisesllc26@gmail.com" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                  Sentinelenterprisesllc26@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+13096433335" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                  (309) 643-3335
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
            <Link to="/privacy" className="text-slate-500 hover:text-amber-400 text-xs transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-slate-500 hover:text-amber-400 text-xs transition-colors">Terms of Service</Link>
            <Link to="/contact" className="text-slate-500 hover:text-amber-400 text-xs transition-colors">Contact</Link>
            <Link to="/about" className="text-slate-500 hover:text-amber-400 text-xs transition-colors">About</Link>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed">
            <strong className="text-slate-400">Important:</strong> Sentinel Enterprises LLC provides education,
            consulting, and process guidance only. We are not attorneys, financial advisors, tax professionals, or
            fiduciaries. Nothing on this website constitutes legal, tax, or financial advice. Always consult a qualified
            professional for advice specific to your situation.
          </p>
          <p className="text-slate-600 text-xs mt-3">
            &copy; {new Date().getFullYear()} Sentinel Enterprises LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Google Analytics 4 — Replace G-XXXXXXXXXX with your Measurement ID */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Sentinel Enterprises',
              url: 'https://sentinelenterprisesllc.com',
              logo: 'https://sentinelenterprisesllc.com/sentinel-logo.png',
              description:
                'Sentinel Enterprises helps working families and crypto holders learn how money is changing, protect their digital assets, and make smarter financial decisions.',
            }),
          }}
        />
      </head>
      <body className="bg-slate-950 text-white font-sans antialiased">
        <NavBar />
        <main className="pt-16">{children}</main>
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}
