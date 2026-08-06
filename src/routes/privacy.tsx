import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Legal</span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-black text-white leading-tight mb-4">Privacy Policy</h1>
          <p className="text-slate-400 text-sm">Last updated: August 2026</p>
        </div>
      </section>

      <section className="py-16 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="blog-content">
            <div className="prose-content">
              <h2>Overview</h2>
              <p>
                Sentinel Enterprises LLC ("we," "us," or "our") operates sentinelenterprisesllc.com. This privacy policy explains how we collect, use, and protect your information when you visit our website or use our services.
              </p>

              <h2>Information We Collect</h2>
              <h3>Email Address</h3>
              <p>
                When you sign up for our free checklists or contact us, we collect your email address. We use this to deliver the requested resources and send occasional updates. You can unsubscribe at any time.
              </p>
              <h3>Contact Form Submissions</h3>
              <p>
                If you submit our contact form, we collect your name, email address, and any information you provide in your message. We use this solely to respond to your inquiry.
              </p>
              <h3>Analytics Data</h3>
              <p>
                We may use Google Analytics or similar tools to collect anonymous usage data such as page views, click patterns, and general location information. This data is aggregated and does not identify you personally.
              </p>
              <h3>Payment Information</h3>
              <p>
                All payments are processed securely by Stripe. We do not store your credit card information on our servers. Stripe's privacy policy governs the handling of payment data.
              </p>

              <h2>How We Use Your Information</h2>
              <ul>
                <li>To deliver free resources you request</li>
                <li>To respond to your inquiries</li>
                <li>To send occasional emails about new content, products, or resources (you can unsubscribe anytime)</li>
                <li>To improve our website content and user experience</li>
                <li>To comply with legal obligations</li>
              </ul>

              <h2>Affiliate Disclosure</h2>
              <p>
                Some links on this website are affiliate or referral links. If you click an affiliate link and make a purchase, we may earn a commission at no additional cost to you. We only recommend products and services we have evaluated and believe provide value to our audience.
              </p>

              <h2>Cookies</h2>
              <p>
                Our website may use cookies for analytics and functionality. You can disable cookies in your browser settings. Disabling cookies may affect some features of the site.
              </p>

              <h2>Third-Party Services</h2>
              <p>
                We use the following third-party services that may collect information governed by their own privacy policies:
              </p>
              <ul>
                <li>Stripe (payment processing)</li>
                <li>Netlify (website hosting and form processing)</li>
                <li>Google Analytics (anonymous usage data)</li>
                <li>MailerLite (email delivery)</li>
              </ul>

              <h2>Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul>
                <li>Request access to the personal information we hold about you</li>
                <li>Request that we correct or delete your personal information</li>
                <li>Unsubscribe from our email communications at any time</li>
                <li>Opt out of analytics tracking</li>
              </ul>
              <p>
                To exercise these rights, email us at Sentinelenterprisesllc26@gmail.com.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                Our website is not directed to children under 13. We do not knowingly collect personal information from children under 13.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have questions about this privacy policy, please contact us:
              </p>
              <ul>
                <li>Email: Sentinelenterprisesllc26@gmail.com</li>
                <li>Phone: (309) 643-3335</li>
              </ul>

              <div className="cta-box">
                <p>Have questions about our privacy practices?</p>
                <Link to="/contact">Contact us →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
