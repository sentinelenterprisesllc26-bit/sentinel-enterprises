import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Sentinel Enterprises — Protect Your Assets & Crypto' },
      {
        name: 'description',
        content:
          'Sentinel Enterprises helps working families and crypto holders build practical wealth protection plans, understand self-custody, and stop overpaying on caregiver taxes.',
      },
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico' },
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
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/blog">Resources</NavLink>
            <NavLink to="/videos">Videos</NavLink>
            <NavLink to="/sentinel-squad">Sentinel Squad</NavLink>
            <NavLink to="/guides">Guides</NavLink>
            <NavLink to="/downloads">Downloads</NavLink>
            <NavLink to="/partners">Partners</NavLink>
            <NavLink to="/crypto-inheritance-checklist">Free Checklists</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          <Link
            to="/contact"
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
        <MobileNavLink to="/">Home</MobileNavLink>
        <MobileNavLink to="/services">Services</MobileNavLink>
        <MobileNavLink to="/blog">Resources</MobileNavLink>
        <MobileNavLink to="/videos">Videos</MobileNavLink>
        <MobileNavLink to="/sentinel-squad">Sentinel Squad</MobileNavLink>
        <MobileNavLink to="/guides">Guides</MobileNavLink>
        <MobileNavLink to="/downloads">Downloads</MobileNavLink>
        <MobileNavLink to="/partners">Partners</MobileNavLink>
        <MobileNavLink to="/crypto-inheritance-checklist">Free Checklists</MobileNavLink>
        <MobileNavLink to="/about">About</MobileNavLink>
        <MobileNavLink to="/contact">Contact</MobileNavLink>
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
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Helping working families and crypto holders build practical wealth protection plans — without the
              elite-level trust budget.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                  Asset Protection Planning
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                  Crypto Guidance
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                  Caregiver Tax Savings
                </Link>
              </li>
              <li>
                <Link to="/videos" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                  Video Library
                </Link>
              </li>
              <li>
                <Link to="/sentinel-squad" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                  Sentinel Squad Series
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                  Paid Guides &amp; Bundles
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                  Free Downloads
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                  Tools &amp; Partners
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:Sentinelenterprisesllc26@gmail.com"
                  className="text-slate-400 hover:text-amber-400 text-sm transition-colors"
                >
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
          <p className="text-slate-500 text-xs leading-relaxed">
            <strong className="text-slate-400">Important:</strong> Sentinel Enterprises LLC provides education,
            consulting, and process guidance only. We are not attorneys, financial advisors, tax professionals, or
            fiduciaries. Nothing on this website constitutes legal, tax, or financial advice. Always consult a qualified
            professional for advice specific to your situation.
          </p>
          <p className="text-slate-600 text-xs mt-3">
            © {new Date().getFullYear()} Sentinel Enterprises LLC. All rights reserved.
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
