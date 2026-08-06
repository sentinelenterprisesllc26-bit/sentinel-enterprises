import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/terms')({
  component: TermsPage,
})

function TermsPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Legal</span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-black text-white leading-tight mb-4">Terms of Service</h1>
          <p className="text-slate-400 text-sm">Last updated: August 2026</p>
        </div>
      </section>

      <section className="py-16 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="blog-content">
            <div className="prose-content">
              <h2>Acceptance of Terms</h2>
              <p>
                By accessing and using sentinelenterprisesllc.com, you accept and agree to these Terms of Service. If you do not agree, please do not use our website.
              </p>

              <h2>Educational Content Only</h2>
              <p>
                All content on this website — including articles, guides, checklists, videos, downloads, and communications — is provided for educational and informational purposes only. Sentinel Enterprises LLC is not a law firm, financial advisory firm, tax preparation service, or fiduciary.
              </p>
              <p>
                Nothing on this website constitutes legal, tax, financial, or investment advice. Always consult a qualified professional before making decisions about your assets, taxes, or legal affairs.
              </p>

              <h2>Digital Products</h2>
              <h3>Purchases</h3>
              <p>
                When you purchase digital products from Sentinel Enterprises, you receive a personal, non-transferable license to use the materials for your own education. You may not resell, redistribute, or share purchased materials.
              </p>
              <h3>Refund Policy</h3>
              <p>
                We offer a 7-day money-back guarantee on all digital product purchases. If you are not satisfied, email us within 7 days of purchase for a full refund.
              </p>
              <h3>Delivery</h3>
              <p>
                Digital products are delivered electronically via email download links immediately after purchase. If you experience any issues accessing your files, contact us and we will resolve the issue promptly.
              </p>

              <h2>Affiliate Links</h2>
              <p>
                This website contains affiliate and referral links to third-party products and services. We may earn a commission when you use these links, at no additional cost to you. We only recommend products we have evaluated. However, we are not responsible for the quality, safety, or performance of third-party products or services.
              </p>

              <h2>THREE International Products</h2>
              <p>
                Sentinel Enterprises is an independent THREE International Brand Ambassador. THREE products are sold and fulfilled by THREE International, not Sentinel Enterprises. All product inquiries, returns, and quality concerns should be directed to THREE International.
              </p>

              <h2>Intellectual Property</h2>
              <p>
                All original content on this website — including text, graphics, logos, videos, and downloadable materials — is the property of Sentinel Enterprises LLC unless otherwise noted. You may share links to our pages, but you may not copy, reproduce, or republish our content without permission.
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                Sentinel Enterprises LLC shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of this website or reliance on any information provided. Your use of the website is at your own risk.
              </p>

              <h2>External Links</h2>
              <p>
                This website contains links to external websites that are not operated by us. We have no control over the content and practices of these sites and accept no responsibility for them.
              </p>

              <h2>Changes to Terms</h2>
              <p>
                We may update these Terms of Service at any time. Changes will be posted on this page with an updated revision date. Continued use of the website after changes constitutes acceptance of the new terms.
              </p>

              <h2>Contact</h2>
              <p>
                Questions about these terms? Contact us:
              </p>
              <ul>
                <li>Email: Sentinelenterprisesllc26@gmail.com</li>
                <li>Phone: (309) 643-3335</li>
              </ul>

              <div className="cta-box">
                <p>Ready to start learning?</p>
                <Link to="/">Back to Home →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
